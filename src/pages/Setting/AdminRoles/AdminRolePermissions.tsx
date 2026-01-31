import React, { useState, useEffect } from "react";
import Button from "../../../components/ui/button/Button";
import Input from "../../../components/form/input/InputField";
import { AdminRolePermissionsProps } from "../../../utils/types/permissionType";
import PermissionsSkeleton from "../../../components/loading/PermissionsSkeleton";
import EmptyState from "../../../components/common/no-data-found";
import { hasPermission } from "../../../utils/permissions/permissions";

const AdminRolePermissions: React.FC<AdminRolePermissionsProps> = ({
  permissions,
  assignedPermissions,
  loading,
  pageLoading,
  t,
  onSave,
}) => {
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);

  useEffect(() => {
    setSelectedPermissions(assignedPermissions || []);
  }, [assignedPermissions]);

  const togglePermission = (id: number) => {
    setSelectedPermissions((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  const handleSave = () => {
    onSave(selectedPermissions);
  };

  const canView = hasPermission("AdminPermissions_GetAllPermissions");

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

  if (pageLoading) {
    return (
      <div className="mt-4">
        <PermissionsSkeleton />
      </div>
    );
  }

  if (permissions.length === 0) {
    return <p className="text-gray-600">{t("no_permissions_found")}</p>;
  }

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
        {permissions.map((perm) => (
          <Input
            key={perm.Id}
            type="checkbox"
            label={perm.Key}
            checked={selectedPermissions.includes(perm.Id)}
            onChange={() => togglePermission(perm.Id)}
          />
        ))}
      </div>

      <div className="mt-4">
        <Button
          onClick={handleSave}
          type="submit"
          className="mt-2 px-8"
          disabled={loading}
        >
          {loading ? t("updating") : t("updateButton")}
        </Button>
      </div>
    </div>
  );
};
export default AdminRolePermissions;
