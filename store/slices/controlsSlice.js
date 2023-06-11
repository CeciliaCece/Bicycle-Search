import { createSlice } from "@reduxjs/toolkit";

export const controlsSlice = createSlice({
  name: "controls",
  initialState: { currentPath: "/", sidebarToggle: false },

  reducers: {
    updateCurrentPath(state, action) {
      state.currentPath = action.payload;
    },
    updateSidebarToggle(state, action) {
      state.sidebarToggle = action.payload ? false : true;
    },
  },
});

export const { updateCurrentPath, updateSidebarToggle } = controlsSlice.actions;

export default controlsSlice.reducer;
