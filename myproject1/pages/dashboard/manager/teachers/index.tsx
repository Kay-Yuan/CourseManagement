import DashBoard from "../../../../components/layouts/dashboard";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Space, Breadcrumb, Table } from "antd";
import { ResponsePaginator } from "../../../../lib/model/response";
import {
  TeacherResponse,
  Teacher,
  TeacherInList,
} from "../../../../lib/model/Teacher";

export default function TeachersIndex() {
  const [data, setData] = useState();
  const { Column, ColumnGroup } = Table;

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      let value: TeacherResponse;
      const rows: any = [];

      try {
        const response: AxiosResponse = await axios.get(
          "http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/teachers?page=1&limit=20",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        value = response.data.data;
        console.log(value);

        const teachers: Teacher[] = value?.teachers;
        console.log("teachers is ", teachers);

        teachers.forEach((teacher) => {
          const obj: TeacherInList = {
            id: teacher.id,
            name: teacher.name,
            country: teacher.country,
            email: teacher.email,
            skill: teacher.skills.map((item: any) => item.name).join(","),
            courseAmount: teacher.courseAmount,
            phone: teacher.phone,
          };
          // console.log(obj);
          rows.push(obj);
        });
        setData(rows);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <DashBoard>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
          <Breadcrumb.Item>Teacher</Breadcrumb.Item>
          <Breadcrumb.Item>Teacher List</Breadcrumb.Item>
        </Breadcrumb>
        <Table dataSource={data}>
          <Column title="No." dataIndex="id" key="id" />
          <Column title="Name" dataIndex="name" key="name" />
          <Column title="Country" dataIndex="country" key="country" />
          <Column title="Email" dataIndex="email" key="email" />
          <Column title="Skill" dataIndex="skill" key="skill" />
          <Column
            title="Course Amount"
            dataIndex="courseAmount"
            key="courseAmount"
          />
          <Column title="Phone" dataIndex="phone" key="phone" />
          <Column
            title="Action"
            key="action"
            render={(text, record) => (
              <Space size="middle">
                <a>Edit</a>
                <a>Delete</a>
              </Space>
            )}
          />
        </Table>
      </DashBoard>
    </>
  );
}
