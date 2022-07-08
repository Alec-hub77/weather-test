import axios from "axios";
import { apiConfig } from "./apiConfig";

export const axiosClient = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    "Content-type": "application/json"
  },
  params: {
    appid: apiConfig.apiKey
  }
});

axiosClient.interceptors.request.use(async (config) => config);

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);
