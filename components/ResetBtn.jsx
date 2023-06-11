import React from "react";
import { useDispatch } from "react-redux";
import { removeFilters } from "../store/slices/filtersSlice";

export default function resetBtn() {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(removeFilters());
  };
  return (
    <button
      type="button"
      className="btn btn-bicycle fw-500"
      onClick={handleClick}
    >
      重置
    </button>
  );
}
