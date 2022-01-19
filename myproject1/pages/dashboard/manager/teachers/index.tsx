import DashBoard from "../../../../components/layouts/dashboard";
import axios, { AxiosResponse } from "axios";
import { SetStateAction, useEffect, useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
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
  Slider,
} from "antd";
import studentStyle from "../../../../components/layouts/layout.module.css";
import { ResponsePaginator } from "../../../../lib/model/response";
import {
  TeacherResponse,
  Teacher,
  TeacherInList,
} from "../../../../lib/model/teacher";
import { getService } from "../../../../lib/services/api-services";
import {
  getTeacherList,
  getTeacherResponse,
  processTeacherData,
} from "../../../../lib/services/teacher";
import Link from "next/link";

export default function TeachersIndex() {
  const { Column, ColumnGroup } = Table;

  const [data, setData] = useState<TeacherInList[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
  });
  const [total, setTotal] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [title, setTitle] = useState("");
  const [query, setQuery] = useState<string>();
  const { Search } = Input;

  async function fetchData(query?: string) {
    try {
      const response = query
        ? await getTeacherResponse(pagination, query)
        : await getTeacherResponse(pagination);
      // const response = await getTeacherResponse();
      // console.log(response);
      // setPagination({
      //   ...pagination,
      //   total: response.data.total,
      // });
      setTotal(response.data.total);
      const rows: TeacherInList[] = processTeacherData(response);
      setData(rows);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData(query);
  }, [query, pagination]);

  const handleTableChange = (
    pagination: TablePaginationConfig
    // filters: Record<string, FilterValue | null>,
    // sorter: SorterResult<Student> | SorterResult<Student>[]
  ): void => {
    // fetch({
    //   // sortField: sorter.field,
    //   // sortOrder: sorter.order,
    //   pagination,
    //   // ...filters,
    // });
    setPagination({ ...pagination });
    // console.log(pagination);
    fetchData(query);

    // function fetch(params: any) {
    //   const token = localStorage.getItem("token");
    //   setIsLoading(true);
    //   console.log(pagination);
    //   // process pagination
    //   try {
    //     fetchData();
    //   } catch (error) {
    //     console.log(error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }
  };

  async function onSearch(value: string) {
    setIsLoading(true);
    setQuery(value);
    setPagination({ ...pagination, current: 1 });
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
            enterButton
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
            <Form.Item name="skills" label="Skills" />
            {/* <Row>
              <Col span={8}>
                <Input disabled value={"C"} style={{ direction: "rtl" }} />
              </Col>
              <Col span={16}>
                <Slider defaultValue={30} style={{ width: "100%" }} />
              </Col>
            </Row> */}
            <Form.List
              name="names"
              rules={[
                {
                  validator: async (_, names) => {
                    if (!names || names.length < 1) {
                      return Promise.reject(new Error("At least 1 skill"));
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item
                      // {...(index === 0
                      //   ? formItemLayout
                      //   : formItemLayoutWithOutLabel)}
                      label={
                        <Input
                          defaultValue={"C"}
                          style={{ textAlign: "right" }}
                        />
                      }
                      required={false}
                      key={field.key}
                    >
                      <Form.Item
                        {...field}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            // required: true,
                            whitespace: true,
                            message:
                              "Please input skill's name or delete this field.",
                          },
                        ]}
                        noStyle
                      >
                        <Slider
                          min={1}
                          max={5}
                          step={1}
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(field.name)}
                        />
                      ) : null}
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      style={{ width: "100%" }}
                      icon={<PlusOutlined />}
                    >
                      Add field
                    </Button>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form>
        </Modal>
        <Table<TeacherInList>
          dataSource={data}
          loading={isLoading}
          onChange={handleTableChange}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: total,
          }}
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
