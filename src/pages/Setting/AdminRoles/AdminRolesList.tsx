/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import AddButton from "../../../components/ui/button/AddButton";
import { Plus, Edit2, Trash2, Save } from "lucide-react"; 
import { toast } from "sonner";
import PageMeta from "../../../components/common/PageMeta";
import Button from "../../../components/ui/button/Button";

import { AgeApiResponse } from "../../../utils/types/ageType";
import { useLanguage } from "../../../locales/LanguageContext";
import {
  allAdminRoles,
  AllPermissions,
  allRolePermissions,
  createRole,
  deleteRole,
  updateRolePermissions,
} from "../../../api/services/adminRolesService";
import AdminRolePermissions from "./AdminRolePermissions";
import AddRoleModal from "./AddRoleModal";
import ConfirmModal from "../../../components/common/ConfirmModal";
import { ShowToastSuccess } from "../../../components/common/ToastHelper";
import {
  fetchUserPermissions,
  hasPermission,
} from "../../../utils/permissions/permissions";
import EmptyState from "../../../components/common/no-data-found";

export default function AdminRoles() {
  const [loading, setLoading] = useState(true);
  const lang = localStorage.getItem("GM-language");
  const { t } = useLanguage();
  const [adminRoles, setAdminRoles] = useState<any[]>([]);
  const [allPermissions, setAllPermissions] = useState<any[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]); 
  const [permissionsLoading, setPermissionsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [saving, setSaving] = useState(false);
  const [addRoleLoading, setAddRoleLoading] = useState(false);
  const [editRoleModalOpen, setEditRoleModalOpen] = useState(false);
  const [roleToEdit, setRoleToEdit] = useState<any>(null);

  useEffect(() => {
    fetchUserPermissions();
  }, []);

  const canCreateRole = hasPermission("AdminRoles_CreateRole");
  const canUpdateRoleAndPermissions = hasPermission("AdminRoles_UpdateRoleAndPermissions");
  const canViewRoles = hasPermission("AdminRoles_GetAllRoles");
  const canViewPermissions = hasPermission("AdminPermissions_GetAllPermissions");
  const canDeleteRole = hasPermission("AdminRoles_DeleteRole");

  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);

  const handleDeleteTrigger = () => {
    const role = adminRoles[activeTab];
    if (role) {
      setSelectedDeleteId(role.Id);
      setOpenConfirm(true);
    }
  };

  const confirmDelete = async () => {
    if (!selectedDeleteId) return;
    try {
      setLoading(true);
      const role = adminRoles.find((r) => r.Id === selectedDeleteId);
      if (!role) throw new Error("Role not found");
      const res = await deleteRole(role.Name);
      ShowToastSuccess(res?.Message || t("success_delete_role"));
      const rolesData: AgeApiResponse = await allAdminRoles();
      setAdminRoles(rolesData.Data);
      setActiveTab(0);
    } catch (error: any) {
      toast.error(error?.response?.data?.Message || t("failed_delete_role"));
    } finally {
      setLoading(false);
      setOpenConfirm(false);
      setSelectedDeleteId(null);
    }
  };

  const handleSaveRole = async (data: { RoleName: string }) => {
    try {
      setAddRoleLoading(true);
      if (roleToEdit) {
        await updateRolePermissions(roleToEdit.Id, {
          RoleId: roleToEdit.Id,
          NewName: data.RoleName,
          Description: "",
          PermissionIds: [],
        });
      } else {
        await createRole({ RoleName: data.RoleName, Permissions: [] });
      }
      setOpenModal(false);
      setEditRoleModalOpen(false);
      const rolesData: AgeApiResponse = await allAdminRoles();
      setAdminRoles(rolesData.Data);
      setRoleToEdit(null);
    } catch {
      toast.error(roleToEdit ? t("failed_update_role") : t("failed_create_role"));
    } finally {
      setAddRoleLoading(false);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      if (!canViewRoles) return;
      try {
        setLoading(true);
        const [rolesRes, permsRes] = await Promise.all([
          allAdminRoles(),
          canViewPermissions ? AllPermissions() : Promise.resolve({ Data: [] })
        ]);
        setAdminRoles(rolesRes.Data);
        setAllPermissions(Array.isArray(permsRes.Data) ? permsRes.Data : []);
      } catch {
        toast.error(t("failed_load_data"));
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, [t, canViewRoles, canViewPermissions]);

  const fetchActiveRolePermissions = async () => {
    if (!adminRoles[activeTab]) return;
    setPermissionsLoading(true);
    try {
      const data = await allRolePermissions(adminRoles[activeTab].Name);
      const ids = Array.isArray(data.Data) ? data.Data.map((p: any) => p.Id) : [];
      setSelectedPermissions(ids);
    } finally {
      setPermissionsLoading(false);
    }
  };

  useEffect(() => {
    if (adminRoles.length > 0) fetchActiveRolePermissions();
  }, [activeTab, adminRoles]);

  const handleSavePermissions = async () => {
    if (saving || !adminRoles[activeTab]) return;
    try {
      setSaving(true);
      await updateRolePermissions(adminRoles[activeTab].Id, {
        PermissionIds: selectedPermissions,
      });
      ShowToastSuccess(t("permissions_updated_successfully"));
    } catch {
      toast.error(t("failed_update_permissions"));
    } finally {
      setSaving(false);
    }
  };

  if (!canViewRoles && !loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <EmptyState title={t("access_denied")} description={t("not_authorized_to_view_this_page")} />
      </div>
    );
  }

  return (
    <>
      <PageMeta title="Green minds Admin | Admin Roles" description={``} />
      <div className="relative rounded-2xl border-b border-[#D9D9D9] pb-5 dark:border-gray-800 dark:bg-neutral-800 bg-[#EDEDED]">
        <div className="md:h-[70px] mb-6 flex flex-wrap items-center justify-between gap-4 px-5 border-b border-[#D9D9D9] dark:border-gray-600 py-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t("AdminRoles")}</h2>
          {canCreateRole && (
            <AddButton startIcon={<Plus />} onClick={() => { setRoleToEdit(null); setOpenModal(true); }}>
              {t("add_admin_role")}
            </AddButton>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-6 px-5 min-h-[500px]">
          <div className={`flex flex-col gap-2 min-w-[200px] py-2 ${lang === "ar" ? "border-l border-gray-300 dark:border-gray-700/50 pl-6" : "border-r border-gray-300 dark:border-gray-700/40 pr-6"}`}>            {adminRoles.map((role, index) => (
              <button
                key={role.Id}
                onClick={() => setActiveTab(index)}
                className={`py-2.5 px-4 text-start rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === index ? "bg-secondary text-white shadow-md" : "text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {role?.Name}
              </button>
            ))}
          </div>

          <div className="flex-1 flex flex-col bg-white dark:bg-[#1e1e1e] rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
            {adminRoles[activeTab] && (
              <>
                <div className="flex flex-wrap items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-gray-800 gap-4">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                      {t("current_role")}
                    </span>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white leading-tight">
                      {adminRoles[activeTab].Name}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {canUpdateRoleAndPermissions && (
                      <button 
                        onClick={() => { setRoleToEdit(adminRoles[activeTab]); setEditRoleModalOpen(true); }}
                        className="flex items-center gap-2 px-4 py-1.5 text-xs font-medium rounded-[11px] border border-blue-500 text-blue-500 transition-all duration-300 hover:bg-blue-500 hover:text-white group"
                      >
                        <Edit2 size={14} className="group-hover:scale-110 transition-transform" /> 
                        {t("edit_role_name")}
                      </button>
                    )}

                    {canDeleteRole && (
                      <button 
                        onClick={handleDeleteTrigger}
                        className="flex items-center gap-2 px-4 py-1.5 text-xs font-medium rounded-[11px] border border-red-500 text-red-500 transition-all duration-300 hover:bg-red-500 hover:text-white group"
                      >
                        <Trash2 size={14} className="group-hover:scale-110 transition-transform" /> 
                        {t("delete_role")}
                      </button>
                    )}

                    <button 
                      onClick={handleSavePermissions} 
                      disabled={saving || permissionsLoading}
                      className="flex items-center gap-2 px-4 py-1.5 text-xs font-medium rounded-[11px] border border-[#25B16F] text-[#25B16F] transition-all duration-300 hover:bg-[#25B16F] hover:text-white group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save size={14} className={`${saving ? 'animate-spin' : 'group-hover:scale-110'} transition-transform`} />
                      {saving ? t("updating") : t("save_new_permissions")}
                    </button>
                  </div>
                </div>
                <AdminRolePermissions
                  permissions={allPermissions}
                  selectedPermissions={selectedPermissions}
                  setSelectedPermissions={setSelectedPermissions}
                  loading={saving}
                  pageLoading={permissionsLoading}
                  t={t}
                  onSave={handleSavePermissions}
                />
              </>
            )}
          </div>
        </div>

        <AddRoleModal
          open={editRoleModalOpen || openModal}
          onClose={() => { setEditRoleModalOpen(false); setOpenModal(false); }}
          onSave={handleSaveRole}
          initialData={roleToEdit ? { RoleName: roleToEdit.Name } : undefined}
          editing={!!roleToEdit}
          loading={addRoleLoading}
        />
        <ConfirmModal
          open={openConfirm}
          loading={loading}
          onClose={() => setOpenConfirm(false)}
          onConfirm={confirmDelete}
          title={t("delete_Role")}
          description={t("confirm_delete_Role")}
        />
      </div>
    </>
  );
}