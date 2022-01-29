import { Breadcrumb, Card, Col, Collapse, List, Row, Tag } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CourseCardAction from "../../../../components/cardaction";
import CourseCard from "../../../../components/coursecard";
import DashBoard from "../../../../components/layouts/dashboard";
import { CourseDetail } from "../../../../lib/model/course";
import { getCourseDetailService } from "../../../../lib/services/course";

export default function CourseDetailPage() {
  const router = useRouter();

  const [data, setData] = useState<CourseDetail>();
  const { Panel } = Collapse;

  const { id } = router.query;
  useEffect(() => {
    console.log("id is " + id);
    if (id) {
      getCourseDetailService(id.toString()).then((res) => {
        console.log(res);
        setData(res.data);
      });
    }
  }, [id]);

  const getPanelExtra = (chapterId: number) => {
    if (data !== undefined) {
      if (chapterId > data.schedule.current) {
        return <Tag color="warning">pending</Tag>;
      } else if (chapterId === data.schedule.current) {
        return <Tag color="success">processing</Tag>;
      } else {
        return <Tag color="default">finished</Tag>;
      }
    }
  };

  return (
    <DashBoard>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link href="/dashboard/manager/courses">
            <a>Course</a>
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link href="/dashboard/manager/courses/allcourses">
            <a>All Courses</a>
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Detail</Breadcrumb.Item>
      </Breadcrumb>
      <Row style={{ justifyContent: "space-between", background: "white" }}>
        <Col span={8}>
          <CourseCard
            //   loading={isLoading}
            courseTitle={data?.name}
            description={data}
            id={id}
          ></CourseCard>
        </Col>
        <Col span={15}>
          <div
            style={{
              padding: "20px",
              border: "1px solid #f0f0f0",
            }}
          >
            <h2 style={{ color: "dodgerblue" }}>Course Detail</h2>

            <h3>Create Time</h3>
            <p>{data?.createdAt}</p>
            <h3>Start Time</h3>
            <p>{data?.startTime}</p>
            <h3>Status</h3>

            <h3>Course Code</h3>
            <p>{data?.uid}</p>
            <h3>Class Time</h3>

            <h3>Category</h3>
            <Tag color="blue">{data?.type[0].name}</Tag>
            <h3>Description</h3>
            <p>{data?.detail}</p>
            <h3>Chapter</h3>

            <Collapse defaultActiveKey={["1"]} expandIconPosition="left">
              {data?.schedule.chapters.map((item, key) => {
                return (
                  <Panel
                    header={item.name}
                    key={key}
                    extra={getPanelExtra(item.id)}
                  >
                    <div>{item.content}</div>
                  </Panel>
                );
              })}
            </Collapse>
          </div>
        </Col>
      </Row>
    </DashBoard>
  );
}
