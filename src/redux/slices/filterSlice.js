import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isActive: 0,
    listCategory: ["Все", "Мясные", "Вегетарианские", "Гриль", "Острые", "Закрытые"]
};

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        changeFilter(state, action) {
            state.isActive = action;
            
        }
    }
});


export const { changeFilter } = filterSlice.actions;
export default filterSlice.reducer