import DashBoard from "../../../../components/layouts/dashboard";
import { getService } from "../api/service";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Space, Breadcrumb, Table } from "antd";
import { ResponsePaginator } from "../model/response";
import { TeacherResponse, Teacher, TeacherListRecord } from "../model/teacher";

export default function TeachersIndex() {
  const [data, setData] = useState();
  const { Column, ColumnGroup } = Table;

  useEffect(() => {
    let value: TeacherResponse;
    getService("teachers?page=1&limit=20")
      .then(function (response: AxiosResponse) {
        value = response.data.data;
      })
      .catch(function (error: any) {
        console.log(error);
      })
      .then(function () {
        let rows: any = [];
        const json: Teacher[] = value.teachers;
        json.forEach((e) => {
          const obj: TeacherListRecord = {
            id: e.id,
            name: e.name,
            country: e.country,
            email: e.email,
            skill: e.skills.map((item: any) => item.name).join(","),
            courseAmount: e.courseAmount,
            phone: e.phone,
          };
          console.log(obj);
          rows.push(obj);
        });
        setData(rows);
      });
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
