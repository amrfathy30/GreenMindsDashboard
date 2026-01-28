import { ChildApiResponse, Children, ChildrenParams } from "../../utils/types/childrenType";
import axiosInstance from "../axiosInstance";

export const allChildrenData = async (params?: ChildrenParams) => {
  const response = await axiosInstance.get("/Children", { params });
  return response.data;
};

export const createChildren = async (data: Children) => {
  const response = await axiosInstance.post("/Children", data);
  return response.data;
};

export const updateChildren = async (data: Children, id: number) => {
  const response = await axiosInstance.put(`/Children/${id}`, data);
  return response.data;
};

export const getChildrenById = async (
  id: number,
): Promise<ChildApiResponse> => {
  const response = await axiosInstance.get(`/Children/${id}`);
  return response.data;
};

export const deleteChildren = async (id: number) => {
  const response = await axiosInstance.delete(`/Account/${id}`);
  return response.data;
};
