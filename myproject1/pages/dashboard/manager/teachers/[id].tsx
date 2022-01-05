import { processCourses } from "../../../../lib/services/student";

import DashBoard from "../../../../components/layouts/dashboard";
import { Avatar, Breadcrumb, Card, Col, Rate, Row, Space, Tag } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import {
  CourseInDetailTable,
  StudentInDetail,
} from "../../../../lib/model/student";
import { getService } from "../../../../lib/services/api-services";
import Table, { ColumnType } from "antd/lib/table";
import { TeacherInDetail } from "../../../../lib/model/teacher";

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
  const [data, setData] = useState<TeacherInDetail>();
  const [courseTabelData, setCourseTabelData] =
    useState<CourseInDetailTable[]>();

  useEffect(() => {
    if (id === undefined) return;
    const token = localStorage.getItem("token");
    async function fetchData() {
      const response = await getService(`/teachers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data);
      //   const courses: CourseInDetailTable[] = processCourses(response);

      //   setCourseTabelData(courses);
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
            <b>Birthday:</b>
          </Col>
          <Col span={20}>{data?.profile.birthday}</Col>
        </Row>

        <Row>
          <Col span={4}>
            <b>Gender:</b>
          </Col>
          <Col span={20}>{data?.profile.gender === 2 ? "Female" : "male"}</Col>
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
        <h1 style={{ color: "dodgerblue" }}>Skills</h1>
        <section style={{ margin: "0 0 1rem 0" }}>
          {data?.skills.map((skill, key) => {
            return (
              <Row key={key}>
                <Col
                  className="gutter-row"
                  span={4}
                  style={{ padding: "0.5rem" }}
                >
                  <b>{skill.name}:</b>
                </Col>
                <Col className="gutter-row" span={8}>
                  <Rate disabled allowHalf defaultValue={skill.level} />
                </Col>
              </Row>
            );
          })}
        </section>
        <h1 style={{ color: "dodgerblue" }}>Description</h1>
        {data?.profile.description}
        <h1 style={{ color: "dodgerblue" }}>Education</h1>
        <Table<TeacherInDetail>
        //   dataSource={data}
        //   loading={isLoading}
        //   onChange={handleTableChange}
        //   pagination={pagination}
        //   rowKey={(row: TeacherInDetail) => row.id}
        />
      </p>
    ),
    courses: (
      <Table
      // columns={columns}
      // dataSource={courseTabelData}
      // rowKey={(row: CourseInDetailTable) => row.id}
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
          <Link href="/dashboard/teachers">
            <a>Teacher</a>
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link href="/dashboard/manager/teachers">
            <a>Teacher List</a>
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
                <b>Country</b>
              </Col>
            </Row>
            <Row>
              <Col span={12}>{data?.name}</Col>
              <Col span={12}>{data?.country}</Col>
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
              <Col span={24}>{data?.profile.address.join(" ")}</Col>
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
