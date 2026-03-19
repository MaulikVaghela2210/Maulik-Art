import axios from "axios";

const API = "http://localhost:5000/api/about";

// ================= GET ABOUT =================
export const getAbout = async () => {
  return axios.get(API);
};

// ================= CREATE ABOUT =================
export const createAbout = async (data: FormData) => {
  return axios.post(`${API}/add`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// ================= UPDATE ABOUT =================
export const updateAbout = async (id: string, data: FormData) => {

  return axios.put(
    `${API}/${id}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

};

// ================= DELETE ABOUT =================
export const deleteAbout = async (id: string) => {
  return axios.delete(`${API}/${id}`);
};