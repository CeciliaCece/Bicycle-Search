import { createSlice } from "@reduxjs/toolkit";

export const checksSlice = createSlice({
  name: "checks",
  initialState: [],
  reducers: {
    addChecks(state, action) {
      for (let i = action.payload; i > 0; i--) {
        state.push(true);
      }
    },
    updateChecks(state, action) {
      state[action.payload] = state[action.payload] ? false : true;
    },
    updateChecksAll(state, action) {
      state.fill(action.payload);
    },
    removeChecks() {
      return [];
    },
  },
});

export const { addChecks, updateChecks, updateChecksAll, removeChecks } =
  checksSlice.actions;

export default checksSlice.reducer;
