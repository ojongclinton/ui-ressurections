// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
// Import your slice reducers here
import counterReducer from '../features/quantumSupremacy/quantumSupremacy';

export const store = configureStore({
  reducer: {
    // Add your reducers here, e.g.:
    quantumSupremacy: counterReducer,
  },
});
