// import { Layout } from "antd";

import Navbar from "./navbar";
import layoutStyles from "./layout.module.css";
// import "antd/dist/antd.css";
// const { Header, Content } = Layout;

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

export default function MainLayout({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}): JSX.Element {
  return (
    <>
      {/* <Navbar /> */}
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
}
