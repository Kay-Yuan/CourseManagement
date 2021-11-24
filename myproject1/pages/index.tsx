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
  // if (typeof window !== "undefined") {
  //   console.log("we are running on the client");
  //   localStorage.setItem("currentUser", "");
  //   // console.log(localStorage.getItem("cat"));
  // }

  return (
    <MainLayout home>
      <div>
        Welcome !
        <Link href="/signin">
          <a>SignIn here</a>
        </Link>
      </div>
    </MainLayout>
  );
}

export function getInitialProps({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  return { props: {} };
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      {/* <NestedLayout>{page}</NestedLayout> */}
      {page}
    </MainLayout>
  );
};
