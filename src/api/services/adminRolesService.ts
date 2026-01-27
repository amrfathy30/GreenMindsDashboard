import axiosInstance from "../axiosInstance";

export const allAdminRoles = async () => {
  const response = await axiosInstance.get("/AdminRoles/list");
  return response.data;
};
export const allRolePermissions = async (roleName='') => {
  const response = await axiosInstance.get(`/AdminRoles/${roleName}/permissions`);
  return response.data;
};