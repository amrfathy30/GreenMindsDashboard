/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import AddButton from "../../../components/ui/button/AddButton";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import PageMeta from "../../../components/common/PageMeta";

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
import { MoreDotIcon } from "../../../icons";

export default function AdminRoles() {
  const [loading, setLoading] = useState(true);
  const lang = localStorage.getItem("GM-language");
  const { t } = useLanguage();
  const [adminRoles, setAdminRoles] = useState<any[]>([]);
  const [adminRolePermission, setAdminRolePermission] = useState<any[]>([]);
  const [allPermissions, setAllPermissions] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [saving, setSaving] = useState(false);
  const [addRoleLoading, setAddRoleLoading] = useState(false);
  const [editRoleModalOpen, setEditRoleModalOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [roleToEdit, setRoleToEdit] = useState<any>(null);

  const handleEditRole = (role: any) => {
    setRoleToEdit(role);
    setEditRoleModalOpen(true);
  };

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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".dropdown-wrapper")) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

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
        const payload = {
          RoleName: data.RoleName,
          Permissions: [],
        };
        await createRole(payload);
      }

      setOpenModal(false);
      setEditRoleModalOpen(false);

      const rolesData: AgeApiResponse = await allAdminRoles();
      setAdminRoles(rolesData.Data);

      const index = roleToEdit
        ? rolesData.Data.findIndex((r) => r.Id === roleToEdit.Id)
        : rolesData.Data.length - 1;
      setActiveTab(index);

      setRoleToEdit(null);
    } catch {
      toast.error(
        roleToEdit ? t("failed_update_role") : t("failed_create_role"),
      );
    } finally {
      setAddRoleLoading(false);
    }
  };

  // fetchAdminRoles
  useEffect(() => {
    const fetchAdminRoles = async () => {
      try {
        setLoading(true);
        const data: AgeApiResponse = await allAdminRoles();

        setAdminRoles(data.Data);
      } catch (error) {
        toast.error(t("failed_load_data"));
      } finally {
        setLoading(false);
      }
    };

    fetchAdminRoles();
  }, [t]);

  // fetchAllPermissions
  useEffect(() => {
    const fetchAllPermissions = async () => {
      try {
        const data = await AllPermissions();
        setAllPermissions(Array.isArray(data.Data) ? data.Data : []);
      } catch {
        toast.error(t("failed_load_data"));
      }
    };

    fetchAllPermissions();
  }, [t]);

  // fetchActiveAdminRoles
  const fetchActiveAdminRoles = async () => {
    if (!adminRoles[activeTab]) return;

    try {
      setLoading(true);
      const data = await allRolePermissions(adminRoles[activeTab].Name);
      setAdminRolePermission(Array.isArray(data.Data) ? data.Data : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab != null && adminRoles) {
      fetchActiveAdminRoles();
    }
  }, [activeTab, adminRoles]);

  const assignedPermissionIds = adminRolePermission.map((p) => p.Id);

  const handleSavePermissions = async (selectedPermissions: number[]) => {
    if (saving) return;

    try {
      setSaving(true);
      const activeRole = adminRoles[activeTab];

      const payload = {
        PermissionIds: selectedPermissions,
      };

      await updateRolePermissions(activeRole.Id, payload);

      await fetchActiveAdminRoles();

      toast.success(t("permissions_updated_successfully"));
    } catch {
      toast.error(t("failed_update_permissions"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageMeta title="Green minds Admin | Admin Roles" description={``} />
      <div className="relative rounded-2xl border-b border-[#D9D9D9] pb-5  dark:border-gray-800 dark:bg-neutral-800 bg-[#EDEDED]">
        <div className="h-[70px] mb-6 flex flex-wrap items-center justify-between gap-4 px-5 border-b border-[#D9D9D9] dark:border-gray-600 py-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {t("AdminRoles")}
          </h2>

          <AddButton startIcon={<Plus />} onClick={() => setOpenModal(true)}>
            {t("add_admin_role")}
          </AddButton>
        </div>
        <div className="px-5">
          {/* Tab Headers */}
          <div className="flex border-b border-gray-200">
            {adminRoles.map((role, index) => (
              <div
                key={role.Id}
                className="relative flex items-center dropdown-wrapper"
              >
                <button
                  onClick={() => setActiveTab(index)}
                  className={`py-2 px-4 text-sm font-medium transition-colors duration-200 focus:outline-none
          ${
            activeTab === index
              ? "border-b-2 border-primary text-primary"
              : "text-gray-500 hover:text-gray-700"
          }`}
                >
                  {role?.Name}
                </button>

                <div className="relative ml-2">
                  <button
                    onClick={() =>
                      setOpenDropdown((prev) =>
                        prev === role.Id ? null : role.Id,
                      )
                    }
                    className="p-1 hover:bg-gray-200 rounded-full"
                  >
                    <MoreDotIcon />
                  </button>

                  {openDropdown === role.Id && (
                    <div
                      className={`${lang === "en" ? "right-0" : "left-0"} absolute  mt-1 w-32 bg-white border rounded shadow-lg z-10`}
                    >
                      <button
                        onClick={() => {
                          handleEditRole(role);
                          setOpenDropdown(null);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        {t("edit")}
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(role.Id);
                          setOpenDropdown(null);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                      >
                        {t("delete")}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Tab Content */}
          <AdminRolePermissions
            permissions={allPermissions}
            assignedPermissions={assignedPermissionIds}
            loading={saving}
            pageLoading={loading}
            t={t}
            onSave={handleSavePermissions}
          />
          <AddRoleModal
            open={editRoleModalOpen || openModal}
            onClose={() => {
              setEditRoleModalOpen(false);
              setOpenModal(false);
            }}
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
      </div>
    </>
  );
}
