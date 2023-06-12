import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import {
  updateFiltersCounty,
  updateFiltersBtn,
} from "../store/slices/filtersSlice";
import styles from "../styles/modules/select.module.scss";

export default function select({}) {
  const dispatch = useDispatch();
  const regionsData = useSelector((state) => {
    return state.regions;
  });
  const filtersData = useSelector((state) => {
    return state.filters;
  });

  const [selected, setSelected] = useState(false);
  const [weight, setWeight] = useState(-1);

  const handleClick = (e) => {
    let tempId = parseInt(e.target.id.slice(6));
    setSelected(true);
    dispatch(updateFiltersCounty(tempId));
    setWeight(parseInt(tempId));
    dispatch(updateFiltersBtn(regionsData[tempId].county));
  };

  useEffect(() => {
    const handleCountyChange = () => {
      if (filtersData.selectedCounty !== undefined)
        dispatch(
          updateFiltersBtn(regionsData[filtersData.selectedCounty].county)
        );
    };
    handleCountyChange();
  }, [filtersData.selectedCounty]);

  useEffect(() => {
    const handleInit = () => {
      if (filtersData.selectBtn === "選擇縣市") setSelected(false);
    };
    handleInit();
  }, [filtersData.selectBtn]);

  return (
    <div className={`${styles.layout}`}>
      {/* <div className={`dropdown ${styles.layout}`}>
      <button
        className={`btn btn-info dropdown-toggle text-start d-flex justify-content-between align-items-center ${styles.btn}`}
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span className={`fw-500 ${selected && "text-secondary"}`}>
          {filtersData.selectBtn}
        </span>
      </button>
      <ul className="dropdown-menu dd-list mt-3 fw-400">
        {regionsData.map((county, index) => (
          <li key={"c" + index}>
            <Link
              className={`dropdown-item ${index === weight ? "fw-500" : ""}`}
              href="#"
              onClick={handleClick}
              id={"select" + index}
            >
              {county.county}
            </Link>
          </li>
        ))}
      </ul>
    </div> */}
      <button
        className={`btn btn-info dropdown-toggle text-start d-flex justify-content-between align-items-center ${styles.btn}`}
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span className={`fw-500 ${selected && "text-secondary"}`}>
          {filtersData.selectBtn}
        </span>
      </button>
      <ul className="dropdown-menu dd-list mt-3 fw-400">
        {regionsData.map((county, index) => (
          <li key={"c" + index}>
            <Link
              className={`dropdown-item ${index === weight ? "fw-500" : ""}`}
              href="#"
              onClick={handleClick}
              id={"select" + index}
            >
              {county.county}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
