import { Breadcrumb, Button, Col, List, Row } from "antd";
import { useEffect, useState } from "react";
import CourseCard from "../../../../components/coursecard";
import DashBoard from "../../../../components/layouts/dashboard";
import { CoursesQuery, getCourseResponse } from "../../../../lib/model/course";
import { getCourseService } from "../../../../lib/services/course";
import { UserOutlined, HeartFilled } from "@ant-design/icons";
import Link from "next/link";

export default function AllCourses() {
  const [isLoading, setIsLoading] = useState(false);
  const [courseList, setcourseList] = useState<getCourseResponse[]>();
  const [query, setQuery] = useState<CoursesQuery>();

  useEffect(() => {
    setIsLoading(true);
    const response = getCourseService();
    response.then((res) => setcourseList(res.data.courses));
    setIsLoading(false);
  }, []);

  return (
    <DashBoard>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
        <Breadcrumb.Item>Course</Breadcrumb.Item>
        <Breadcrumb.Item>All Courses</Breadcrumb.Item>
      </Breadcrumb>

      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={courseList}
        renderItem={(item) => (
          <List.Item>
            <CourseCard
              loading={isLoading}
              courseTitle={item.name}
              description={item}
            ></CourseCard>
            <Button type="primary" style={{ marginBlock: "10px" }}>
              <Link
                href={`/dashboard/manager/courses/${item.id}`}
                key={item.id}
              >
                Read More
              </Link>
            </Button>
          </List.Item>
        )}
      />
    </DashBoard>
  );
}
