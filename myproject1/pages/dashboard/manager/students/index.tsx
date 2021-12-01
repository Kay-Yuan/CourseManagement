import DashBoard from "../../../../components/layouts/dashboard";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Space, Breadcrumb, Table } from "antd";
import {
  StudentResponse,
  Student,
  StudentInList,
} from "../../../../lib/model/student";

export default function StudentIndex() {
  const [data, setData] = useState();
  const { Column, ColumnGroup } = Table;

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      // console.log(token);
      let value: StudentResponse;
      const rows: any = [];

      try {
        const response = await axios.get(
          "http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/students?page=1&limit=20",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        value = response.data.data;
        console.log(value);

        const students: Student[] = value?.students;
        console.log("student is ", students);

        const calculateJoinTime = (joinTime: string): string => {
          const now = new Date();
          const then = new Date(joinTime);
          let Difference_In_Time: number = now.getTime() - then.getTime();

          // To calculate the no. of days between two dates
          let years: number = Difference_In_Time / (1000 * 3600 * 24 * 30 * 12);

          const almostYear: number = parseInt(years.toString()) + 1;

          if (parseInt((years % 1).toFixed(2).substring(2)) >= 50) {
            return "Almost " + almostYear + " years ago";
          } else if (parseInt((years % 1).toFixed(2).substring(2)) < 50) {
            return "Over " + parseInt(years.toString()) + " years ago";
          }
          return "No record.";
        };

        students.forEach((e) => {
          const obj: StudentInList = {
            id: e.id,
            name: e.name,
            area: e.country,
            email: e.email,
            selectedCurriculum: e.courses?.map((item) => item.name).join(","),
            studentType: e.type?.name,
            joinTime: calculateJoinTime(e.createdAt),
          };
          rows.push(obj);
        });
        setData(rows);
      } catch (error) {
        console.log(error);
      } finally {
      }
    }
    fetchData();
  }, []);

  return (
    <DashBoard>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
        <Breadcrumb.Item>Student</Breadcrumb.Item>
        <Breadcrumb.Item>Student List</Breadcrumb.Item>
      </Breadcrumb>
      <Table dataSource={data}>
        <Column title="No." dataIndex="id" key="id" />
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Area" dataIndex="area" key="area" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column
          title="Selected Curriculum"
          dataIndex="selectedCurriculum"
          key="selectedCurriculum"
        />
        <Column
          title="Student Type"
          dataIndex="studentType"
          key="studentType"
        />
        <Column title="Join Time" dataIndex="joinTime" key="joinTime" />
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
  );
}
