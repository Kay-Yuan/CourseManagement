import "../styles/globals.css";
import type { AppProps } from "next/app";
import "antd/dist/antd.css";
import LayOut from "../components/layout";
import { CookiesProvider } from "react-cookie";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LayOut>
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </LayOut>
  );
}

export default MyApp;
