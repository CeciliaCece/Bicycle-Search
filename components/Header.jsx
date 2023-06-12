import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  updateCurrentPath,
  updateSidebarToggle,
} from "@/store/slices/controlsSlice";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "./Sidebar";
import styles from "../styles/modules/header.module.scss";

export default function Header() {
  const dispatch = useDispatch();
  const headerDatas = useSelector((state) => {
    return state.header;
  });
  const controlsDatas = useSelector((state) => {
    return state.controls;
  });
  const router = useRouter();
  const [path, setPath] = useState("/");
  const [sidebarToggle, setSidebarToggle] = useState(false);

  useEffect(() => {
    if (router.pathname !== "/[path]") {
      //if (router.pathname === "/") setPath("//");
      setPath(router.pathname);
      dispatch(updateCurrentPath(router.pathname));
    }
  }, [router.pathname]);

  useEffect(() => {
    setPath(controlsDatas.currentPath);
  }, [controlsDatas.currentPath]);

  useEffect(() => {
    setSidebarToggle(controlsDatas.sidebarToggle);
  }, [controlsDatas.sidebarToggle]);

  return (
    <>
      <header className={`sticky-top border-bottom bg-white ${styles.wrap}`}>
        <div className="d-flex align-items-center h-100 container-lg position-relative ">
          <div className={`position-absolute bottom-0 start-0 ${styles.logo}`}>
            <Image
              //src="/logo.png"
              src="/Bicycle-Search/logo.png"
              fill
              alt="Logo"
              priority
            />
          </div>

          <div className={styles.navs}>
            {headerDatas.map((h, index) => (
              <Link
                key={index}
                href={h.path}
                className={`fs-2 text-decoration-none px-5 fw-500 d-none d-lg-inline ${
                  path === h.path ? " text-primary" : ""
                }`}
              >
                {h.title}
              </Link>
            ))}
          </div>
          <div className="ms-auto">
            <Link href={"login"} className="fw-400">
              <button
                type="button"
                className="btn btn-lg btn-bicycle d-none d-lg-inline-block"
              >
                登入
              </button>
            </Link>
          </div>
          <div
            href="#"
            className={`d-lg-none ${styles.toggleIcon}`}
            onClick={(e) => {
              dispatch(updateSidebarToggle(sidebarToggle));
            }}
          >
            <div className={!sidebarToggle && "d-none"}>
              <Image
                //src="/close.svg"
                src="/Bicycle-Search/close.svg"
                height={14}
                width={14}
                alt="closeMenuIcon "
              />
            </div>
            <div className={sidebarToggle && "d-none"}>
              <Image
                //src="/hamburger.svg"
                src="/Bicycle-Search/hamburger.svg"
                height={12}
                width={18}
                alt="menuIcon"
              />
            </div>
          </div>
        </div>
        <Sidebar pathname={path} />
      </header>
    </>
  );
}
