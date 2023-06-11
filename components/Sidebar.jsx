import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSidebarToggle } from "@/store/slices/controlsSlice";
import styles from "../styles/modules/sidebar.module.scss";

export default function Sidebar() {
  const dispatch = useDispatch();
  const headerDatas = useSelector((state) => {
    return state.header;
  });
  const controlsDatas = useSelector((state) => {
    return state.controls;
  });
  const [path, setPath] = useState();
  const [toggle, setToggle] = useState(true);

  const handleResize = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
  };

  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    setPath(controlsDatas.currentPath);
  }, [controlsDatas.currentPath]);
  useEffect(() => {
    setToggle(controlsDatas.sidebarToggle);
  }, [controlsDatas.sidebarToggle]);

  return (
    <div
      className={`bg-primary position-absolute vw-100 sidebar top-0 start-0 ${
        styles.layout
      } ${!controlsDatas.sidebarToggle && "d-none"}`}
    >
      <div className={`d-flex flex-column h-100 ${styles.content}`}>
        {headerDatas.map((h, index) => (
          <Link
            key={index}
            href={h.path}
            onClick={(e) => {
              dispatch(updateSidebarToggle(toggle));
            }}
            className={`fs-2 text-decoration-none fw-500 ${styles.list} ${
              path === h.path ? " text-dark" : "text-white"
            }`}
          >
            {h.title}
          </Link>
        ))}
        <div className={`mt-auto ${styles.loginBtn}`}>
          <Link
            href={"login"}
            className="fw-400"
            onClick={(e) => {
              dispatch(updateSidebarToggle(toggle));
            }}
          >
            <button type="button" className="btn btn-lg btn-login">
              登入
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
