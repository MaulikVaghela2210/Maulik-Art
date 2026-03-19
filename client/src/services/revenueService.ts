import axios from "axios";
import type { RevenueData } from "../types/revenue";

export const getRevenueData = async () => {

  const res = await axios.get<RevenueData>(
    "http://localhost:5000/api/revenue"
  );

  return res.data;

};