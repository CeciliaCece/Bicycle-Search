import headerReducer from "../store/slices/headerSlice";
import Layout from "@/components/Layout";
import DDLayout from "@/components/DDLayout";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { configureStore } from "@reduxjs/toolkit";
import { updateCurrentPath } from "@/store/slices/controlsSlice";

const store = configureStore({
  reducer: headerReducer,
});
const headerData = store.getState();

export function getStaticPaths() {
  const paths = headerData.map((h) => {
    return {
      params: {
        path: h.path,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const data = headerData.find((d) => d.path === params.path);
  return {
    props: {
      data,
    },
  };
}

export default function headerLink({ data }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { path } = router.query;

  useEffect(() => {
    dispatch(updateCurrentPath(path));
  }, [path]);

  return (
    <div>
      <Layout>
        <DDLayout>
          <h1>{data.title}</h1>
        </DDLayout>
      </Layout>
    </div>
  );
}
