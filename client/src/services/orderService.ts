import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/orders`;

export const getAllOrders = async (token: string) => {
  return axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateOrderStatus = async (
  id: string,
  data: any,
  token: string
) => {
  return axios.put(`${API}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};