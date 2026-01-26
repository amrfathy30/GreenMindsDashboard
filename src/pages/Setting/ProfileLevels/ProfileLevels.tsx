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
import Pagination from "../../../components/common/Pagination";
import { LevelApiResponse, LevelList } from "../../../utils/types/levelType";
import {
  allLevelData,
  createLevel,
  deleteLevel,
  updateLevel,
} from "../../../api/services/levelService";
import { useLanguage } from "../../../api/locales/LanguageContext";
import { ShowToastSuccess } from "../../../components/common/ToastHelper";
import {TableLoading} from "../../../components/loading/TableLoading";

export default function ProfileLevels() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  const [ProfileLevels, setProfileLevels] = useState<LevelList[]>([]);

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        setLoading(true);
        const data: LevelApiResponse = await allLevelData({
          page: currentPage,
          pageSize: 10,
        });

        setProfileLevels(
          data.Data.map((item) => ({
            id: item.Id,
            levelNameAr: item.levelNameAr,
            levelNameEn: item.levelNameEn,
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
  }, [currentPage, t]);

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
        !data.levelNameAr?.trim() ||
        !data.levelNameEn?.trim() ||
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
      if (editData) {
        res = await updateLevel({ ...data });
      } else {
        res = await createLevel({ ...data });
      }

      const listRes: LevelApiResponse = await allLevelData({
        page: currentPage,
        pageSize: 10,
      });

      setProfileLevels(
        listRes.Data.map((item) => ({
          id: item.Id,
          MaxPoints: item.MaxPoints,
          MinPoints: item.MinPoints,
          levelNameAr: item.levelNameAr?.toString() || "",
          levelNameEn: item.levelNameEn?.toString() || "",
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
      key: "levelNameAr",
      label: t("levelNameAr"),
      render: (row: any) => <span>{row.levelNameAr || "__"}</span>,
    },
    {
      key: "levelNameEn",
      label: t("levelNameEn"),
      render: (row: any) => <span>{row.levelNameEn || "__"}</span>,
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
                MinPoints: row.MinPoints,
                MaxPoints: row.MaxPoints,
                levelNameAr: row.levelNameAr,
                levelNameEn: row.levelNameEn,
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
      <PageMeta
        title="Profile Levels | Green minds Admin Dashboard"
        description="Profile Levels | Green minds Admin Dashboard"
      />
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
          <TableLoading />
        ) : (
          <BasicTableOne data={ProfileLevels} columns={columns} />
        )}
        <div className="my-6 w-full flex items-center justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
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
