/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetMyPermissions } from "../../api/services/adminRolesService";

export const fetchUserPermissions = async () => {
  const token = localStorage.getItem("GMadminToken");

  if (!token) {
    return [];
  }

  try {
    const response = await GetMyPermissions();
    const permissions: string[] =
      response?.Data?.Permissions?.map((p: any) => p.PermessionName) || [];

    localStorage.setItem("GMadminPermissions", JSON.stringify(permissions));
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
