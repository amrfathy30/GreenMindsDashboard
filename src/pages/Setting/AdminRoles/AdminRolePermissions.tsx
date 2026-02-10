/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { ExtendedProps } from "../../../utils/types/permissionType";
import PermissionsSkeleton from "../../../components/loading/PermissionsSkeleton";
import EmptyState from "../../../components/common/no-data-found";
import { hasPermission } from "../../../utils/permissions/permissions";
import Input from "../../../components/form/input/InputField";

const AdminRolePermissions: React.FC<ExtendedProps> = ({
  permissions,
  selectedPermissions,
  setSelectedPermissions,
  pageLoading,
  t,
}) => {
  const VIRTUAL_PERMISSIONS = {
    SMTP_FULL: {
      label: "SMTP",
      keys: ["Smtp_Get", "Smtp_Update"],
    },
    AGE_SECTORS_FULL: {
      label: "Age Sectors",
      keys: ["AgeSectors_GetAll", "AgeSectors_GetPaged"],
    },
    USER_ACTIVITY_FULL: {
      label: "User Activity",
      keys: [
        "Videos_GetByUserId",
        "Games_GetByUserId",
        "Children_GetChildPointsById",
        "Children_GetChild",
        "Children_GetChildren",
      ],
    },
  };

  const HIDDEN_PERMISSION_KEYS = [
    "AdminRoles_GetRolesForUser",
    "Avatars_GetAvatarsByUserId",
    "Videos_GetByUserId",
    "Games_GetByUserId",
    "Children_GetChildPointsById",
    "Children_GetChild",
    "Children_GetChildren",
    "AgeSectors_GetAll",
    "AgeSectors_GetPaged",
    "AgeSectors_Get",
    "Smtp_Get",
    "AdminRoles_GetUsersInRole",
    "Users_CreateUserWithType",
    "Account_Create",
    "Account_ResetPassword",
    "Account_GetById",
    "Account_GetMyPersonalInfo",
    "Account_ChangePasswordByUserId",
    "Account_GetPersonalInfo",
    "Account_UpdateProfile",
    "Smtp_Update",
    "Account_UserTypes",
    "Smtp_GetAll",
    "Account_TestToken",
    "Account_GetAll",
    "Avatars_Get",
    "Avatars_GetForCurrentUser",
    "Children_GetChildAvatarsByAge",
    "Children_GetChildrenLookup",
    "Account_AddChild",
    "Children_GetChildrenByParent",
    "Children_GetChildVideosByAge",
    "Children_UpdateChildByParent",
    "Children_GetChildGamesByAge",
    "Children_GetChildPointsByIdWithPermission",
    "Children_RemoveMyChild",
    "Children_GetPointsForChild",
    "Games_GetAll",
    "Games_GetByUserAge",
    "Games_Get",
    "Levels_GetAllPagedWithHeaders",
    "Parents_GetParentsLookup",
    "Parents_GetParentSonsList",
    "Parents_GetParent",
    "Parents_RegisterSonByParent",
    "Parents_GetUserTypesLookup",
    "Parents_GetChildrenOrderList",
    "Smtp_Create",
    "Smtp_Delete",
    "Users_GetAll",
    "Users_GetAdmins",
    "Users_Get",
    "Users_Create",
    "Users_Update",
    "Users_Delete",
    "Users_GetPersonalInfo",
    "Users_GetMyPersonalInfo",
    "Users_GetById",
    "Users_UserTypes",
    "Users_MyRolesAndPermissions",
    "Users_AddPoints",
    "Videos_GetAll",
    "Videos_GetByAgeSector",
    "Videos_Get",
    "Videos_Complete",
    "WeatherForecast_Get",
    "Debug_InfoAuth",
    "Account_AddPoints",
    "Levels_GetPaged",
    "Levels_Get",
    "Parents_CreateUserWithType",
    "Children_GetAllChildren",
    "Avatars_GetAll",
  ];

  const visiblePermissions = permissions.filter(
    (perm): perm is { Id: number; DisplayName: string; Key: string } =>
      !!perm.Key &&
      !HIDDEN_PERMISSION_KEYS.includes(perm.Key) &&
      !VIRTUAL_PERMISSIONS.AGE_SECTORS_FULL.keys.includes(perm.Key),
  );

  const AGE_SECTOR_KEYS = VIRTUAL_PERMISSIONS.AGE_SECTORS_FULL.keys;
  const AGE_SECTOR_DEPENDENT_KEYS = [
    "Games_Create",
    "Games_Update",
    "Videos_Create",
    "Videos_Update",
  ];

  const togglePermission = (id: number, isChecked: boolean) => {
    const updatedSet = new Set(selectedPermissions);

    const currentPermission = permissions.find((p) => p.Id === id);
    if (!currentPermission) return;

    const currentKey = currentPermission.Key;
    if (!currentKey) return;

    if (isChecked) {
      updatedSet.delete(id);

      if (AGE_SECTOR_DEPENDENT_KEYS.includes(currentKey)) {
        const stillHasAny = AGE_SECTOR_DEPENDENT_KEYS.some((key) => {
          const permId = permissions.find((p) => p.Key === key)?.Id;
          return permId && updatedSet.has(permId);
        });
        if (!stillHasAny) {
          AGE_SECTOR_KEYS.forEach((key) => {
            const ageId = permissions.find((p) => p.Key === key)?.Id;
            if (ageId) updatedSet.delete(ageId);
          });
        }
      }
    } else {
      updatedSet.add(id);
      if (AGE_SECTOR_DEPENDENT_KEYS.includes(currentKey)) {
        AGE_SECTOR_KEYS.forEach((key) => {
          const ageId = permissions.find((p) => p.Key === key)?.Id;
          if (ageId) updatedSet.add(ageId);
        });
      }
    }

    setSelectedPermissions(Array.from(updatedSet));
  };

  const getPermissionGroup = (key: string) => {
    if (key.startsWith("Dashboard_")) return "Dashboard";
    if (key.startsWith("AdminRoles_") || key.startsWith("AdminPermissions_"))
      return "Roles & Permissions";
    if (key.startsWith("AgeSectors_")) return "AgeSector";
    if (key.startsWith("Avatars_")) return "Avatars";
    if (key.startsWith("Children_")) return "Children";
    if (key.startsWith("Parents_")) return "Parents";
    if (key.startsWith("Games_")) return "Games";
    if (key.startsWith("Videos_")) return "Videos";
    if (key.startsWith("Levels_")) return "Levels";
    if (key.startsWith("Users_")) return "Users";
    if (key.startsWith("Account_")) return "Admin";
    if (key.startsWith("Smtp_")) return "SMTP";
    return "Other";
  };

  const groupPermissions = (perms: any[]) => {
    const groups: Record<string, any[]> = {};
    perms.forEach((perm) => {
      if (!perm.Key) return;
      const group = getPermissionGroup(perm.Key);
      if (!groups[group]) groups[group] = [];
      groups[group].push(perm);
    });
    return groups;
  };

  const groupedPermissions = groupPermissions(visiblePermissions);

  const toggleGroup = (groupPerms: any[]) => {
    const ids = groupPerms.map((p) => p.Id);
    const allSelected = ids.every((id) => selectedPermissions.includes(id));
    setSelectedPermissions((prev) =>
      allSelected
        ? prev.filter((id) => !ids.includes(id))
        : Array.from(new Set([...prev, ...ids])),
    );
  };

  const toggleVirtualPermission = (
    virtualKey: keyof typeof VIRTUAL_PERMISSIONS,
  ) => {
    const updatedSet = new Set(selectedPermissions);
    const keys = VIRTUAL_PERMISSIONS[virtualKey].keys;

    const ids = keys
      .map((key) => permissions.find((p) => p.Key === key)?.Id)
      .filter(Boolean) as number[];

    const allSelected = ids.every((id) => updatedSet.has(id));

    if (allSelected) ids.forEach((id) => updatedSet.delete(id));
    else ids.forEach((id) => updatedSet.add(id));

    setSelectedPermissions(Array.from(updatedSet));
  };

  const hasSMTP = VIRTUAL_PERMISSIONS.SMTP_FULL.keys.some((key) =>
    permissions.some((p) => p.Key === key),
  );

  const canView = hasPermission("AdminPermissions_GetAllPermissions");

  if (!canView) {
    return (
      <div className="flex items-center justify-center min-h-100 w-full">
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
                {/* Normal Permissions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {/* Virtual AgeSectors Permission */}
                  {groupName === "AgeSector" &&
                    VIRTUAL_PERMISSIONS.AGE_SECTORS_FULL.keys.some((key) =>
                      permissions.some((p) => p.Key === key),
                    ) && (
                      <Input
                        type="checkbox"
                        label="AgeSector Get All Data"
                        checked={VIRTUAL_PERMISSIONS.AGE_SECTORS_FULL.keys.every(
                          (k) =>
                            selectedPermissions.includes(
                              permissions.find((p) => p.Key === k)?.Id ?? -1,
                            ),
                        )}
                        onChange={() =>
                          toggleVirtualPermission("AGE_SECTORS_FULL")
                        }
                        className="text-[12px] font-semibold"
                      />
                    )}
                  {/* Virtual User Activity Permission */}
                  {groupName === "Children" &&
                    VIRTUAL_PERMISSIONS.USER_ACTIVITY_FULL.keys.some((key) =>
                      permissions.some((p) => p.Key === key),
                    ) && (
                      <Input
                        type="checkbox"
                        label="Children Get All Data"
                        checked={VIRTUAL_PERMISSIONS.USER_ACTIVITY_FULL.keys.every(
                          (k) =>
                            selectedPermissions.includes(
                              permissions.find((p) => p.Key === k)?.Id ?? -1,
                            ),
                        )}
                        onChange={() =>
                          toggleVirtualPermission("USER_ACTIVITY_FULL")
                        }
                        className="text-[12px] font-semibold"
                      />
                    )}

                  {/* Normal Permissions */}
                  {groupPerms.map((perm) => (
                    <Input
                      key={perm.Id}
                      type="checkbox"
                      label={perm.DisplayName}
                      checked={selectedPermissions.includes(perm.Id)}
                      onChange={() =>
                        togglePermission(
                          perm.Id,
                          selectedPermissions.includes(perm.Id),
                        )
                      }
                      className="text-[12px]"
                    />
                  ))}
                </div>{" "}
              </div>
            );
          })}

        {hasSMTP && (
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e1e1e] p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-sm text-gray-800 dark:text-white">
                SMTP
              </h4>
            </div>

            <Input
              type="checkbox"
              label="SMTP (Get + Update)"
              checked={VIRTUAL_PERMISSIONS.SMTP_FULL.keys.every((k) =>
                selectedPermissions.includes(
                  permissions.find((p) => p.Key === k)?.Id ?? -1,
                ),
              )}
              onChange={() => toggleVirtualPermission("SMTP_FULL")}
              className="text-[12px] font-semibold"
            />
          </div>
        )}
        {/* {VIRTUAL_PERMISSIONS.AGE_SECTORS_FULL.keys.some((key) =>
  permissions.some((p) => p.Key === key)
) && (
  <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e1e1e] p-4 shadow-sm">
    <div className="flex items-center justify-between mb-3">
      <h4 className="font-bold text-sm text-gray-800 dark:text-white">
        AgeSectors
      </h4>
    </div>

    <Input
      type="checkbox"
      label="Age Sectors (GetAll + GetPaged)"
      checked={VIRTUAL_PERMISSIONS.AGE_SECTORS_FULL.keys.every((k) =>
        selectedPermissions.includes(
          permissions.find((p) => p.Key === k)?.Id ?? -1
        )
      )}
      onChange={() => toggleVirtualPermission("AGE_SECTORS_FULL")}
      className="text-[12px] font-semibold"
    />
  </div>
)} */}
      </div>
    </div>
  );
};

export default AdminRolePermissions;
