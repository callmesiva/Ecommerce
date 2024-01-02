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
      state.cartItems.push(actions.payload);
    },
    removeFromCart: (state, actions) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id != actions.payload.id
      );
    },
    clearCart: (state, action) => {
      state.cartItems = [];
      // alert("Thanks For Purchasing..!");
    },
  },
});

export const { cartOpen, addToCart, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
