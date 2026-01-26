import { ParentList, ParentParams } from "../../utils/types/parentType";
import axiosInstance from "../axiosInstance";

export const allParentData = async (params?: ParentParams) => {
  const response = await axiosInstance.get("/Parents", { params });
  return response.data;
};

export const createParent = async (data: ParentList) => {
  const response = await axiosInstance.post("/Parents", data);
  return response.data;
};

export const updateParent = async (data: ParentList, id: number) => {
  const response = await axiosInstance.put(`/Parents/${id}`, data);
  return response.data;
};

export const deleteParent = async (id: number) => {
  const response = await axiosInstance.delete(`/Parents/${id}`);
  return response.data;
};
