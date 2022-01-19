import { Breadcrumb, Card, Col, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CourseCardAction from "../../../../components/cardaction";
import CourseCard from "../../../../components/coursecard";
import DashBoard from "../../../../components/layouts/dashboard";
import { CourseDetail } from "../../../../lib/model/course";
import { getCourseDetailService } from "../../../../lib/services/course";

export default function CourseDetailPage() {
  const gridStyle = {
    width: "25%",
    textAlign: "center",
  };
  const router = useRouter();

  const { id } = router.query;

  const [data, setData] = useState<CourseDetail>();

  useEffect(() => {
    if (id) {
      getCourseDetailService(id.toString()).then((res) => {
        console.log(res);
        setData(res.data);
      });
    }
  }, []);

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
      <Row>
        <Col span={9}>
          <CourseCard
            //   loading={isLoading}
            courseTitle={data?.name}
            description={data}
          >
            <Card.Grid style={gridStyle}>Content</Card.Grid>
          </CourseCard>
        </Col>
        <Col span={15}>123</Col>
      </Row>
    </DashBoard>
  );
}
