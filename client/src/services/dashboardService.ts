import axios from "axios";
import type { DashboardStats } from "../types/dashboard";

export const getDashboardStats = async () => {

  const res = await axios.get<DashboardStats>(
    "http://localhost:5000/api/dashboard-stats"
  );

  return res.data;

};