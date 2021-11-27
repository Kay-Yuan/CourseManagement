import "../styles/globals.css";
import type { AppProps } from "next/app";
import "antd/dist/antd.css";
import MainLayout from "../components/layouts/layout";
import { CookiesProvider } from "react-cookie";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <CookiesProvider>
      <Component {...pageProps} />
    </CookiesProvider>
  );
}

export default MyApp;
