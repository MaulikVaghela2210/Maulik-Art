import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  _id: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
}

const loadCartFromStorage = (): CartState => {
  try {
    const data = localStorage.getItem("cart");

    if (!data) {
      return { cartItems: [] };
    }

    const parsed = JSON.parse(data);

    if (parsed && Array.isArray(parsed.cartItems)) {
      return parsed;
    }

    return { cartItems: [] };
  } catch {
    return { cartItems: [] };
  }
};

const initialState: CartState = loadCartFromStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {

    clearCart: (state) => {
       state.cartItems = [];
    },

    addToCart: (state, action: PayloadAction<CartItem>) => {

      const existItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      if (existItem) {
        existItem.quantity += 1;
      } else {
        state.cartItems.push(action.payload);
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {

      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
    },

    increaseQty: (state, action: PayloadAction<string>) => {

      const item = state.cartItems.find(
        (item) => item._id === action.payload
      );

      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQty: (state, action: PayloadAction<string>) => {

      const item = state.cartItems.find(
        (item) => item._id === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    }

  }

});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;