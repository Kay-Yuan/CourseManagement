import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

import layoutStyles from "../components/layout.module.css";

export default function Home() {
  return (
    <div>
      Welcome !
      <Link href="/signin">
        <a>SignIn here</a>
      </Link>
    </div>
  );
}
