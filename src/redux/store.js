import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import itemListSlice from "./slices/itemListSlice";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    list: itemListSlice
  },
});

