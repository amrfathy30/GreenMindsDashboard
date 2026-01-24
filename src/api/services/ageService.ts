import { AgeGroup } from "../../utils/types/ageType";
import axiosInstance from "../axiosInstance";

export const allAgeData = async () => {
  const response = await axiosInstance.get("/AgeSectors/GetAll");
  return response.data;
};

export const createAge = async (data: AgeGroup) => {
  const response = await axiosInstance.post("/AgeSectors/Create", data);
  return response.data;
};

export const updateAge = async (data: AgeGroup) => {
  const response = await axiosInstance.put("/AgeSectors/Update", data);
  return response.data;
};

export const deleteAge = async (id: number) => {
  const response = await axiosInstance.delete(`/AgeSectors/${id}`);
  return response.data;
};
