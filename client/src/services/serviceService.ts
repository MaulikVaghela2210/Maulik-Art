import axios from "axios";

const API = "https://maulik-art.onrender.com/api/services";

export const getServices = async () => {
  return axios.get(API);
};

export const createService = async (data: any) => {
  return axios.post(API, data);
};

export const updateService = async (_id: string, data: any) => {
  return axios.put(`${API}/${_id}`, data);
};

export const deleteService = async (_id: string) => {
  return axios.delete(`${API}/${_id}`);
};