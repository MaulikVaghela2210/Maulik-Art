import axios from "axios";
import type { Service } from "../../types/service";

const API = "http://localhost:5000/api/services";

// GET ALL
export const getAllServices = async (): Promise<{ data: Service[] }> => {
  return axios.get(API);
};

// CREATE
export const createService = async (data: Partial<Service>) => {
  return axios.post(API, data);
};

// UPDATE
export const updateService = async (id: string, data: Partial<Service>) => {
  return axios.put(`${API}/${id}`, data);
};

// DELETE
export const deleteService = async (id: string) => {
  return axios.delete(`${API}/${id}`);
};