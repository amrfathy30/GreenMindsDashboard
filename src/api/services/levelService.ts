import { LevelList, LevelParams } from "../../utils/types/levelType";
import axiosInstance from "../axiosInstance";

export const allLevelData = async (params: LevelParams) => {
  const response = await axiosInstance.get("/Levels/GetAll", { params });
  return response.data;
};

export const createLevel = async (data: LevelList) => {
  const response = await axiosInstance.post("/Levels/Create", data);
  return response.data;
};

export const updateLevel = async (data: LevelList) => {
  const response = await axiosInstance.put("/Levels/Update", data);
  return response.data;
};

export const deleteLevel = async (id: number) => {
  const response = await axiosInstance.delete(`/Levels/${id}`);
  return response.data;
};
