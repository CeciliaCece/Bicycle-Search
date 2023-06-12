import "../styles/globals.scss";
import "../styles/main.scss";
import { wrapper } from "../store/store";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { Noto_Sans_TC } from "next/font/google";

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});
/* import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500&display=swap"); */

function App({ Component, ...rest }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <main className={notoSansTC.className}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
      //
    </main>
  );
}

export default App;
