/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import BasicTableOne from "../../../components/tables/BasicTables/BasicTableOne";
import AddButton from "../../../components/ui/button/AddButton";
import { Plus } from "lucide-react";
import ConfirmModal from "../../../components/common/ConfirmModal";
import { toast } from "sonner";
import PageMeta from "../../../components/common/PageMeta";
import { EditIcon, RemoveIcon } from "../../../icons";
import AgeGroupModal from "./AgeGroupModal";
import Pagination from "../../../components/common/Pagination";
import {
  allAgeData,
  createAge,
  deleteAge,
  updateAge,
} from "../../../api/services/ageService";
import { AgeApiResponse, AgeGroup } from "../../../utils/types/ageType";
import AgeLoading from "../../../components/loading/ageLoading";
import { useLanguage } from "../../../api/locales/LanguageContext";
import { ShowToastSuccess } from "../../../components/common/ToastHelper";

export default function AgeGroupList() {
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();
  const [ageGroups, setAgeGroups] = useState<AgeGroup[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  useEffect(() => {
    const fetchAgeGroups = async () => {
      try {
        setLoading(true);
        const data: AgeApiResponse = await allAgeData({
          page: currentPage,
          pageSize: 10,
        });

        setAgeGroups(
          data.Data.map((item) => ({
            id: item.Id,
            from: item.FromAge.toString(),
            to: item.ToAge.toString(),
            DisplayName: item.DisplayName.toString(),
          })),
        );
      } catch (error) {
        toast.error(t("failed_load_age"));
      } finally {
        setLoading(false);
      }
    };

    fetchAgeGroups();
  }, [currentPage, t]);

  const [openModalAge, setOpenModalAge] = useState(false);
  const [editData, setEditData] = useState<{
    id: number;
    from: string;
    to: string;
    DisplayName: string;
  } | null>(null);

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
      const res = await deleteAge(selectedDeleteId);

      ShowToastSuccess(res?.Message || t("success_delete_age"));

      setAgeGroups((prev) => prev.filter((a) => a.id !== selectedDeleteId));
    } catch (error: any) {
      toast.error(error?.response?.data?.Message || t("failed_delete_age"));
    } finally {
      setLoading(false);
      setOpenConfirm(false);
      setSelectedDeleteId(null);
    }
  };

  const handleSave = async (data: {
    id?: number;
    from: string;
    to: string;
    DisplayName: string;
  }) => {
    try {
      if (Number(data.from) >= Number(data.to)) {
        toast.error(t("from_less_to"));
        return;
      }
      setLoading(true);

      if (editData) {
        const res = await updateAge({
          Id: data.id!,
          FromAge: Number(data.from),
          ToAge: Number(data.to),
          DisplayName: String(data.DisplayName),
        });

        ShowToastSuccess(res?.Message || t("success_age_update"));
      } else {
        const res = await createAge({
          FromAge: Number(data.from),
          ToAge: Number(data.to),
          DisplayName: String(data.DisplayName),
        });

        ShowToastSuccess(res?.Message || t("success_age_create"));
      }

      const res: AgeApiResponse = await allAgeData({
        page: currentPage,
        pageSize: 10,
      });

      setAgeGroups(
        res.Data.map((item) => ({
          id: item.Id,
          from: item.FromAge.toString(),
          to: item.ToAge.toString(),
          DisplayName: item.DisplayName.toString(),
        })),
      );

      setOpenModalAge(false);
      setEditData(null);
    } catch (error: any) {
      toast.error(error?.response?.data?.Message || t("operation_failed"));
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: "DisplayName",
      label: t("age_groups_name"),
    },
    {
      key: "ageGroups",
      label: t("age_groups"),
      render: (row: any) => `${t("from")} ${row.from} : ${row.to}`,
    },
    {
      key: "actions",
      label: t("actions"),
      render: (row: any) => (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => {
              setEditData({
                from: row.from,
                to: row.to,
                id: row.id,
                DisplayName: row.DisplayName,
              });
              setOpenModalAge(true);
            }}
          >
            <EditIcon className="w-8 h-8" />
          </button>
          <button onClick={() => handleDelete(row.id)}>
            <RemoveIcon className="w-8 h-8" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageMeta title={t("age_groups")} description={t("age_groups")} />
      <div className="md:px-10">
        <h2 className="font-medium text-2xl p-4 text-[#000000]">
          {t("age_groups")}
        </h2>
        <div className="flex justify-end my-4">
          <AddButton
            startIcon={<Plus />}
            onClick={() => {
              setEditData(null);
              setOpenModalAge(true);
            }}
          >
            {t("add_age_groups")}
          </AddButton>
        </div>
        {loading ? (
          <AgeLoading />
        ) : (
          <BasicTableOne data={ageGroups} columns={columns} />
        )}
        <div className="my-6 w-full flex items-center justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>

      <AgeGroupModal
        open={openModalAge}
        onClose={() => {
          setOpenModalAge(false);
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
        title={t("delete_age")}
        description={t("confirm_delete_age")}
      />
    </div>
  );
}
