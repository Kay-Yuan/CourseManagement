import { Breadcrumb, Button, Col, Divider, List, Row } from "antd";
import { useEffect, useState } from "react";
import CourseCard from "../../../../components/coursecard";
import DashBoard from "../../../../components/layouts/dashboard";
import { CoursesQuery, getCourseResponse } from "../../../../lib/model/course";
import { getCourseService } from "../../../../lib/services/course";
import { UserOutlined, HeartFilled } from "@ant-design/icons";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";

export default function AllCourses() {
  const [isLoading, setIsLoading] = useState(false);
  const [courseList, setcourseList] = useState<getCourseResponse[]>([]);
  const [query, setQuery] = useState<CoursesQuery>();
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  // function loadMoreData() {
  //   if (isLoading) {
  //     return;
  //   }
  //   setIsLoading(true);
  //   fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
  //     .then(res => res.json())
  //     .then(body => {
  //       setData([...data, ...body.results]);
  //       setIsLoading(false);
  //     })
  //     .catch(() => {
  //       setIsLoading(false);
  //     });
  // }
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
        <Breadcrumb.Item>All Courses</Breadcrumb.Item>
      </Breadcrumb>
      <InfiniteScroll
        dataLength={courseList.length}
        next={loadMoreData}
        hasMore={courseList.length < total}
        loader={<h4>Loading...</h4>}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          grid={{ gutter: 16, column: 4 }}
          loading={isLoading}
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
      </InfiniteScroll>
    </DashBoard>
  );
}
