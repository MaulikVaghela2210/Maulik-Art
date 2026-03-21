import axios from "axios";

const API = "https://maulik-art.onrender.com/api/services";

export const getServices = async () => {
  return axios.get(API);
};

export const createService = async (data: any) => {
  return axios.post(API, data);
};

export const updateService = async (id: string, data: any) => {
  return axios.put(`${API}/${id}`, data);
};

export const deleteService = async (id: string) => {
  return axios.delete(`${API}/${id}`);
};