import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk("list/fetchPizzas",
  async function () {
    const response = await fetch("https://62c1dd2ceff7f7856f166b2f.mockapi.io/items");
    return await response.json()
});

export const itemListSlice = createSlice({
  name: "list",
  initialState: {
    list: [],
    activeSort: "популярности",
    grow: true,
    filteredList: [],
    activeFilter: 0,
    searchValue:"",
  },
  reducers: {

    sortList(state, action) {
      state.activeSort = action.payload.activeSort;
      state.grow = action.payload.grow;
      let newList = [...state.list]
      if (state.activeSort === "цене") newList.sort((a, b) => b.price - a.price);
      if (state.activeSort === "алфавиту") {
        newList.sort((a, b) => {
          if (a.title < b.title) return -1;
          if (a.title - b.title) return 1;
          return 0;
        });
      }
      if (state.activeSort === "популярности") newList.sort((a, b) => a.rating - b.rating);
      if (!state.grow) newList.reverse();
      state.list = newList;
    },
    
    filterList(state, action) {
      if (action.payload.filter !== undefined)state.activeFilter = action.payload.filter;
      state.filteredList = state.list.filter((item) => {
           if (state.searchValue.length > 0 && !item.title.toUpperCase().includes(state.searchValue)) {
             return false
           }
           if (state.activeFilter === 0) return true;
           return item.category === state.activeFilter;
         });
    },

    searchList(state, action) {
      state.searchValue = action.payload.searchValue
    }
  },
  extraReducers: {
    [fetchPizzas.fulfilled]: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { filterList, sortList, searchList } = itemListSlice.actions;
export default itemListSlice.reducer;

