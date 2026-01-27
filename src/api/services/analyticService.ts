import axiosInstance from "../axiosInstance";

export const TotalVideos = async () => {
  const response = await axiosInstance.get("/Dashboard/totalVideos");
  return response.data;
};

export const TotalGames = async () => {
  const response = await axiosInstance.get("/Dashboard/totalGames");
  return response.data;
};

export const TopRanksData = async () => {
  const response = await axiosInstance.get("/Dashboard/topRanks");
  return response.data;
};

export const GenderPercentage = async () => {
  const response = await axiosInstance.get("/Dashboard/genderPercentage");
  return response.data;
};

export const UsersByAgeSector = async () => {
  const response = await axiosInstance.get("/Dashboard/usersByAgeSector");
  return response.data;
};

export const ParentChildStats = async () => {
  const response = await axiosInstance.get("/Dashboard/parentChildStats");
  return response.data;
};

export const levelsStats = async () => {
  const response = await axiosInstance.get("/Dashboard/levelsStats");
  return response.data;
};
