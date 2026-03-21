import axios from "axios";
import type { DashboardStats } from "../types/dashboard";

export const getDashboardStats = async () => {

  const res = await axios.get<DashboardStats>(
    "https://maulik-art.onrender.com/api/dashboard-stats"
  );

  return res.data;

};