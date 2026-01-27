/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import ProfileLevelModal from "./ProfileLevelsModal";
import { toast } from "sonner";
import PageMeta from "../../../components/common/PageMeta";
import AddButton from "../../../components/ui/button/AddButton";
import BasicTableOne from "../../../components/tables/BasicTables/BasicTableOne";
import ConfirmModal from "../../../components/common/ConfirmModal";
import { EditIcon, RemoveIcon } from "../../../icons";
import { LevelApiResponse, LevelList } from "../../../utils/types/levelType";
import {
  allLevelData,
  createLevel,
  deleteLevel,
  updateLevel,
} from "../../../api/services/levelService";
import { useLanguage } from "../../../locales/LanguageContext";
import { ShowToastSuccess } from "../../../components/common/ToastHelper";
import { TableLoading } from "../../../components/loading/TableLoading";

export default function ProfileLevels() {
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  const [ProfileLevels, setProfileLevels] = useState<LevelList[]>([]);

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        setLoading(true);
        const data: LevelApiResponse = await allLevelData();

        setProfileLevels(
          data.Data.map((item) => ({
            id: item.Id,
            NameEn: item.NameEn,
            NameAr: item.NameAr,
            MinPoints: item.MinPoints,
            MaxPoints: item.MaxPoints,
          })),
        );
      } catch (error) {
        toast.error(t("failed_load_level"));
      } finally {
        setLoading(false);
      }
    };

    fetchLevels();
  }, [t]);

  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState<LevelList | null>(null);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setSelectedDeleteId(id);
    setOpenConfirm(true);
  };

  const confirmDelete = async () => {
    if (!selectedDeleteId) return;

    try {
      setLoading(true);
      const res = await deleteLevel(selectedDeleteId);

      ShowToastSuccess(res?.Message || t("success_delete_level"));

      setProfileLevels((prev) => prev.filter((a) => a.id !== selectedDeleteId));
    } catch (error: any) {
      toast.error(error?.response?.data?.Message || t("failed_delete_level"));
    } finally {
      setLoading(false);
      setOpenConfirm(false);
      setSelectedDeleteId(null);
    }
  };

  const handleSave = async (data: LevelList) => {
    try {
      if (
        !data.NameEn?.trim() ||
        !data.NameAr?.trim() ||
        data.MinPoints === "" ||
        data.MaxPoints === ""
      ) {
        toast.error(t("all_fields_required"));
        return;
      }
      if (Number(data.MinPoints) >= Number(data.MaxPoints)) {
        toast.error(t("max_less_min"));
        return;
      }

      setLoading(true);

      let res;
      if (editData?.id) {
        res = await updateLevel({
          ...data,
          id: editData.id,
        });
      } else {
        res = await createLevel(data);
      }

      const listRes: LevelApiResponse = await allLevelData();

      setProfileLevels(
        listRes.Data.map((item) => ({
          id: item.Id,
          MaxPoints: item.MaxPoints,
          MinPoints: item.MinPoints,
          NameEn: item.NameEn?.toString() || "",
          NameAr: item.NameAr?.toString() || "",
        })),
      );

      ShowToastSuccess(
        res?.Message ||
          (editData ? t("success_level_update") : t("success_level_create")),
      );
      setOpenModal(false);
      setEditData(null);
    } catch (error: any) {
      toast.error(error?.response?.data?.Message || t("operation_failed"));
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: "NameEn",
      label: t("NameEn"),
      render: (row: any) => <span>{row.NameEn || "__"}</span>,
    },
    {
      key: "NameAr",
      label: t("NameAr"),
      render: (row: any) => <span>{row.NameAr || "__"}</span>,
    },
    {
      key: "MinPoints",
      label: t("minPoints"),
    },
    {
      key: "MaxPoints",
      label: t("maxPoints"),
    },
    {
      key: "actions",
      label: t("actions"),
      render: (row: any) => (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => {
              setEditData({
                id: row.id,
                MinPoints: row.MinPoints,
                MaxPoints: row.MaxPoints,
                NameEn: row.NameEn,
                NameAr: row.NameAr,
              });
              setOpenModal(true);
            }}
            aria-label={t("common.edit")}
          >
            <EditIcon className="w-8 h-8" />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            aria-label={t("common.delete")}
          >
            <RemoveIcon className="w-8 h-8" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageMeta title="Green minds Admin | Profile Levels" description={``} />
      <div className="md:px-10">
        <h2 className="font-medium text-2xl p-4 text-[#000000]">
          {t("levelNameLabel")}
        </h2>
        <div className="flex justify-end my-4">
          <AddButton startIcon={<Plus />} onClick={() => setOpenModal(true)}>
            {t("add_level")}
          </AddButton>
        </div>
        {loading ? (
          <TableLoading columnCount={5} />
        ) : (
          <BasicTableOne data={ProfileLevels} columns={columns} />
        )}
      </div>

      <ProfileLevelModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditData(null);
        }}
        initialData={editData || undefined}
        onSave={handleSave}
        loading={loading}
      />

      <ConfirmModal
        open={openConfirm}
        loading={loading}
        onClose={() => setOpenConfirm(false)}
        onConfirm={confirmDelete}
        title={t("delete_level")}
        description={t("confirm_delete_level")}
      />
    </div>
  );
}
