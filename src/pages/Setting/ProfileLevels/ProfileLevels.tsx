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
import {
  fetchUserPermissions,
  hasPermission,
} from "../../../utils/permissions/permissions";
import EmptyState from "../../../components/common/no-data-found";
import Pagination from "../../../components/common/Pagination";

export default function ProfileLevels() {
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [ProfileLevels, setProfileLevels] = useState<LevelList[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState<LevelList | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchUserPermissions();
  }, []);

  const canView = hasPermission("Levels_GetAll");
  const canCreate = hasPermission("Levels_Create");
  const canEdit = hasPermission("Levels_Update");
  const canDelete = hasPermission("Levels_Delete");
  const canViewAction =
    hasPermission("Levels_Update") || hasPermission("Levels_Delete");

  useEffect(() => {
    const fetchLevels = async () => {
      if (!canView) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data: LevelApiResponse = await allLevelData({
          page: currentPage,
          pageSize: pageSize,
        });

        setProfileLevels(
          data.Data.Items.map((item) => ({
            id: item.Id,
            NameEn: item.NameEn,
            NameAr: item.NameAr,
            MinPoints: item.MinPoints,
            MaxPoints: item.MaxPoints,
            LevelNumber: item.LevelNumber,
          })),
        );
        setTotalPages(Math.ceil(data.Data.Total / data.Data.PageSize));
      } catch (error) {
        toast.error(t("failed_load_level"));
      } finally {
        setLoading(false);
      }
    };

    fetchLevels();
  }, [canView, currentPage, pageSize, t]);

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
        data.LevelNumber === "" ||
        data.MinPoints === "" ||
        data.MaxPoints === ""
      ) {
        toast.error(t("all_fields_required"));
        return;
      }
      if (Number(data.MinPoints) > Number(data.MaxPoints)) {
        toast.error(t("min_less_max"));
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

      const listRes: LevelApiResponse = await allLevelData({
        page: currentPage,
        pageSize: pageSize,
      });

      setProfileLevels(
        listRes.Data.Items.map((item) => ({
          id: item.Id,
          MaxPoints: item.MaxPoints,
          MinPoints: item.MinPoints,
          LevelNumber: item.LevelNumber,
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

  const columns: any[] = [
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
      key: "LevelNumber",
      label: t("LevelNumber"),
    },
    {
      key: "MinPoints",
      label: t("minPoints"),
    },
    {
      key: "MaxPoints",
      label: t("maxPoints"),
    },
  ];

  if (canViewAction) {
    columns.push({
      key: "actions",
      label: t("actions"),
      render: (row: any) => (
        <div className="flex justify-center items-center gap-2">
          {canEdit && (
            <button
              onClick={() => {
                setEditData({
                  id: row.id,
                  MinPoints: row.MinPoints,
                  LevelNumber: row.LevelNumber,
                  MaxPoints: row.MaxPoints,
                  NameEn: row.NameEn,
                  NameAr: row.NameAr,
                });
                setOpenModal(true);
              }}
              aria-label={t("common.edit")}
            >
              <EditIcon className="w-8 h-8 invert-0 dark:invert" />
            </button>
          )}
          {canDelete && (
            <button
              onClick={() => handleDelete(row.id)}
              aria-label={t("common.delete")}
            >
              <RemoveIcon className="w-8 h-8 invert-0 dark:invert" />
            </button>
          )}
        </div>
      ),
    });
  }

  if (!canView && !loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <EmptyState
          title={t("access_denied")}
          description={t("not_authorized_to_view_this_page")}
        />
      </div>
    );
  }

  return (
    <div>
      <PageMeta title="Green minds Admin | Profile Levels" description={``} />
      <div className="relative rounded-2xl border-b border-[#D9D9D9] pb-5  dark:border-gray-800 min-h-[calc(100vh-48px)] dark:bg-neutral-800 bg-[#EDEDED]">
        <div className="h-17.5 mb-6 flex flex-wrap items-center justify-between gap-4 px-5 border-b border-[#D9D9D9] dark:border-gray-600 py-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {t("levelNameLabel")}
          </h2>
          {canCreate && (
            <AddButton startIcon={<Plus />} onClick={() => setOpenModal(true)}>
              {t("add_level")}
            </AddButton>
          )}
        </div>
        {loading ? (
          <TableLoading columnCount={5} />
        ) : (
          <div className="flex flex-col gap-2 min-h-[calc(100vh-200px)] px-5">
            <BasicTableOne data={ProfileLevels} columns={columns} />
            <div className="mt-auto">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                pageSize={pageSize}
                onPageSizeChange={setPageSize}
              />
            </div>
          </div>
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
