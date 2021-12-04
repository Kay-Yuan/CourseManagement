import DashBoard from "../../../../components/layouts/dashboard";
import React, { useState, useEffect } from "react";
import { Space, Breadcrumb, Table, PaginationProps, Button } from "antd";
import {
  StudentResponse,
  Student,
  StudentInList,
} from "../../../../lib/model/student";
import {
  Login,
  userInfo,
  getService,
} from "../../../../lib/services/api-services";
import {
  ColumnGroupType,
  ColumnType,
  TablePaginationConfig,
} from "antd/lib/table";
import { FilterValue, SorterResult } from "antd/lib/table/interface";
import { processStudentData } from "../../../../lib/services/student";

export default function StudentIndex() {
  const [data, setData] = useState<StudentInList[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationProps>({});
  const token = localStorage.getItem("token");

  // DidMount
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await getService("/students?page=1&limit=10", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPagination({ ...pagination, total: response.data.total });
        const rows: StudentInList[] = processStudentData(response);
        setData(rows);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // const columns: ColumnType<Student>[] = [
  //   {
  //     title: "No.",
  //     dataIndex: "id",
  //     key: 'id',
  //     // sorter: true,
  //   },
  //   {
  //     title: "Name",
  //     dataIndex: "name",
  //     key: 'name',
  //     sorter: true,
  //   },
  //   {
  //     title: "Area",
  //     dataIndex: "area",
  //     filters: [
  //       { text: "China", value: "China" },
  //       { text: "Australia", value: "Australia" },
  //     ],
  //     key:'area',
  //   },
  //   {
  //     title: "Email",
  //     dataIndex: "email",
  //     key: "email",
  //   },
  //   {
  //     title: "Selected Curriculum",
  //     dataIndex: "selectedCcurriculum",
  //     key: "selectedCurriculum",
  //   },
  //   {
  //     title: "Student Type",
  //     dataIndex: "studentType",
  //     key: "studentType",
  //     filters: [
  //       { text: "Tester", value: "tester" },
  //       { text: "Developer", value: "developer" },
  //     ],
  //   },
  //   {
  //     title: "Join Time",
  //     dataIndex: "joinTime",
  //     key: "joinTime",
  //   },
  //   {
  //     title: "Action",
  //     dataIndex: "action",
  //     key: "action",
  //     render: () => (
  //       <Space size="middle">
  //         <a>Edit</a>
  //         <a>Delete</a>
  //       </Space>
  //     ),
  //   },
  // ];

  function getRandomuserParams(params: {
    pagination: { pageSize: number; current: number };
  }) {
    return {
      // results: params.pagination.pageSize,
      // page: params.pagination.current,
      ...params,
    };
  }

  const handleTableChange = (
    pagination: TablePaginationConfig
    // filters: Record<string, FilterValue | null>,
    // sorter: SorterResult<Student> | SorterResult<Student>[]
  ): void => {
    fetch({
      // sortField: sorter.field,
      // sortOrder: sorter.order,
      pagination,
      // ...filters,
    });

    async function fetch(params: any) {
      setIsLoading(true);
      // process pagination
      // console.log(pagination);
      const pageConfig = `page=${pagination.current}&limit=${pagination.pageSize}`;
      try {
        const res = await getService(`/students?${pageConfig}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPagination({ ...params.pagination, total: res.data.total });

        // console.log("value is " + res.data);
        const rows: StudentInList[] = processStudentData(res);
        setData(rows);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <DashBoard>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
        <Breadcrumb.Item>Student</Breadcrumb.Item>
        <Breadcrumb.Item>Student List</Breadcrumb.Item>
      </Breadcrumb>
      <div className="tableBar">
        <Button type="primary">+ Add</Button>
      </div>
      <Table<StudentInList>
        // columns={columns}
        dataSource={data}
        loading={isLoading}
        onChange={handleTableChange}
        pagination={pagination}
        rowKey={(record: StudentInList) => record.name}
      >
        <Table.Column<StudentInList> title="No." dataIndex="id" key="id" />
        <Table.Column<StudentInList>
          title="Name"
          dataIndex="name"
          sorter={true}
          key="name"
        />
        <Table.Column<StudentInList>
          title="Area"
          dataIndex="area"
          key="area"
          filters={[
            { text: "China", value: "China" },
            { text: "Australia", value: "Australia" },
          ]}
        />
        <Table.Column<StudentInList>
          title="Email"
          dataIndex="email"
          key="email"
        />
        <Table.Column<StudentInList>
          title="Selected Curriculum"
          dataIndex="selectedCurriculum"
          key="selectedCurriculum"
        />
        <Table.Column<StudentInList>
          title="Student Type"
          dataIndex="studentType"
          key="studentType"
        />
        <Table.Column<StudentInList>
          title="Join Time"
          dataIndex="joinTime"
          key="joinTime"
        />
        <Table.Column<StudentInList>
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
