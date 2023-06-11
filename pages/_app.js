import "../styles/globals.scss";
import "../styles/main.scss";
import { wrapper } from "../store/store";
import { Provider } from "react-redux";
import { useEffect } from "react";

function App({ Component, ...rest }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
