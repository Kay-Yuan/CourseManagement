import type { NextPage, NextApiRequest, NextApiResponse } from "next";
import Link from "next/link";
import MainLayout from "../components/layouts/layout";
import type { ReactElement } from "react";
// import NestedLayout from '../components/nested-layout'

export default function Home({
  allPostsData,
}: {
  allPostsData: {
    date: string;
    title: string;
    id: string;
  }[];
}) {
  return (
    // <MainLayout home>
    <div style={{ textAlign: "center" }}>
      Welcome !
      <Link href="/signin">
        <a>SignIn here</a>
      </Link>
    </div>
    // </MainLayout>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      {/* <NestedLayout>{page}</NestedLayout> */}
      {page}
    </MainLayout>
  );
};
