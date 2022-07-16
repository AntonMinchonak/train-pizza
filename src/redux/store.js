import { configureStore } from "@reduxjs/toolkit";
import itemListSlice from "./slices/itemListSlice";

export const store = configureStore({
  reducer: {
    list: itemListSlice
  },
});

