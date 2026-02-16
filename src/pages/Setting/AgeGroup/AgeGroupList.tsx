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
import {
  allAgeData,
  createAge,
  deleteAge,
  updateAge,
} from "../../../api/services/ageService";
import { AgeApiResponse, AgeGroup } from "../../../utils/types/ageType";
import { TableLoading } from "../../../components/loading/TableLoading";
import { useLanguage } from "../../../locales/LanguageContext";
import { ShowToastSuccess } from "../../../components/common/ToastHelper";
import {
  fetchUserPermissions,
  hasPermission,
} from "../../../utils/permissions/permissions";
import EmptyState from "../../../components/common/no-data-found";
import { getTranslatedApiError } from "../../../utils/handleApiError";

export default function AgeGroupList() {
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();
  const [ageGroups, setAgeGroups] = useState<AgeGroup[]>([]);
  useEffect(() => {
    fetchUserPermissions();
  }, []);

  const canView = hasPermission("AgeSectors_GetAll");
  const canCreate = hasPermission("AgeSectors_Create");
  const canEdit = hasPermission("AgeSectors_Update");
  const canDelete = hasPermission("AgeSectors_Delete");
  const canViewAction =
    hasPermission("AgeSectors_Update") || hasPermission("AgeSectors_Delete");

  useEffect(() => {
    const fetchAgeGroups = async () => {
      if (!canView) {
        setLoading(false);

        return;
      }

      try {
        setLoading(true);
        const data: AgeApiResponse = await allAgeData();

        setAgeGroups(
          data.Data.map((item) => ({
            id: item.Id,
            FromAge: item.FromAge.toString(),
            ToAge: item.ToAge.toString(),
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
  }, [canView, t]);

  const [openModalAge, setOpenModalAge] = useState(false);
  const [editData, setEditData] = useState<AgeGroup | null>(null);

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

  const handleSave = async (data: AgeGroup) => {
    try {
      if (
        !data.DisplayName?.trim() ||
        data.FromAge === "" ||
        data.ToAge === ""
      ) {
        toast.error(t("all_fields_required"));
        return;
      }

      if (Number(data.FromAge) >= Number(data.ToAge)) {
        toast.error(t("FromAge_less_than_ToAge"));
        return;
      }

      setLoading(true);

      if (editData) {
        const res = await updateAge({
          Id: data.id!,
          FromAge: String(data.FromAge),
          ToAge: String(data.ToAge),
          DisplayName: String(data.DisplayName),
        });

        ShowToastSuccess(res?.Message || t("success_age_update"));
      } else {
        const res = await createAge({
          FromAge: String(data.FromAge),
          ToAge: String(data.ToAge),
          DisplayName: String(data.DisplayName),
        });

        ShowToastSuccess(res?.Message || t("success_age_create"));
      }

      const res: AgeApiResponse = await allAgeData();

      setAgeGroups(
        res.Data.map((item) => ({
          id: item.Id,
          FromAge: item.FromAge.toString(),
          ToAge: item.ToAge.toString(),
          DisplayName: item.DisplayName.toString(),
        })),
      );

      setOpenModalAge(false);
      setEditData(null);
    } catch (error: any) {
      const errorTranslations: Record<string, string> = {
        "DisplayName must be unique": t("DisplayNameUnique"),
        "ToAge must be between 1 and 99": t("ToAge_range"),
        "FromAge must be less than ToAge": t("FromAge_less_than_ToAge"),
      };

      const finalMsg = getTranslatedApiError(error, t, errorTranslations);
      toast.error(finalMsg);
    } finally {
      setLoading(false);
    }
  };

  const columns: any[] = [
    {
      key: "DisplayName",
      label: t("age_groups_name"),
      render: (row: any) => (
        <span className="block truncate max-w-60">{row.DisplayName}</span>
      ),
    },
    {
      key: "ageGroups",
      label: t("age_groups"),
      render: (row: any) => `${t("from")} ${row.FromAge} : ${row.ToAge}`,
    },
  ];

  if (canViewAction) {
    columns.push({
      key: "actions",
      label: (<div className="text-end px-4">{t("actions")}</div>) as any,
      render: (row: any) => (
        <div className="flex justify-end items-center gap-2 px-4">
          {canEdit && (
            <button
              onClick={() => {
                setEditData({
                  FromAge: row.FromAge,
                  ToAge: row.ToAge,
                  id: row.id,
                  DisplayName: row.DisplayName,
                });
                setOpenModalAge(true);
              }}
            >
              <EditIcon className="w-8 h-8 invert-0 dark:invert" />
            </button>
          )}
          {canDelete && (
            <button onClick={() => handleDelete(row.id)}>
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
    <>
      <PageMeta title="Green minds Admin | Age Group" description={``} />
      <div className="relative rounded-2xl border-b border-[#D9D9D9] pb-5  dark:border-gray-800 h-full min-h-[calc(100vh-48px)] dark:bg-neutral-800 bg-[#EDEDED]">
        <div className="h-17.5 mb-6 flex flex-wrap items-center justify-between gap-4 px-5 border-b border-[#D9D9D9] dark:border-gray-600 py-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {t("age_groups")}
          </h2>
          {canCreate && (
            <AddButton
              startIcon={<Plus />}
              onClick={() => {
                setEditData(null);
                setOpenModalAge(true);
              }}
            >
              {t("add_age_groups")}
            </AddButton>
          )}
        </div>
        <div className="px-5">
          {loading ? (
            <TableLoading columnCount={3} />
          ) : (
            <BasicTableOne data={ageGroups} columns={columns} />
          )}
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
    </>
  );
}
