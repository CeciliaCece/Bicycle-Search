import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "../styles/modules/table.module.scss";

export default function table({ datas }) {
  const filtersData = useSelector((state) => {
    return state.filters;
  });
  const regionsData = useSelector((state) => {
    return state.regions;
  });
  const checksData = useSelector((state) => {
    return state.checks;
  });

  const [results, setResults] = useState();

  useEffect(() => {
    let tempData = [];
    if (filtersData.selectedCounty === undefined) setResults(datas);
    else {
      //判斷縣市
      tempData[0] = datas[filtersData.selectedCounty];
      //查找地區False值
      let tempCheckState = [];
      checksData.forEach((value, index) => {
        if (!value) {
          tempCheckState.push(
            regionsData[filtersData.selectedCounty].region[index]
          );
        }
      });
      //判斷地區
      if (tempCheckState[0] !== "") {
        let filteredData = tempData[0].filter(
          (data) => !tempCheckState.includes(data.area)
        );
        tempData[0] = filteredData;
      }

      setResults(tempData);
    }
  }, [filtersData.selectedCounty, checksData]);

  return (
    <div className={styles.layout}>
      <table className={`table table-striped fw-400 ${styles.table}`}>
        <thead>
          <tr>
            <th className="fw-500">縣市</th>
            <th className="fw-500">區域</th>
            <th className="fw-500">站點名稱</th>
            <th className="fw-500">可借車輛</th>
            <th className="fw-500">可還空位</th>
          </tr>
        </thead>
        <tbody>
          {results !== undefined &&
            results.map((result, cIndex) =>
              result.map((data, index) => (
                <tr key={"t" + index}>
                  <td>
                    {filtersData.selectedCounty !== undefined
                      ? regionsData[filtersData.selectedCounty].county
                      : regionsData[cIndex].county}
                  </td>
                  <td>{data.area}</td>
                  <td className={styles.longTd}>{data.name}</td>
                  <td className="text-primary fw-bold">{data.bike}</td>
                  <td className="text-primary fw-bold">{data.park}</td>
                </tr>
              ))
            )}
        </tbody>
      </table>
    </div>
  );
}
