import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { cartItemType, pizzaItemType } from '../../App'
import { store } from "../store";
  

export const fetchPizzas = createAsyncThunk<pizzaItemType[]>("list/fetchPizzas",
  async function () {
    const response = await fetch("https://62c1dd2ceff7f7856f166b2f.mockapi.io/items");
    return await response.json() 
});


let storedCart = sessionStorage.getItem("cartList")
let storedOfferCount = sessionStorage.getItem("totalOfferCount")
let storedOfferPrice = sessionStorage.getItem("totalOfferPrice")

let cartList =[]
if (storedCart && storedCart.length > 0) {
  cartList = JSON.parse(storedCart);
}

export interface InitialState {
  list: pizzaItemType[],
  activeSort: "популярности" | "алфавиту" | "цене",
  grow: boolean,
  filteredList: pizzaItemType[],
  activeFilter: number,
  searchValue: string,
  currentPage: number,
  pageList: pizzaItemType[],
  cartList:cartItemType[],
  totalOfferCount: number,
  totalOfferPrice: number,
}

const initialState:InitialState = {
  list: [],
  activeSort: "популярности",
  grow: true,
  filteredList: [],
  activeFilter: 0,
  searchValue: "",
  currentPage: 1,
  pageList: [],
  cartList,
  totalOfferCount: Number(storedOfferCount) || 0,
  totalOfferPrice: Number(storedOfferPrice) || 0,
}

export const itemListSlice = createSlice({
  name: "list",
 initialState,
  reducers: {
    sortList(state, action: PayloadAction<{grow: boolean; activeSort:"популярности" | "алфавиту" | "цене"}>) {
      state.activeSort = action.payload.activeSort;
      state.grow = action.payload.grow;
      let newList:pizzaItemType[]  = [...state.list];
      if (state.activeSort === "цене") newList.sort((a, b) => b.price - a.price);
      if (state.activeSort === "алфавиту") {
        newList.sort((a, b) => {
          if (a.title < b.title) return -1;
          if (a.title > b.title) return 1;
          return 0;
        });
      }
      if (state.activeSort === "популярности") newList.sort((a, b) => a.rating - b.rating);
      if (!state.grow) newList.reverse();
      state.list = newList;
    },

    filterList(state, action: PayloadAction<{filter: number | undefined}>) {
      if (action.payload.filter !== undefined) state.activeFilter = action.payload.filter;
      state.filteredList = state.list.filter((item:pizzaItemType) => {
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

    setPage(state, action: PayloadAction<{currentPage: number}>) {
      state.currentPage = action.payload.currentPage;
      let newPage:pizzaItemType[] = [];
      state.filteredList.forEach((item, index) => {
        if ((index + 1) / 8 <= state.currentPage && state.currentPage - 1 <= index / 8) newPage.push(item);
      });
      state.pageList = newPage;
    },

    clearCartList(state) {
      state.cartList= [];
      sessionStorage.setItem("cartList", "[]");
      sessionStorage.setItem("totalOfferPrice", "0");
      sessionStorage.setItem("totalOfferCount", "0");
    },

    removeItemCartList(state, action: PayloadAction<{ newItem:cartItemType; type: number; size: number; fullRemove?: boolean}>) {
      const newItem:cartItemType = { ...action.payload.newItem, type: action.payload.type, size: action.payload.size };
      const indexToRemove = state.cartList.findIndex((item:cartItemType) => {
          return item.id === newItem.id && item.type === newItem.type && item.size === newItem.size;
      });
      state.cartList[indexToRemove].countOffer--;
      if (state.cartList[indexToRemove].countOffer < 1 || action.payload.fullRemove) state.cartList.splice(indexToRemove, 1);
    },

    setCartList(state, action: PayloadAction<{ newItem:pizzaItemType; type: number; size: number;}>) {

      const newItem:cartItemType = { ...action.payload.newItem, type: action.payload.type, size: action.payload.size };
      let inList = state.cartList.find((item:cartItemType) => {
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
      state.cartList.forEach((item:cartItemType) => (totalOfferCount += item.countOffer));
      state.totalOfferCount = totalOfferCount;
    },

    setTotalOfferPrice(state) {
      let totalOfferPrice = 0;
      state.cartList.forEach((item:cartItemType) => (totalOfferPrice += item.price * item.countOffer));
      state.totalOfferPrice = totalOfferPrice;
    },
  },
  
  extraReducers: (builder) =>{
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
  state.list = action.payload;
})
    // [fetchPizzas.fulfilled]: (state:any, action:any) => {
    //   state.list = action.payload;
    // },
  },
});

export const { filterList, sortList, searchList, setPage, setCartList,clearCartList,removeItemCartList, setTotalOfferCount, setTotalOfferPrice } = itemListSlice.actions;
export default itemListSlice.reducer;

type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

