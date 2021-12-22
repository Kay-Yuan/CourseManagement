import { getPostData } from "../../../../lib/services/student";
// import Head from "next/head";

// import utilStyles from "../../styles/utils.module.css";
import DashBoard from "../../../../components/layouts/dashboard";
import { Breadcrumb, Card, Col, Row } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { wrap } from "module";
import { BlockList } from "net";
import { useRouter } from "next/router";

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
  width: 100%;
  border: 1px solid black;
  align-self: auto;
`;
const Td = styled.td`
  width: 50%;
  border: 1px solid black;
  text-align: center;
  align-items: center;
  align-content: center;
  margin: auto;
`;
// params?
const tabList = [
  {
    key: "about",
    tab: "About",
  },
  {
    key: "courses",
    tab: "Courses",
  },
];

const contentList: { [key: string]: any } = {
  about: <p>About</p>,
  courses: <p>Courses</p>,
};
export default function Post() {
  const [activeTabKey1, setActiveTabKey1] = useState("about");
  const router = useRouter();
  const { id } = router.query;
  //   useEffect((id: string) => {
  //     // async function fetchData() {}
  //     // fetchData();
  //     console.log("id is " + id);
  //   }, []);

  const onTab1Change = (key: string) => {
    setActiveTabKey1(key);
  };
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
      <Row
        style={{
          width: "auto",
          background: "white",
          justifyContent: "space-around",
        }}
      >
        <Col span={9}>
          <Table>
            <thead>
              <tr>
                <Td colSpan={2}>
                  <div
                    style={{
                      width: "100px",
                      height: "100px",
                      background: "grey",
                      borderRadius: "50%",
                      margin: "1em auto",

                      //   border: "3px solid grey",
                    }}
                  ></div>
                </Td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td>
                  <b>Name</b>
                </Td>
                <Td>
                  <b>Country</b>
                </Td>
              </tr>

              <tr>
                <Td>Phone</Td>
                <Td>sdfsdf</Td>
              </tr>
              <tr>
                <Td>
                  <b>Email</b>
                </Td>
                <Td>
                  <b>Phone</b>
                </Td>
              </tr>
              <tr>
                <Td>dsfsdf</Td>
                <Td>sdfsdf</Td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <Td colSpan={2}>
                  <b>Address</b>
                </Td>
              </tr>
              <tr>
                <Td colSpan={2}>sdfsdf</Td>
              </tr>
            </tfoot>
          </Table>
        </Col>
        <Col span={13}>
          <Card
            style={{ width: "100%" }}
            // title="Card title"
            // extra={<a href="#">More</a>}
            tabList={tabList}
            activeTabKey={activeTabKey1}
            onTabChange={(key: string) => {
              onTab1Change(key);
            }}
          >
            {contentList[activeTabKey1]}
          </Card>
        </Col>
      </Row>
    </DashBoard>
  );
}
