import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk("list/fetchPizzas",
  async function () {
    const response = await fetch("https://62c1dd2ceff7f7856f166b2f.mockapi.io/items");
    return await response.json()
});

let cartList =[]
if (sessionStorage.getItem("cartList")!== null && sessionStorage.getItem("cartList").length > 0) {
  cartList = JSON.parse(sessionStorage.getItem("cartList"));
}


export const itemListSlice = createSlice({
  name: "list",
  initialState: {
    list: [],
    activeSort: "популярности",
    grow: true,
    filteredList: [],
    activeFilter: 0,
    searchValue: "",
    currentPage: 1,
    pageList: [],
    cartList,
    totalOfferCount: sessionStorage.getItem("totalOfferCount") || 0,
    totalOfferPrice: sessionStorage.getItem("totalOfferPrice") || 0,
  },
  reducers: {
    sortList(state, action) {
      state.activeSort = action.payload.activeSort;
      state.grow = action.payload.grow;
      let newList = [...state.list];
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
      if (action.payload.filter !== undefined) state.activeFilter = action.payload.filter;
      state.filteredList = state.list.filter((item) => {
        if (state.searchValue.length > 0 && !item.title.toUpperCase().includes(state.searchValue)) {
          return false;
        }
        if (state.activeFilter === 0) return true;
        return item.category === state.activeFilter;
      });
    },

    searchList(state, action) {
      state.searchValue = action.payload.searchValue;
    },

    setPage(state, action) {
      state.currentPage = action.payload.currentPage;
      let newPage = [];
      state.filteredList.forEach((item, index) => {
        if ((index + 1) / 8 <= state.currentPage && state.currentPage - 1 <= index / 8) newPage.push(item);
      });
      state.pageList = newPage;
    },

    setCartList(state, action) {
      if (action.payload.clear) {
        state.cartList = [];
        sessionStorage.setItem("cartList", []);
        sessionStorage.setItem("totalOfferPrice", 0);
        sessionStorage.setItem("totalOfferCount", 0);
        return;
      }

      const newItem = { ...action.payload.newItem, type: action.payload.type, size: action.payload.size };

      if (action.payload.remove) {
        const indexToRemove = state.cartList.findIndex((item) => {
          return item.id === newItem.id && item.type === newItem.type && item.size === newItem.size;
        });
        state.cartList[indexToRemove].countOffer--;
        if (state.cartList[indexToRemove].countOffer < 1 || action.payload.fullRemove) state.cartList.splice(indexToRemove, 1);
        return;
      }

      let inList = state.cartList.find((item) => {
        return item.id === newItem.id && item.type === newItem.type && item.size === newItem.size;
      });

      if (!inList) {
        newItem.countOffer++;
        state.cartList.push(newItem);
      } else {
        inList.countOffer++;
      }
    },
    setTotalOfferCount(state) {
      let totalOfferCount = 0;
      state.cartList.forEach((item) => (totalOfferCount += item.countOffer));
      state.totalOfferCount = totalOfferCount;
    },

    setTotalOfferPrice(state) {
      let totalOfferPrice = 0;
      state.cartList.forEach((item) => (totalOfferPrice += item.price * item.countOffer));
      state.totalOfferPrice = totalOfferPrice;
    },
  },
  extraReducers: {
    [fetchPizzas.fulfilled]: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { filterList, sortList, searchList, setPage, setCartList, setTotalOfferCount, setTotalOfferPrice } = itemListSlice.actions;
export default itemListSlice.reducer;

