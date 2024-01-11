import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    isCartOpen: false,
  },
  reducers: {
    cartOpen: (state, actions) => {
      state.isCartOpen = !state.isCartOpen;
    },
    addToCart: (state, actions) => {
      let bool = Array.isArray(actions.payload);
      if (bool) state.cartItems = [...actions.payload];
      else state.cartItems.push(actions.payload);
    },
    removeFromCart: (state, actions) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id != actions.payload.id
      );
    },
    clearCart: (state, action) => {
      state.cartItems = [];
    },
  },
});

export const { cartOpen, addToCart, removeFromCart, clearCart, addId } =
  cartSlice.actions;
export default cartSlice.reducer;
