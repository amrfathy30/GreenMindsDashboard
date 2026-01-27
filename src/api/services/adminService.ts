import { AdminList } from "../../utils/types/adminType";
import axiosInstance from "../axiosInstance";

export const allAdminData = async () => {
  const response = await axiosInstance.get("/Users/admins");
  return response.data;
};
export const UserTypes = async () => {
  const response = await axiosInstance.get("/Users/UserTypes");
  return response.data;
};

export const createAdmin = async (data: AdminList) => {
  const response = await axiosInstance.post("/Users/CreateUserWithType", data);
  return response.data;
};

export const updateAdmin = async (data: FormData, id: number) => {
  const response = await axiosInstance.put(`/Account/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteAdmin = async (id: number) => {
  const response = await axiosInstance.delete(`/Account/${id}`);
  return response.data;
};
