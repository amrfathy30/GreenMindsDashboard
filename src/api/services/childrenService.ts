import { ChildrenList, ChildrenParams } from "../../utils/types/childrenType";
import axiosInstance from "../axiosInstance";

export const allChildrenData = async (params?: ChildrenParams) => {
  const response = await axiosInstance.get("/Children/GetAll", { params });
  return response.data;
};

export const createChildren = async (data: ChildrenList) => {
  const response = await axiosInstance.post("/Children/Create", data);
  return response.data;
};

export const updateChildren = async (data: ChildrenList) => {
  const response = await axiosInstance.put("/Children/Update", data);
  return response.data;
};

export const deleteChildren = async (id: number) => {
  const response = await axiosInstance.delete(`/Children/${id}`);
  return response.data;
};
