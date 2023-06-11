import { createSlice } from "@reduxjs/toolkit";

export const regionsSlice = createSlice({
  name: "regions",
  initialState: [
    {
      county: "台北市",
      region: [
        "士林區",
        "大同區",
        "大安區",
        "中山區",
        "中正區",
        "內湖區",
        "文山區",
        "北投區",
        "松山區",
        "信義區",
        "南港區",
        "萬華區",
      ],
    },
    {
      county: "新竹科學園區",
      region: [
        "竹科一",
        "竹科二",
        "竹科三",
        "竹科四",
        "竹科五",
        "竹科六",
        "竹科七",
      ],
    },
    {
      county: "新北市",
      region: ["測試區"],
    },
    {
      county: "桃園市",
      region: ["測試區"],
    },
    {
      county: "中壢市",
      region: ["測試區"],
    },
    {
      county: "宜蘭市",
      region: ["測試區"],
    },
  ],
});

export default regionsSlice.reducer;
