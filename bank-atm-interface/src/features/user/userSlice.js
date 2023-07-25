"use client";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "Michael Quarcoo",
    email: "michaelquarcoo04@gmail.com",
    accountBalance: "",
    accountNumber: "",
  },
  reducers: {},
});

export default userSlice.reducer;
