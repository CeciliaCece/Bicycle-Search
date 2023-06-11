import React, { useState, useEffect } from "react";
import ResetBtn from "./ResetBtn";
import styles from "../styles/modules/checkbox.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  addChecks,
  updateChecks,
  updateChecksAll,
  removeChecks,
} from "../store/slices/checksSlice";

export default function Checkbox() {
  const dispatch = useDispatch();
  const regionsData = useSelector((state) => {
    return state.regions;
  });
  const filtersData = useSelector((state) => {
    return state.filters;
  });
  const checksData = useSelector((state) => {
    return state.checks;
  });

  const [allCheck, setAllCheck] = useState(true);

  const handleAllChange = () => {
    let allCheckState = allCheck ? false : true;
    dispatch(updateChecksAll(allCheckState));
    setAllCheck(allCheckState);
  };

  const handleChange = (e) => {
    let index = parseInt(e.target.id.slice(5));
    dispatch(updateChecks(index));
    handleCheckImpactAllCheck(e.target.checked, index);
  };

  const handleCheckImpactAllCheck = (tempBool, index) => {
    if (!tempBool) setAllCheck(false);
    else {
      for (let i = 0; i < checksData.length; i++) {
        if (i === index) continue;
        else if (checksData[i] === false) {
          tempBool = false;
          break;
        }
      }
      setAllCheck(tempBool);
    }
  };

  useEffect(() => {
    const handleInit = () => {
      setAllCheck(true);
      if (filtersData.selectedCounty !== undefined) {
        dispatch(removeChecks());
        dispatch(
          addChecks(regionsData[filtersData.selectedCounty].region.length)
        );
      }
    };
    handleInit();
  }, [filtersData.selectedCounty]);

  return (
    <div>
      <div className={`d-flex ${styles.maxWidth}`}>
        <div
          className={`form-check fs-2 fw-400 mb-4 ${
            styles.eachCheck
          } ${allCheck} ${
            filtersData.selectedCounty === undefined && "d-none"
          }`}
        >
          <input
            type="checkbox"
            className="form-check-input"
            id="AllCheck"
            checked={allCheck}
            onChange={handleAllChange}
          />
          <label className="form-check-label" htmlFor="AllCheck">
            全部勾選
          </label>
        </div>
        <div className="ms-auto">
          <ResetBtn />
        </div>
      </div>

      <div
        className={`d-flex flex-wrap ${styles.wrap} ${
          filtersData.selectedCounty === undefined && "d-none"
        }`}
      >
        {filtersData.selectedCounty !== undefined &&
          checksData[
            regionsData[filtersData.selectedCounty].region.length - 1
          ] !== undefined &&
          regionsData[filtersData.selectedCounty].region.map(
            (region, index) => (
              <div
                className={`form-check fs-2 fw-400 mb-4 ${styles.eachCheck}`}
                key={"r" + index}
              >
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={"check" + index}
                  checked={checksData[index]}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor={"check" + index}>
                  {region}
                </label>
              </div>
            )
          )}
      </div>
    </div>
  );
}
