import { createSlice } from "@reduxjs/toolkit";

export const headerSlice = createSlice({
  name: "header",
  initialState: [
    {
      title: "使用說明",
      path: "rule",
    },
    {
      title: "收費方式",
      path: "fee",
    },
    {
      title: "站點資訊",
      path: "#",
    },
    {
      title: "最新消息",
      path: "news",
    },
    {
      title: "活動專區",
      path: "activity",
    },
  ],
});

export default headerSlice.reducer;
