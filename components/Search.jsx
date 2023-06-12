import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import {
  addFilters,
  updateFiltersCounty,
  updateFiltersValue,
} from "../store/slices/filtersSlice";
import styles from "../styles/modules/search.module.scss";

export default function search({ datas }) {
  const dispatch = useDispatch();
  const regionsData = useSelector((state) => {
    return state.regions;
  });
  const filtersData = useSelector((state) => {
    return state.filters;
  });

  const [floatList, setFloatList] = useState(false);
  const [value, setValue] = useState("");
  const [color, setColor] = useState(false);
  const [listColor, setListColor] = useState();

  const handleChange = (e) => {
    setValue(e.target.value);
    setListColor(undefined);
    if (filtersData.searchList.includes(e.target.value)) {
      setColor(true);
      setListColor(filtersData.searchList.indexOf(e.target.value));
    } else {
      setColor(false);
    }
  };
  const handleListClick = (e) => {
    let tempId = parseInt(e.target.id.slice(6));
    setFloatList(false);
    setValue(filtersData.searchList[tempId]);
    setColor(true);
    setListColor(tempId);
    if (tempId < 6) {
      dispatch(updateFiltersCounty(tempId));
    }
    dispatch(updateFiltersValue(tempId));
  };
  const handleClickOutside = (e) => {
    if (
      !e.target.closest(".search-list") &&
      !e.target.closest(".search-input")
    ) {
      setFloatList(false);
    }
  };
  const handleDeleteClick = () => {
    setValue("");
    dispatch(updateFiltersValue(undefined));
  };

  useEffect(() => {
    const buildList = () => {
      let tempList = [];
      regionsData.map((r) => {
        tempList.push(r.county);
      });
      datas.map((data) => {
        data.map((d) => {
          if (!tempList.includes(d.name)) {
            tempList.push(d.name);
          }
        });
      });
      dispatch(addFilters(tempList));
    };
    buildList();
  }, []);
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const handleSelectChange = () => {
      if (
        filtersData.selectedCounty !== undefined &&
        filtersData.selectedCounty !== filtersData.searchValue
      )
        setValue("");
    };
    handleSelectChange();
  }, [filtersData.selectedCounty]);
  useEffect(() => {
    const handleInit = () => {
      if (filtersData.searchValue === undefined) setValue("");
    };
    handleInit();
  }, [filtersData.searchValue]);

  return (
    <div className="position-relative mb-2 w-100">
      <input
        type="text"
        className={`search-input form-control ${color && "text-primary"}`}
        placeholder="搜尋站點"
        value={value}
        onChange={handleChange}
        onFocus={() => setFloatList(true)}
      />
      <div
        className={`position-absolute top-50 end-0 translate-middle-y ${
          value && "d-none"
        }`}
      >
        <Image
          src="./search.svg"
          height={14}
          width={14}
          alt="searchIcon"
          className={styles.searchIcon}
        />
      </div>
      <Link
        href="#"
        onClick={handleDeleteClick}
        className={`position-absolute top-50 end-0 translate-middle-y ${
          !value && "d-none"
        }`}
      >
        <Image
          src="./delete.svg"
          height={14}
          width={14}
          alt="deleteIcon"
          className={styles.deleteIcon}
        />
      </Link>
      <ul
        className={`search-list position-absolute mt-3 w-100 fw-400 fs-2 ${
          styles.list
        } ${floatList && "d-block"}`}
      >
        {filtersData.searchList.map((s, index) => (
          <li key={"s" + index}>
            <Link
              href="#"
              className={`${index === listColor ? "text-primary fw-500" : ""}`}
              onClick={handleListClick}
              id={"search" + index}
            >
              {s}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
