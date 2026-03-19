export interface RevenueOrder {

  _id: string;

  name: string;

  totalPrice: number;

  createdAt: string;

}

export interface RevenueData {

  totalRevenue: number;

  orders: RevenueOrder[];

}