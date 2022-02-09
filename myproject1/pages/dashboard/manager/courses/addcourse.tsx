import {
  Breadcrumb,
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  List,
  message,
  Row,
  Select,
  Space,
  Steps,
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import {
  UploadOutlined,
  InboxOutlined,
  DollarCircleTwoTone,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";

import DashBoard from "../../../../components/layouts/dashboard";
import { create_UUID } from "../../../../lib/services/course";
import { v4 as uuidv4 } from "uuid";
import styles from "../../../../styles/Course.module.css";
import {
  getTeacherList,
  getTeacherResponse,
} from "../../../../lib/services/teacher";
import { TeacherInList } from "../../../../lib/model/teacher";
import InfiniteScroll from "react-infinite-scroll-component";

const { Step } = Steps;
const { Option } = Select;

// const formItemLayout = {
//   labelCol: {
//     xs: { span: 24 },
//     sm: { span: 8 },
//   },
//   wrapperCol: {
//     xs: { span: 24 },
//     sm: { span: 16 },
//   },
// };

export default function AddCourse() {
  const [current, setCurrent] = useState<number>(0);
  const [courseCode, setCourseCode] = useState<string>("");
  const [courseInfo, setCourseInfo] = useState<any>();
  const [teachers, setTeachers] = useState<TeacherInList[]>([]);
  const [page, setPage] = useState<number>(1);
  const [teacherTotal, setTeacherTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  function loadMoreData() {
    setPage(page + 1);
    fetchTeachers(page + 1);
  }

  function handleStep1(value: any) {
    // setIsLoading(true);

    const courseStep1: any = {
      name: value.coursename,
      uid: courseCode,
      detail: value.description,
      startTime: {},
      price: value.price,
      maxStudents: value.studentlimit,
      duration: value.duration,
      durationUnit: value.unit,
      cover: "",
      teacherId: 0,
      type: {},
    };

    setCourseInfo(courseStep1);
  }

  const steps = [
    {
      title: "Course Detail",
      content: (
        <Form
          // form={form}
          // labelCol={formItemLayout.labelCol}
          // wrapperCol={{ span: 24 }}
          layout="vertical"
          onFinish={handleStep1}
          preserve={false}
        >
          {/* <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}> */}
          <Row style={{ justifyContent: "space-evenly" }}>
            <Col span={8}>
              <Row>
                <Col span={24}>
                  <Form.Item
                    name="coursename"
                    label="Course Name"
                    rules={[
                      { required: true, message: "Please input course name!" },
                    ]}
                  >
                    <Input placeholder="course name" />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  <Form.Item
                    name="starttime"
                    label="Start Time"
                    rules={[
                      {
                        type: "object" as const,
                        required: true,
                        message: "Please select time!",
                      },
                    ]}
                    // style={}
                  >
                    <DatePicker
                      style={{ width: "100%" }}
                      showTime
                      format="YYYY-MM-DD HH:mm:ss"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item
                    name="price"
                    label="Price"
                    rules={[
                      { required: true, message: "Please input course price!" },
                    ]}
                  >
                    <Input prefix={<DollarCircleTwoTone />} />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item
                    name="studentlimit"
                    label="Student Limit"
                    rules={[
                      {
                        required: true,
                        message: "Please input course student limit!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item
                    name="duration"
                    label="Duration"
                    rules={[
                      {
                        required: true,
                        message: "Please input course duration!",
                      },
                    ]}
                  >
                    <Input
                      addonAfter={
                        <Select defaultValue="months">
                          <Option value="months">months</Option>
                          <Option value="years">years</Option>
                        </Select>
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={15}>
              <Row style={{ justifyContent: "space-between" }}>
                <Col span={8}>
                  <Form.Item
                    name="teacher"
                    label="Teacher"
                    rules={[
                      {
                        // type: "email",
                        required: true,
                        message: "Please input teacher name!",
                      },
                    ]}
                  >
                    {/* <InfiniteScroll
                      dataLength={teachers.length}
                      next={loadMoreData}
                      hasMore={teachers.length < teacherTotal}
                      loader={<h4></h4>}
                      endMessage={
                        <Divider plain>It is all, nothing more 🤐</Divider>
                      }
                      scrollableTarget="scrollableDiv"
                    > */}
                    <Select placeholder="Select teacher" allowClear>
                      {/* <Select.Option value="tester">Tester</Select.Option>
                        <Select.Option value="developer">
                          Developer
                        </Select.Option> */}
                      {teachers.map(({ id, name }) => (
                        <Option key={id} value={id}>
                          {name}
                        </Option>
                      ))}
                    </Select>
                    {/* </InfiniteScroll> */}
                  </Form.Item>
                </Col>
                <Col span={7}>
                  <Form.Item
                    name="type"
                    label="Type"
                    rules={[
                      {
                        required: true,
                        message: "Please input type of course!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="coursecode"
                    label="Course Code"
                    // rules={[
                    //   { required: true, message: "Please select the student type!" },
                    // ]}
                  >
                    <Input disabled placeholder={courseCode} />
                    {/* <Input defaultValue={courseCode} /> */}
                  </Form.Item>
                </Col>
              </Row>
              <Row style={{ justifyContent: "space-between" }}>
                <Col span={12}>
                  <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                      {
                        required: true,
                        message: "Please input course description!",
                      },
                    ]}
                  >
                    <Input.TextArea
                      placeholder="course description"
                      autoSize={{ minRows: 13, maxRows: 13 }}
                    />
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <Form.Item label="Cover">
                    <Form.Item
                      // label="Cover"
                      name="cover"
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                      // noStyle
                    >
                      <div className={styles.uploadDragger}>
                        <Upload.Dragger name="cover" action="/upload.do">
                          <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                          </p>
                          <p className="ant-upload-text">
                            Click or drag file to this area to upload
                          </p>
                          <p className="ant-upload-hint">
                            Support for a single or bulk upload.
                          </p>
                        </Upload.Dragger>
                      </div>
                    </Form.Item>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            {/* </Row> */}
          </Row>
        </Form>
      ),
    },
    {
      title: "Course Schedule",
      content: (
        <Form layout="vertical" onFinish={handleStep1} preserve={false}>
          <Row style={{ justifyContent: "space-evenly" }}>
            <Col span={11}>
              <Form.Item name="chapters" label="Chapters">
                <Form.List
                  name="names"
                  // rules={[
                  //   {
                  //     validator: async (_, names) => {
                  //       if (!names || names.length < 1) {
                  //         return Promise.reject(new Error("At least 1 skill"));
                  //       }
                  //     },
                  //   },
                  // ]}
                >
                  {(fields, { add, remove }, { errors }) => (
                    <>
                      {fields.map((filed, name, ...restField) => (
                        <Space
                          // key={parseInt(filed)}
                          style={{ display: "flex", marginBottom: 8 }}
                          align="baseline"
                        >
                          <Form.Item
                            {...restField}
                            name={[name, "chaptername"]}
                            rules={[
                              {
                                required: true,
                                message: "Missing chapter name",
                              },
                            ]}
                          >
                            <Input placeholder="Chapter Name" />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, "chaptercontent"]}
                            rules={[
                              { required: true, message: "Missing last name" },
                            ]}
                          >
                            <Input placeholder="Chapter Content" />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
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
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item name="classtimes" label="Class times">
                <Input placeholder="course name" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ),
    },
    {
      title: "Success",
      content: "Last-content",
    },
  ];

  useEffect(() => {
    // setCourseCode(create_UUID());
    setCourseCode(uuidv4());
    fetchTeachers();
  }, []);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  function onStepChange(current: number) {
    // console.log('onChange:', current);
    setCurrent(current);
  }

  function fetchTeachers(page: number = 1) {
    // setIsLoading(true);
    const response = getTeacherResponse({ current: page, pageSize: 100 });
    // const response = getCourseService({ page: page, limit: 20 });
    response.then((res: any) => {
      console.log(res);
      setTeachers([...teachers, ...res.data.teachers]);
      setTeacherTotal(res.data.total);
    });
    // setIsLoading(false);
  }

  return (
    <DashBoard>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
        <Breadcrumb.Item>Course</Breadcrumb.Item>
        <Breadcrumb.Item>Add Courses</Breadcrumb.Item>
      </Breadcrumb>
      <Steps
        type="navigation"
        current={current}
        // onChange={onStepChange}
        className={styles.steps__addcourse}
      >
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className={styles.steps__content}>{steps[current].content}</div>
      <div className={styles.action}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </DashBoard>
  );
}
