import { SmtpList } from "../../utils/types/SmtpType";
import axiosInstance from "../axiosInstance";

export const allSmtpData = async () => {
  const response = await axiosInstance.get("/Smtp");
  return response.data;
};

export const updateSmtp = async (data: SmtpList) => {
  const response = await axiosInstance.put("/Smtp", data);
  return response.data;
};
