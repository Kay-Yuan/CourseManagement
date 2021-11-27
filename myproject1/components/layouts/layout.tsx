import { Layout } from "antd";
import layoutStyles from "./layout.module.css";
import Navbar from "../navbar";
const { Header, Content } = Layout;

export default function MainLayout({
  children,
  flag,
}: {
  children: React.ReactNode;
  flag?: string;
}): JSX.Element {
  return (
    <>
      {flag === "signin" ? <Navbar /> : <Navbar />}
      {/* <Navbar /> */}
      {/* <main>{children}</main> */}

      <Content className={layoutStyles.Content}>{children}</Content>
      {/* <Footer /> */}
      {/* {children} */}
    </>
  );
}
// export default function LayOut({
//   children,
//   home,
// }: {
//   children: React.ReactNode;
//   home?: boolean;
// }) {
//   const currentUser = "1";
//   //   if (typeof window !== "undefined") {
//   //     console.log("we are running on the client");
//   //     localStorage.setItem("cat", "tom");
//   //   }
//   //   const currentUser = localStorage.getItem("currentUser");
//   //   console.log(localStorage.getItem("cat"));

//   return (
//     <div>
//       <Layout>
//         {/* {!currentUser ? (
//           <Header>
//             <NavBar />
//           </Header>
//         ) : (
//           <div></div>
//         )} */}
//         {/* {home ? (
//           <Header>
//             <NavBar />
//           </Header>
//         ) : (
//           <div></div>
//         )} */}
//         {/* <Header>
//           <NavBar />
//         </Header> */}
//         <Content className={layoutStyles.Content}>{children}</Content>
//       </Layout>
//     </div>
//   );
// }

// import Navbar from './navbar'
// import Footer from './footer'
