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

export const GetMyPermissions = async () => {
  const response = await axiosInstance.get("/Account/MyRolesAndPermissions");
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

export const updateRolePermissions = async (
  roleId: number,
  data: {
    RoleId?: number;
    NewName?: string;
    Description?: string;
    PermissionIds: number[];
  },
) => {
  const response = await axiosInstance.post(
    `/AdminRoles/${roleId}/permissions/update`,
    data,
  );
  return response.data;
};

export const updateRole = async (roleName: string, newName: string) => {
  const response = await axiosInstance.post(`/AdminRoles/${roleName}`, {
    RoleName: newName,
  });
  return response.data;
};

export const AddAdminRole = async (roleName: string, userId: string) => {
  const response = await axiosInstance.post(
    `/AdminRoles/users/${userId}/roles/${roleName}`,
  );
  return response.data;
};

export const deleteRole = async (roleName: string) => {
  const response = await axiosInstance.delete(`/AdminRoles/${roleName}`);
  return response.data;
};

export const createRole = async (data: {
  RoleName?: string;
  Permissions: number[];
}) => {
  const response = await axiosInstance.post(`/AdminRoles`, data);
  return response.data;
};
