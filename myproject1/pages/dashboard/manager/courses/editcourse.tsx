import { Breadcrumb, Button, Col, Divider, List, Row } from "antd";
import { useEffect, useState } from "react";
import CourseCard from "../../../../components/coursecard";
import DashBoard from "../../../../components/layouts/dashboard";
import { CoursesQuery, getCourseResponse } from "../../../../lib/model/course";
import { getCourseService } from "../../../../lib/services/course";
import { UserOutlined, HeartFilled } from "@ant-design/icons";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";

export default function EditCourse() {
  const [isLoading, setIsLoading] = useState(false);
  const [courseList, setcourseList] = useState<getCourseResponse[]>([]);
  const [query, setQuery] = useState<CoursesQuery>();
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  function loadMoreData() {
    setPage(page + 1);
  }
  useEffect(() => {
    setIsLoading(true);
    const response = getCourseService({ page: page, limit: 20 });
    response.then((res) => {
      setcourseList([...courseList, ...res.data.courses]);
      setTotal(res.data.total);
    }); // state will update after whole function changed

    setIsLoading(false);
  }, [page]);

  return (
    <DashBoard>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
        <Breadcrumb.Item>Course</Breadcrumb.Item>
        <Breadcrumb.Item>Edit Courses</Breadcrumb.Item>
      </Breadcrumb>
    </DashBoard>
  );
}
