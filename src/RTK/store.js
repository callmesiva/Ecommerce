import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import userInfo from "./userInfo";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    user: userInfo,
  },
});

export default store;
