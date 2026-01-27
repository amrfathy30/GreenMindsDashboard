import axiosInstance from "../axiosInstance";

export const allAdminRoles = async () => {
  const response = await axiosInstance.get("/AdminRoles/list");
  return response.data;
};

export const AllPermissions = async () => {
  const response = await axiosInstance.get(
    "/AdminPermissions/GetAllPermissions",
  );
  return response.data;
};

export const updatePermissions = async (permission: {
  Id: number;
  DisplayName: string;
}) => {
  const response = await axiosInstance.put(
    "/AdminPermissions/UpdatePermissionDisplayName",
    permission,
  );
  return response.data;
};

export const allRolePermissions = async (roleName = "") => {
  const response = await axiosInstance.get(
    `/AdminRoles/${roleName}/permissions`,
  );
  return response.data;
};
