// userSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state) => {
      const data = JSON.parse(localStorage.getItem('userData'));
      return data 
    },   
    removeUser: () => {
      return null;
    }
  }
});

export const { setUserInfo, removeUser } = userSlice.actions;
export default userSlice.reducer;
