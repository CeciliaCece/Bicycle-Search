import React from "react";
import Image from "next/image";
import Layout from "@/components/Layout";
import Checkbox from "@/components/Checkbox";
import Search from "@/components/Search";
import Select from "@/components/Select";
import Table from "@/components/Table";
import styles from "../styles/modules/index.module.scss";

export async function getStaticProps() {
  let response = await fetch(
    "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json"
  );
  let datas = await response.json();
  const newData = datas.map((obj) => {
    const { sarea, sna, sbi, bemp } = obj;
    return {
      area: sarea,
      name: sna,
      bike: sbi,
      park: bemp,
    };
  });
  datas = [];
  datas.push(newData);

  //這邊模擬一次性拿到所有資料
  datas[1] = [
    { area: "竹科一", name: "竹科一站", bike: 13, park: 15 },
    { area: "竹科一", name: "竹科一站", bike: 13, park: 15 },
    { area: "竹科二", name: "竹科二站", bike: 13, park: 15 },
    { area: "竹科三", name: "竹科三站", bike: 13, park: 15 },
  ];
  for (let i = 2; i < 6; i++) {
    datas[i] = [
      { area: "測試區", name: "YouBike2.0_測試站", bike: 13, park: 15 },
      { area: "測試區", name: "YouBike2.0_測試站", bike: 13, park: 15 },
      { area: "測試區", name: "YouBike2.0_測試站", bike: 13, park: 15 },
      { area: "測試區", name: "YouBike2.0_測試站", bike: 13, park: 15 },
    ];
  }
  return {
    props: {
      datas,
    },
  };
}

export default function Home({ datas }) {
  return (
    <Layout>
      <div className={styles.wrap}>
        <h1>站點資訊</h1>
        <div
          className={`d-inline-flex w-100 justify-content-between mb-6 ${styles.filterArea}`}
        >
          <div>
            <div
              className={`d-flex flex-column-reverse flex-sm-row mb-6 ${styles.maxWidth}`}
            >
              <Select />
              <Search datas={datas} />
            </div>
            <div>
              <div className="test-btn btn btn-primary">選擇</div>
              <button className="btn btn-primary">選擇</button>
              <input type="text" className="search-input" />
            </div>

            <Checkbox />
          </div>
          <div
            className={`position-relative d-none d-lg-block ${styles.imgWrap}`}
          >
            <div className={`position-absolute bottom-0 ${styles.imgLayout}`}>
              <Image
                //src="/figure.png"
                src="/Bicycle-Search/figure.png"
                fill
                alt="figure"
                className={` ${styles.img}`}
              />
            </div>
          </div>
        </div>
        <Table datas={datas} />
      </div>
    </Layout>
  );
}
