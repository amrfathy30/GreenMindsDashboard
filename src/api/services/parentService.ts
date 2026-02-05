import { ParentFormData, ParentParams } from "../../utils/types/parentType";
import axiosInstance from "../axiosInstance";

export const allParentData = async (params?: ParentParams) => {
  const response = await axiosInstance.get("/Parents", { params });
  return response.data;
};

export const createParent = async (data: ParentFormData) => {
  const response = await axiosInstance.post("/Parents", data);
  return response.data;
};

export const createUserParent = async (data: ParentFormData) => {
  const response = await axiosInstance.post("/Account/CreateUserWithType", data);
  return response.data;
};

export const updateParent = async (data: ParentFormData, id: number) => {
  const response = await axiosInstance.put(`/Parents/${id}`, data);
  return response.data;
};

export const deleteParent = async (id: number) => {
  const response = await axiosInstance.delete(`/Parents/${id}`);
  return response.data;
};
