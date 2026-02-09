/* eslint-disable @typescript-eslint/no-explicit-any */
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
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  const getPermissionGroup = (displayName: string) => {
    const name = displayName.toLowerCase();

    if (name.includes("adminroles") || name.includes("role")) return "Roles";
    if (name.includes("agesector") || name.includes("AgeSector"))
      return "AgeSector";
    if (name.includes("avatar")) return "Avatars";
    if (name.includes("child")) return "Children";
    if (name.includes("parent")) return "Parents";
    if (name.includes("game")) return "Games";
    if (name.includes("video")) return "Videos";
    if (name.includes("level")) return "Levels";
    if (name.includes("dashboard")) return "Dashboard";
    if (name.includes("user")) return "Users";
    if (name.includes("account")) return "Account";
    if (name.includes("smtp")) return "SMTP";
    if (name.includes("permission")) return "Permissions";

    return "Other";
  };

  const groupPermissions = (permissions: any[]) => {
    const groups: Record<string, any[]> = {};

    permissions.forEach((perm) => {
      if (!perm.DisplayName) return;

      const key = getPermissionGroup(perm.DisplayName);

      if (!groups[key]) {
        groups[key] = [];
      }

      groups[key].push(perm);
    });

    return groups;
  };

  const groupedPermissions = groupPermissions(permissions);

  const toggleGroup = (groupPerms: any[]) => {
    const ids = groupPerms.map((p) => p.Id);

    const allSelected = ids.every((id) => selectedPermissions.includes(id));

    setSelectedPermissions((prev) =>
      allSelected
        ? prev.filter((id) => !ids.includes(id))
        : Array.from(new Set([...prev, ...ids])),
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

      <div className="space-y-4 p-2">
        {Object.entries(groupedPermissions)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([groupName, groupPerms]) => {
            const allSelected = groupPerms.every((p) =>
              selectedPermissions.includes(p.Id),
            );
            return (
              <div
                key={groupName}
                className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e1e1e] p-4 shadow-sm"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-sm text-gray-800 dark:text-white">
                    {groupName}
                  </h4>

                  <button
                    onClick={() => toggleGroup(groupPerms)}
                    className="text-xs px-3 py-1 rounded-lg border
              border-gray-400 text-gray-600 dark:text-gray-100 
              hover:bg-gray-400 hover:text-white transition"
                  >
                    {allSelected ? t("unselect_all") : t("select_all")}
                  </button>
                </div>

                {/* Permissions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {groupPerms.map((perm) => (
                    <Input
                      key={perm.Id}
                      type="checkbox"
                      label={perm.DisplayName}
                      checked={selectedPermissions.includes(perm.Id)}
                      onChange={() => togglePermission(perm.Id)}
                      className="text-[12px]"
                    />
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AdminRolePermissions;
