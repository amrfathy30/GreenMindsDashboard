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
  updateRolePermissions,
} from "../../../api/services/adminRolesService";
import { useNavigate } from "react-router";
import AdminRolePermissions from "./AdminRolePermissions";
import AddRoleModal from "./AddRoleModal";

export default function AdminRoles() {
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();
  const [adminRoles, setAdminRoles] = useState<any[]>([]);
  const [adminRolePermission, setAdminRolePermission] = useState<any[]>([]);
  const [allPermissions, setAllPermissions] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const [activeTab, setActiveTab] = useState(0);
  const [saving, setSaving] = useState(false);
  const [addRoleLoading, setAddRoleLoading] = useState(false);

  // fetchAdminRoles
  useEffect(() => {
    const fetchAdminRoles = async () => {
      try {
        setLoading(true);
        const data: AgeApiResponse = await allAdminRoles();

        setAdminRoles(data.Data);
      } catch (error) {
        toast.error(t("failed_load_age"));
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
        toast.error(t("failed_load_permissions"));
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

  const handleSave = async (data: { RoleName: string }) => {
  try {
    setAddRoleLoading(true);

    const payload = {
      RoleName: data.RoleName,
      Permissions: [], 
    };

    await createRole(payload);

    toast.success(t("role_created_successfully"));

    setOpenModal(false);

    const rolesData: AgeApiResponse = await allAdminRoles();
    setAdminRoles(rolesData.Data);

    setActiveTab(rolesData.Data.length - 1);
  } catch {
    toast.error(t("failed_create_role"));
  } finally {
    setAddRoleLoading(false);
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
              <button
                key={role}
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
            ))}
          </div>

          {/* Tab Content */}
          <AdminRolePermissions
            permissions={allPermissions}
            assignedPermissions={assignedPermissionIds}
            loading={saving}
            t={t}
            onSave={handleSavePermissions}
          />

          <AddRoleModal
            open={openModal}
            onClose={() => {
              setOpenModal(false);
            }}
            onSave={handleSave}
            loading={addRoleLoading}
          />
        </div>
      </div>
    </>
  );
}
