// src/features/counter/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const quantumSupremacySlice = createSlice({
  name: "quantumSupremacy",
  initialState: { navBarExpanded: false },
  reducers: {
    toggleNavBar: (state: any) => {
      state.navBarExpanded = !state.navBarExpanded;
    },
  },
});

export const { toggleNavBar } = quantumSupremacySlice.actions;
export default quantumSupremacySlice.reducer;
