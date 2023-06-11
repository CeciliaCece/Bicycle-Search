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
        <title>Bicycle Search</title>
      </Head>
      <Header />
      <main className="container-lg">{children}</main>
    </div>
  );
}
