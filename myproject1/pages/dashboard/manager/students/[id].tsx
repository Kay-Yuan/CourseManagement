import { getPostData } from "../../../../lib/services/student";
// import Head from "next/head";

// import utilStyles from "../../styles/utils.module.css";
import DashBoard from "../../../../components/layouts/dashboard";
import { Breadcrumb } from "antd";
import Link from "next/link";
import { useEffect } from "react";
import styled from "styled-components";
import { wrap } from "module";
import { BlockList } from "net";

// export function getStaticProps({ params }: { params: any }) {
//   //   const postData = await getPostData(params.id);
//   const id = params.id;
//   return {
//     props: {
//       id,
//     },
//   };
// }

// export async function getStaticPaths() {
//   const paths = getAllPostIds();
//   return {
//     paths,
//     fallback: false,
//   };
// }
const Table = styled.table`
  border: 1px solid black;
  align-self: auto;
`;
const Td = styled.td`
  border: 1px solid black;
  /* text-align: center; */
  align-items: center;
  /* display: block;
  margin: auto; */
`;
// params?
export default function Post() {
  //   useEffect((id: string) => {
  //     // async function fetchData() {}
  //     // fetchData();
  //     console.log("id is " + id);
  //   }, []);
  return (
    <DashBoard>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link href="/dashboard/manager">
            <a>Student</a>
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link href="/dashboard/manager/students">
            <a>Student List</a>
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item></Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Table
          style={{
            width: "20em",
            height: "30em",
          }}
        >
          <tr>
            <Td colSpan={2}>
              <div
                style={{
                  width: "10em",
                  height: "10em",
                  backgroundColor: "gray",
                  borderRadius: "50%",
                  margin: "auto",
                }}
              ></div>
              {/* <img src="" alt="amator" /> */}
            </Td>
          </tr>
          <tr>
            <Td>1</Td>
            <Td>2</Td>
          </tr>
        </Table>
        <Table
          style={{
            width: "10em",
            height: "60em",
          }}
        >
          <tr>
            <Td colSpan={2}>{/* <img src="" alt="amator" /> */}</Td>
          </tr>
          <tr>
            <Td>1</Td>
            <Td>2</Td>
          </tr>
        </Table>
      </div>
    </DashBoard>
  );
}
