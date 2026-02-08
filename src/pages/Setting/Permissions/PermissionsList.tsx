import { useState, useEffect } from "react";
import PageMeta from "../../../components/common/PageMeta";
import { useLanguage } from "../../../locales/LanguageContext";
import {
  AllPermissions,
  updatePermissions,
} from "../../../api/services/adminRolesService";
import { PermissionApiResponse } from "../../../utils/types/permissionType";
import UpdatePermissionModal from "./UpdatePermissionModal";
import { EditIcon } from "../../../icons";
import { toast } from "sonner";
import { PermissionsSkeletonList } from "../../../components/loading/PermissionSkeleton";
import { ShowToastSuccess } from "../../../components/common/ToastHelper";
import {
  fetchUserPermissions,
  hasPermission,
} from "../../../utils/permissions/permissions";
import EmptyState from "../../../components/common/no-data-found";

export default function PermissionsList() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [permissions, setPermissions] = useState<PermissionApiResponse["Data"]>(
    [],
  );

  const [selectedPermission, setSelectedPermission] = useState<
    PermissionApiResponse["Data"][number] | null
  >(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    fetchUserPermissions();
  }, []);

  const canEdit = hasPermission("AdminPermissions_UpdatePermissionDisplayName");
  const canView = hasPermission("AdminPermissions_GetAllPermissions");

  useEffect(() => {
    const fetchPermissions = async () => {
      if (!canView) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data: PermissionApiResponse = await AllPermissions();
        setPermissions(data.Data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPermissions();
  }, []);

  const openEditModal = (perm: PermissionApiResponse["Data"][number]) => {
    setSelectedPermission(perm);
    setModalOpen(true);
  };

  const handleSave = async (data: { id?: number; DisplayName: string }) => {
    if (!data.id) return;
    try {
      setSaving(true);
      await updatePermissions({ Id: data.id, DisplayName: data.DisplayName });
      ShowToastSuccess(t("permissions_updated_successfully"));

      setPermissions((prev) =>
        prev.map((p) =>
          p.Id === data.id ? { ...p, DisplayName: data.DisplayName } : p,
        ),
      );
      setModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(t("error_update_permission"));
    } finally {
      setSaving(false);
    }
  };

  if (!canView && !loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <EmptyState
          title={t("access_denied")}
          description={t("not_authorized_to_view_this_page")}
        />
      </div>
    );
  }

  return (
    <>
      <PageMeta title="Green minds Admin | Permissions " description={``} />
      <div className="relative rounded-2xl border-b border-[#D9D9D9] pb-5  dark:border-gray-800 dark:bg-neutral-800 bg-[#EDEDED] min-h-[calc(100vh-48px)]">
        <div className=" mb-6 flex flex-wrap items-center justify-between gap-4 px-5 border-b border-[#D9D9D9] dark:border-gray-600 py-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {t("Permission")}
          </h2>
        </div>

        {loading ? (
          <PermissionsSkeletonList count={12} />
        ) : permissions.length === 0 ? (
          <p className="text-gray-600">{t("no_permissions_found")}</p>
        ) : (
         <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-8 px-6">
          {permissions.map((perm) => (
            <div
              key={perm.Id}
              className="flex items-center justify-between border border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-[#1e1e1e] rounded-xl shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <div className="flex flex-col w-[85%]">
                <span className="line-clamp-1 text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  {perm.DisplayName}
                </span>
                <span className="line-clamp-1 text-[11px] text-green-700 dark:text-green-500/80 font-mono italic">
                  {perm.Key}
                </span>
              </div>

              {canEdit && (
                <button 
                  onClick={() => openEditModal(perm)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <EditIcon className="w-5 h-5 text-gray-500 dark:text-gray-400 dark:invert-0" />
                </button>
              )}
            </div>
          ))}
        </div>
        )}
      </div>

      {selectedPermission && (
        <UpdatePermissionModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          initialData={{
            id: selectedPermission.Id,
            DisplayName: selectedPermission.DisplayName,
          }}
          onSave={handleSave}
          loading={saving}
        />
      )}
    </>
  );
}
