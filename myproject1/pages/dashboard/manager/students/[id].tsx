import { processCourses } from "../../../../lib/services/student";

import DashBoard from "../../../../components/layouts/dashboard";
import { Avatar, Breadcrumb, Card, Col, Row, Space, Tag } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import {
  CourseInDetailTable,
  StudentInDetail,
} from "../../../../lib/model/student";
import { getService } from "../../../../lib/services/api-services";
import Table, { ColumnType } from "antd/lib/table";

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

const tagColor = [
  "magenta",
  "red",
  "volcano",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "geekbule",
  "purple",
];

export default function Post() {
  const [activeTabKey1, setActiveTabKey1] = useState("about");
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState<StudentInDetail>();
  const [courseTabelData, setCourseTabelData] =
    useState<CourseInDetailTable[]>();

  useEffect(() => {
    if (id === undefined) return;
    const token = localStorage.getItem("token");
    async function fetchData() {
      const response = await getService(`/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data);
      const courses: CourseInDetailTable[] = processCourses(response);

      setCourseTabelData(courses);
    }
    fetchData();
    console.log("id is " + id);
  }, [id]);

  const columns: ColumnType<CourseInDetailTable>[] = [
    {
      title: "No.",
      dataIndex: "id",
      key: "id",
      // sorter: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (value) => (
        <Space size="middle">
          <a>{value}</a>
        </Space>
      ),
      // sorter: true,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Join Time",
      dataIndex: "joinTime",
      key: "joinTime",
    },
  ];

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
          <Col span={20}>{data?.gender === 2 ? "Female" : "male"}</Col>
        </Row>
        <Row>
          <Col span={4}>
            <b>Member&nbsp;Period:</b>
          </Col>
          <Col span={20}>
            {data?.memberEndAt} ~ {data?.memberStartAt}
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            <b>Type:</b>
          </Col>
          <Col span={20}>{data?.type?.name}</Col>
        </Row>
        <Row>
          <Col span={4}>
            <b>Create&nbsp;Time:</b>
          </Col>
          <Col span={20}>{data?.createdAt}</Col>
        </Row>
        <Row>
          <Col span={4}>
            <b>Update&nbsp;Time:</b>
          </Col>
          <Col span={20}>{data?.updatedAt}</Col>
        </Row>
        <h1 style={{ color: "dodgerblue" }}>Interesting</h1>
        <section style={{ margin: "0 0 1rem 0" }}>
          {data?.interest.map((interest, key) => {
            return (
              <Tag
                key={key}
                color={
                  tagColor[data.interest.indexOf(interest) % tagColor.length]
                }
              >
                {interest}
              </Tag>
            );
          })}
        </section>
        <h1 style={{ color: "dodgerblue" }}>Description</h1>
        {data?.description}
      </p>
    ),
    courses: (
      <Table
        columns={columns}
        dataSource={courseTabelData}
        rowKey={(row: CourseInDetailTable) => row.id}
      />
    ),
  };
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
