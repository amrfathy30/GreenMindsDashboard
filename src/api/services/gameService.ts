import axiosInstance from "../axiosInstance";

export const getAllGames = async () => {
  const response = await axiosInstance.get("/Games/GetAll");
  return response.data;
};

export const getGameById = async (id: number) => {
  const response = await axiosInstance.get(`/Games/${id}`);
  return response.data;
};

export const createGame = async (formData: FormData) => {
  const response = await axiosInstance.post("/Games/Create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateGame = async (formData: FormData) => {
  const response = await axiosInstance.put("/Games/Update", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteGame = async (id: number) => {
  const response = await axiosInstance.delete(`/Games/${id}`);
  return response.data;
};
export const getPagedGames = async (page: number, pageSize: number) => {
  const response = await axiosInstance.get(`/Games/paged`, {
    params: {
      page: page,
      pageSize: pageSize
    }
  });
  return response.data; 
};