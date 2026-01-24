import axiosInstance from "../axiosInstance";

export const adminLogin = async (data: any) => {
    const response = await axiosInstance.post('/Account/LoginViaEmail', data);
    return response.data;
};
