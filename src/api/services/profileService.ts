import {
  ChangePasswordRequest,
  ResetPasswordRequest,
} from "../../utils/types/profileType";
import axiosInstance from "../axiosInstance";

export const updatePassword = async (data: ChangePasswordRequest) => {
  const response = await axiosInstance.post(
    "/Account/ChangePasswordByOldPassword",
    data,
  );
  return response.data;
};

export const resetPassword = async (data: ResetPasswordRequest) => {
  const response = await axiosInstance.post("/Account/ChangePass", data);
  return response.data;
};

export const sendEmail = async (key: string) => {
  const response = await axiosInstance.post(`/Account/ResendOtp?Key=${key}`);
  return response.data;
};

export const GetPersonalInfoById = async (id: number | string) => {
  const response = await axiosInstance.get(`/Account/GetPersonalInfo?id=${id}`);
  return response.data;
};
