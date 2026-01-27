import {
  ChangePasswordRequest,
  PersonalInfoRequest,
  ResetPasswordRequest,
} from "../../utils/types/profileType";
import axiosInstance from "../axiosInstance";

export const updatePassword = async (data: ChangePasswordRequest) => {
  const response = await axiosInstance.post("/Account/ResetPassword", data);
  return response.data;
};

export const updateProfile = async (data: PersonalInfoRequest, id: number) => {
  const response = await axiosInstance.put(`/Account/${id}`, data, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const ForgetPassReset = async (data: ResetPasswordRequest) => {
  const response = await axiosInstance.post("/Account/ForgetPassReset", data);
  return response.data;
};

export const sendEmail = async (email: string) => {
  const response = await axiosInstance.get(
    `/Account/ForgetPassword?email=${email}`,
  );
  return response.data;
};

export const GetPersonalInfoById = async (id: number | string) => {
  const response = await axiosInstance.get(`/Account/GetPersonalInfo?id=${id}`);
  return response.data;
};
