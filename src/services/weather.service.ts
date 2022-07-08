import { axiosClient } from "./axiosClient";

export const getCurrentWeather = async (city: string): Promise<any> => {
  const response = await axiosClient.get(`weather?q=${city}&units=metric`);
  return response;
};
