import axios from "axios";
import type { DashboardStats } from "../types/dashboard";

export const getDashboardStats = async () => {

  const res = await axios.get<DashboardStats>(
    `${import.meta.env.VITE_API_URL}/api/dashboard-stats`
  );

  return res.data;

};