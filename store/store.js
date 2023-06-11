import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import headerReducer from "./slices/headerSlice";
import { regionsSlice } from "./slices/regionsSlice";
import { filtersSlice } from "./slices/filtersSlice";
import { checksSlice } from "./slices/checksSlice";
import { controlsSlice } from "./slices/controlsSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      header: headerReducer,
      regions: regionsSlice.reducer,
      filters: filtersSlice.reducer,
      checks: checksSlice.reducer,
      controls: controlsSlice.reducer,
    },
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);
