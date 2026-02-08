import React from "react";
import { AdminRolePermissionsProps } from "../../../utils/types/permissionType";
import PermissionsSkeleton from "../../../components/loading/PermissionsSkeleton";
import EmptyState from "../../../components/common/no-data-found";
import { hasPermission } from "../../../utils/permissions/permissions";
import Input from "../../../components/form/input/InputField";

interface ExtendedProps extends AdminRolePermissionsProps {
  selectedPermissions: number[];
  setSelectedPermissions: React.Dispatch<React.SetStateAction<number[]>>;
}

const AdminRolePermissions: React.FC<ExtendedProps> = ({
  permissions,
  selectedPermissions,
  setSelectedPermissions,
  pageLoading,
  t,
}) => {
  const togglePermission = (id: number) => {
    if (pageLoading) return;
    setSelectedPermissions((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const canView = hasPermission("AdminPermissions_GetAllPermissions");

  if (!canView) {
    return (
      <div className="flex items-center justify-center min-h-[400px] w-full">
        <EmptyState
          title={t("access_denied")}
          description={t("not_authorized_to_view_this_page")}
        />
      </div>
    );
  }

  if (permissions.length === 0 && !pageLoading) {
    return <p className="text-gray-600 p-5">{t("no_permissions_found")}</p>;
  }

  return (
    <div className="relative w-full">
      {pageLoading && (
        <div className="absolute inset-0 z-10 bg-[#EDEDED] dark:bg-neutral-800 p-2">
          <PermissionsSkeleton />
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 p-2">
        {permissions.map((perm) => (
          <div key={perm.Id} className="flex items-center">
            <Input
              type="checkbox"
              label={perm.DisplayName}
              checked={selectedPermissions.includes(perm.Id)}
              onChange={() => togglePermission(perm.Id)}
              className="text-[12px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminRolePermissions;