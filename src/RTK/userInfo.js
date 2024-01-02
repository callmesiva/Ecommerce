import { createSlice } from "@reduxjs/toolkit";

const userInfo = createSlice({
  name: "userInfo",
  initialState: {
    userId: "",
  },
  reducers: {
    addUserId: (state, actions) => {
      state.userId = actions.payload;
    },
  },
});

export const { addUserId } = userInfo.actions;
export default userInfo.reducer;
