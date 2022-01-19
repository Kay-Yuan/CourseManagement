import DashBoard from "../../../../components/layouts/dashboard";
import React, { useState, useEffect } from "react";
import {
  Space,
  Breadcrumb,
  Table,
  PaginationProps,
  Button,
  Tooltip,
  Input,
  Modal,
  Form,
  Select,
  Popconfirm,
} from "antd";
import {
  StudentResponse,
  Student,
  StudentInList,
  StudentQuery,
} from "../../../../lib/model/student";

import { TablePaginationConfig } from "antd/lib/table";

import {
  getStudentResponse,
  processStudentData,
} from "../../../../lib/services/student";
import studentStyle from "../../../../components/layouts/layout.module.css";

import Link from "next/link";

export default function StudentIndex() {
  const [data, setData] = useState<StudentInList[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: 10,
  });
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [title, setTitle] = useState("");
  const [total, setTotal] = useState<number>();
  const [query, setQuery] = useState<StudentQuery>();
  async function fetchData(query?: StudentQuery) {
    // console.log(pagination);
    setIsLoading(true);
    try {
      const response = query
        ? await getStudentResponse(pagination, query)
        : await getStudentResponse(pagination);
      setTotal(response.data.total);
      const rows: StudentInList[] = processStudentData(response);
      setData(rows);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  // DidMount
  useEffect(() => {
    fetchData(query);
  }, [query, pagination]); // if no pagination, it will display the last pagination

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

  // function getRandomuserParams(params: {
  //   pagination: { pageSize: number; current: number };
  // }) {
  //   return {
  //     // results: params.pagination.pageSize,
  //     // page: params.pagination.current,
  //     ...params,
  //   };
  // }

  const handleTableChange = (
    pagination: TablePaginationConfig
    // filters: Record<string, FilterValue | null>,
    // sorter: SorterResult<Student> | SorterResult<Student>[]
  ): void => {
    // console.log(pagination);
    setPagination(pagination);
    fetchData(query);
  };

  const { Search } = Input;
  async function onSearch(value: string) {
    setIsLoading(true);
    if (isNaN(parseInt(value)) || isNaN(parseFloat(value)))
      setQuery({ name: value });
    else setQuery({ userId: parseInt(value) });
    setPagination({ ...pagination, current: 1 });
    setIsLoading(false);
  }

  const onAddChange = () => {};

  const handleAdd = () => {
    setIsModalVisible(false);
    // form.resetFields();
  };

  const handleCancel = () => {
    // form.resetFields();
    setIsModalVisible(false);
  };

  return (
    <DashBoard>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link href="/dashboard/manager">
            <a>Student</a>
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {/* <Link href="/dashboard/manager/students"> */}
          Student List
          {/* </Link> */}
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className={studentStyle.tableBar}>
        <Button
          type="primary"
          onClick={() => {
            setTitle("Add New Student");
            setIsModalVisible(true);
            // form.resetFields();
          }}
        >
          + Add
        </Button>
        <Search
          placeholder="input search text"
          allowClear
          onSearch={onSearch}
          style={{ width: 300 }}
        />
      </div>
      <Modal
        title={title}
        visible={isModalVisible}
        onOk={handleAdd}
        onCancel={handleCancel}
        okText="Add"
        destroyOnClose
      >
        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
          onFinish={handleAdd}
          preserve={false}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input student name!" }]}
          >
            <Input placeholder="student name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input student email!",
              },
            ]}
          >
            <Input placeholder="email" />
          </Form.Item>
          <Form.Item
            name="area"
            label="Area"
            rules={[{ required: true, message: "Please select the area!" }]}
          >
            <Select allowClear>
              <Select.Option value="China">China</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="studenttype"
            label="Student Type"
            rules={[
              { required: true, message: "Please select the student type!" },
            ]}
          >
            <Select allowClear>
              <Select.Option value="tester">Tester</Select.Option>
              <Select.Option value="developer">Developer</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Table<StudentInList>
        // columns={columns}
        dataSource={data}
        loading={isLoading}
        onChange={handleTableChange}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: total,
        }}
        rowKey={(row: StudentInList) => row.id}
        scroll={{ y: 750 }}
      >
        <Table.Column<StudentInList> title="No." dataIndex="id" key="id" />
        <Table.Column<StudentInList>
          title="Name"
          dataIndex="name"
          sorter={(a, b) => a.name.length - b.name.length}
          key="name"
          render={(value, record: StudentInList) => (
            <Link
              href={`/dashboard/manager/students/${record.id}`}
              key={record.id}
            >
              <a>{value}</a>
            </Link>
          )}
        />
        <Table.Column<StudentInList>
          title="Area"
          dataIndex="area"
          key="area"
          filters={[
            { text: "China", value: "China" },
            { text: "Australia", value: "Australia" },
          ]}
          onFilter={(value, record: StudentInList) => record.area === value}
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
          filters={[
            { text: "Tester", value: "tester" },
            { text: "Developer", value: "developer" },
          ]}
          onFilter={(value, record: StudentInList) =>
            record.studentType === value
          }
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
              <a
                onClick={() => {
                  setTitle("Edit Student");
                  form.setFieldsValue({
                    name: record.name,
                    email: record.email,
                    area: record.area,
                    studenttype: record.studentType,
                  });
                  setIsModalVisible(true);
                  console.log(record);
                }}
              >
                Edit
              </a>
              <Popconfirm title="Sure to delete?">
                <a>Delete</a>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
    </DashBoard>
  );
}
