import axios from "axios";
import type { RevenueData } from "../types/revenue";

export const getRevenueData = async () => {

  const res = await axios.get<RevenueData>(
    "http://https://${import.meta.env.VITE_API_URL}/api/revenue"
  );

  return res.data;

};