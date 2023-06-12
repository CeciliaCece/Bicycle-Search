import Head from "next/head";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
        ></meta>
        <meta name="description" content="next-practice" />
        <meta
          http-equiv="Permissions-Policy"
          content="interest-cohort=()"
        ></meta>
        <title>Bicycle Search</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header />
      <main className="container-lg">{children}</main>
    </div>
  );
}
