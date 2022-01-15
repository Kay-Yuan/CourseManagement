import { Breadcrumb, Col, List, Row } from "antd";
import { useEffect, useState } from "react";
import CourseCard from "../../../../components/coursecard";
import DashBoard from "../../../../components/layouts/dashboard";
import { getCourseResponse } from "../../../../lib/model/course";
import { getCourseService } from "../../../../lib/services/api-services";

export default function AllCourses() {
  const [isLoading, setIsLoading] = useState(false);
  const [courseList, setcourseList] = useState<getCourseResponse[]>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const response = getCourseService("/courses", {
      headers: { Authorization: `Bearer ${token}` },
    });
    // setcourseList(response);
    console.log(response);
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
              // loading={isLoading}
              courseTitle={"123"}
              description={<p>hello</p>}
            ></CourseCard>
          </List.Item>
        )}
      />
    </DashBoard>
  );
}
