import axios from "axios";
import type { RevenueData } from "../types/revenue";

export const getRevenueData = async () => {

  const res = await axios.get<RevenueData>(
    "https://maulik-art.onrender.com/api/revenue"
  );

  return res.data;

};