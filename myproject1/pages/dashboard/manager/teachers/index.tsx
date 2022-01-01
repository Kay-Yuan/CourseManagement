import DashBoard from "../../../../components/layouts/dashboard";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import {
  Space,
  Breadcrumb,
  Table,
  Button,
  PaginationProps,
  Form,
  Search,
  Input,
  TablePaginationConfig,
  Modal,
  Select,
  Popconfirm,
  Col,
  Row,
} from "antd";
import studentStyle from "../../../../components/layouts/layout.module.css";
import { ResponsePaginator } from "../../../../lib/model/response";
import {
  TeacherResponse,
  Teacher,
  TeacherInList,
} from "../../../../lib/model/teacher";
import { getService } from "../../../../lib/services/api-services";
import { processTeacherData } from "../../../../lib/services/teacher";
import Link from "next/link";

export default function TeachersIndex() {
  const { Column, ColumnGroup } = Table;

  const [data, setData] = useState<TeacherInList[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationProps>({});
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [title, setTitle] = useState("");
  const { Search } = Input;
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
            skill: teacher.skills.map((item: any) => item.name).join(", "),
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
      const token = localStorage.getItem("token");
      setIsLoading(true);
      // process pagination
      // console.log(pagination);
      const pageConfig = `page=${pagination.current}&limit=${pagination.pageSize}`;
      try {
        const res = await getService(`/teachers?${pageConfig}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPagination({ ...params.pagination, total: res.data.total });

        // console.log("value is " + res.data);
        const rows: TeacherInList[] = processTeacherData(res);
        setData(rows);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  async function onSearch(value: string) {
    console.log(value);
    const token = localStorage.getItem("token");
    setIsLoading(true);
    const pageConfig = `page=${pagination.current}&limit=${pagination.pageSize}`;
    const res = await getService(`/teachers?${pageConfig}&query=${value}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("res is " + res);
    setPagination({ ...pagination, total: res.data.total });
    // const rows: StudentInList[] = processStudentData(res).filter((item) =>
    //   item.name.includes(value)
    // );
    const rows: TeacherInList[] = processTeacherData(res);
    setData(rows);
    setIsLoading(false);
  }

  const handleAdd = () => {
    setIsModalVisible(false);
    // form.resetFields();
  };

  const handleCancel = () => {
    // form.resetFields();
    setIsModalVisible(false);
  };

  return (
    <>
      <DashBoard>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
          <Breadcrumb.Item>Teacher</Breadcrumb.Item>
          <Breadcrumb.Item>Teacher List</Breadcrumb.Item>
        </Breadcrumb>
        <div className={studentStyle.tableBar}>
          <Button
            type="primary"
            onClick={() => {
              setTitle("Add New Teacher");
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
              rules={[
                { required: true, message: "Please input student name!" },
              ]}
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
              name="country"
              label="Country"
              rules={[
                { required: true, message: "Please select the country!" },
              ]}
            >
              <Select allowClear>
                <Select.Option value="China">China</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[
                { required: true, message: "Please input phone number!" },
              ]}
            >
              <Input.Group>
                <Select defaultValue="+86">
                  <Select.Option value="+61">+61</Select.Option>
                </Select>
                <Input allowClear style={{ width: "60%" }} defaultValue="" />
              </Input.Group>
            </Form.Item>
            <Row>
              <Col span={8}>
                <Input defaultValue="C" disabled />
              </Col>
              <Col span={16}></Col>
            </Row>
          </Form>
        </Modal>
        <Table<TeacherInList>
          dataSource={data}
          loading={isLoading}
          onChange={handleTableChange}
          pagination={pagination}
          rowKey={(row: TeacherInList) => row.id}
        >
          <Table.Column<TeacherInList> title="No." dataIndex="id" key="id" />
          <Table.Column<TeacherInList>
            title="Name"
            dataIndex="name"
            key="name"
            sorter={(a, b) => a.name.length - b.name.length}
            render={(value, record: TeacherInList) => (
              <Link
                href={`/dashboard/manager/teachers/${record.id}`}
                key={record.id}
              >
                <a>{value}</a>
              </Link>
            )}
          />
          <Table.Column<TeacherInList>
            title="Country"
            dataIndex="country"
            key="country"
          />
          <Table.Column<TeacherInList>
            title="Email"
            dataIndex="email"
            key="email"
          />
          <Table.Column<TeacherInList>
            title="Skill"
            dataIndex="skill"
            key="skill"
          />
          <Table.Column<TeacherInList>
            title="Course Amount"
            dataIndex="courseAmount"
            key="courseAmount"
            align="center"
          />
          <Table.Column<TeacherInList>
            title="Phone"
            dataIndex="phone"
            key="phone"
          />
          <Table.Column<TeacherInList>
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
                      country: record.country,
                      phone: record.phone,
                      skills: record.skill,
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
    </>
  );
}
