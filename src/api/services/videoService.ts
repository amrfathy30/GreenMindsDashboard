import axiosInstance from "../axiosInstance";

export const allVideosData = async (params?: { page?: number; pageSize?: number }) => {
  const response = await axiosInstance.get("/Videos/GetAll", { params });
  return response.data;
};

export const createVideo = async (formData: FormData) => {
  const response = await axiosInstance.post("/Videos/Create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateVideo = async (formData: FormData) => {
  const response = await axiosInstance.put("/Videos/Update", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteVideo = async (id: number) => {
  const response = await axiosInstance.delete(`/Videos/${id}`);
  return response.data;
};