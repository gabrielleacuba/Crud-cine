import { Provider } from "react-redux";
import Layout from "../components/Layout";
import { useStore } from "../redux/store";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
