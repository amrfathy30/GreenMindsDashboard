import axiosInstance from "../axiosInstance";

export const getAllAvatars = async () => {
  const response = await axiosInstance.get("/api/Avatars");
  return response.data;
};

export const createAvatar = async (formData: FormData) => {
  const response = await axiosInstance.post("/api/Avatars", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateAvatar = async (formData: FormData) => {
  const response = await axiosInstance.put("/api/Avatars", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getAvatarsPaged = async (page: number, pageSize: number) => {
  const response = await axiosInstance.get(`/api/Avatars/paged`, {
    params: { page, pageSize }
  });
  return response.data;
};

export const getAvatarById = async (id: number) => {
  const response = await axiosInstance.get(`/api/Avatars/${id}`);
  return response.data;
};

export const deleteAvatar = async (id: number) => {
  const response = await axiosInstance.delete(`/api/Avatars/${id}`);
  return response.data;
};