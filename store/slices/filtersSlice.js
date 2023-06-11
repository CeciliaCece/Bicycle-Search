import { createSlice } from "@reduxjs/toolkit";

export const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    selectedCounty: undefined, //dropdown選擇到的縣市
    selectBtn: "選擇縣市",
    searchList: [], //search li項目
    searchValue: undefined, //search選中的項目的id
  },
  reducers: {
    addFilters(state, action) {
      state.searchList = action.payload;
    },
    updateFiltersCounty(state, action) {
      state.selectedCounty = action.payload;
    },
    updateFiltersValue(state, action) {
      state.searchValue = action.payload;
    },
    updateFiltersBtn(state, action) {
      state.selectBtn = action.payload;
    },
    removeFilters(state) {
      state.selectedCounty = undefined;
      state.selectBtn = "選擇縣市";
      state.searchValue = undefined;
    },
  },
});

export const {
  addFilters,
  updateFiltersCounty,
  updateFiltersValue,
  updateFiltersBtn,
  removeFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
