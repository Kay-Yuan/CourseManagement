import { getPostData } from "../../../../lib/services/student";
// import Head from "next/head";

// import utilStyles from "../../styles/utils.module.css";
import DashBoard from "../../../../components/layouts/dashboard";
import { Avatar, Breadcrumb, Card, Col, Row } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { wrap } from "module";
import { BlockList } from "net";
import { useRouter } from "next/router";
import { StudentInDetail } from "../../../../lib/model/student";
import { getService } from "../../../../lib/services/api-services";

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

// const aboutContent = Object.keys(obj).map(key =>{
//   const col = document.createElement('Col');
//   const clone = col.cloneNode();
//   clone.textContent = key + ':';
//   return clone;
// });

export default function Post() {
  const [activeTabKey1, setActiveTabKey1] = useState("about");
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState<StudentInDetail>();

  const contentList: { [key: string]: any } = {
    about: (
      <p>
        <h1 style={{ color: "dodgerblue" }}>Information</h1>
        <Row>
          <Col span={4}>
            <b>Education:</b>
          </Col>
          <Col span={20}>{data?.education}</Col>
        </Row>
        <Row>
          <Col span={4}>
            <b>Area:</b>
          </Col>
          <Col span={20}>{data?.country}</Col>
        </Row>
        <Row>
          <Col span={4}>
            <b>Gender:</b>
          </Col>
          <Col span={20}>{data?.gender}</Col>
        </Row>
        <Row>
          <Col span={4}>
            <b>Member&nbsp;Period:</b>
          </Col>
          <Col span={20}>
            {/* {data?.memberStartAt} ~ {data?.memberEndAt} */}
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            <b>Type:</b>
          </Col>
          <Col span={20}>{data?.type}</Col>
        </Row>
        <Row>
          <Col span={4}>
            <b>Create&nbsp;Time:</b>
          </Col>
          {/* <Col span={20}>{data?.createdAt}</Col> */}
        </Row>
        <Row>
          <Col span={4}>
            <b>Update&nbsp;Time:</b>
          </Col>
          {/* <Col span={20}>{data?.updatedAt}</Col> */}
        </Row>
        <h1 style={{ color: "dodgerblue" }}>Interesting</h1>
        hi
        <h1 style={{ color: "dodgerblue" }}>Description</h1>
        hi
      </p>
    ),
    courses: <p>Courses</p>,
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    async function fetchData() {
      const response = await getService(`/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data);
    }
    fetchData();
    console.log("id is " + id);
  }, [id]);

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
          padding: "1.5rem 0",
        }}
      >
        <Col span={9}>
          <Card
            title={<Avatar size={100} shape="circle" />}
            style={{ textAlign: "center" }}
          >
            <Row>
              <Col span={12}>
                <b>Name</b>
              </Col>
              <Col span={12}>
                <b>Age</b>
              </Col>
            </Row>
            <Row>
              <Col span={12}>{data?.name}</Col>
              <Col span={12}>{data?.age}</Col>
            </Row>
            <Row>
              <Col span={12}>
                <b>Email</b>
              </Col>
              <Col span={12}>
                <b>Phone</b>
              </Col>
            </Row>
            <Row>
              <Col span={12}>{data?.email}</Col>
              <Col span={12}>{data?.phone}</Col>
            </Row>
            <Row>
              <Col span={24}>
                <b>Address</b>
              </Col>
            </Row>
            <Row>
              <Col span={24}>{data?.address}</Col>
            </Row>
          </Card>
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
