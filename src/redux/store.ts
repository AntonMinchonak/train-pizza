import { configureStore } from "@reduxjs/toolkit";
import itemListSlice from "./slices/itemListSlice";

export const store = configureStore({
  reducer: {
    list: itemListSlice
  },
});

export type RootState = ReturnType<typeof store.getState>
