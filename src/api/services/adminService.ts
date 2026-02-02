import { AdminList } from "../../utils/types/adminType";
import axiosInstance from "../axiosInstance";

export const allAdminData = async () => {
  const response = await axiosInstance.get("/Account/admins");
  return response.data;
};

export const createAdmin = async (data: AdminList) => {
  const response = await axiosInstance.post(
    "/Account/CreateUserWithType",
    data,
  );
  return response.data;
};

export const updateAdmin = async (id: number, data: AdminList) => {
  const response = await axiosInstance.put(`/Account/${id}`, data);
  return response.data;
};

export const deleteAdmin = async (id: number) => {
  const response = await axiosInstance.delete(`/Account/${id}`);
  return response.data;
};
