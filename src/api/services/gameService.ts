import axiosInstance from "../axiosInstance";

export const getAllGames = async () => {
  const response = await axiosInstance.get("/api/Games/GetAll");
  return response.data;
};

export const getGameById = async (id: number) => {
  const response = await axiosInstance.get(`/api/Games/${id}`);
  return response.data;
};

export const createGame = async (formData: FormData) => {
  const response = await axiosInstance.post("/api/Games/Create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateGame = async (formData: FormData) => {
  const response = await axiosInstance.put("/api/Games/Update", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteGame = async (id: number) => {
  const response = await axiosInstance.delete(`/api/Games/${id}`);
  return response.data;
};