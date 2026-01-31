import { GetMyPermissions } from "../../api/services/adminRolesService";

export const fetchUserPermissions = async () => {
  try {
    const response = await GetMyPermissions();
    const permissions: string[] = response.data?.Permissions || [];
    // localStorage.setItem("GMadminPermissions", JSON.stringify(permissions));
    return permissions;
  } catch (err) {
    console.error("Failed to fetch user permissions", err);
    return [];
  }
};

export const getPermissions = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem("GMadminPermissions") || "[]");
  } catch {
    return [];
  }
};

export const hasPermission = (permission: string): boolean => {
  return getPermissions().includes(permission);
};
