import {
  AutoComplete,
  Breadcrumb,
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  List,
  Row,
  Select,
  Tabs,
  TimePicker,
  Upload,
} from "antd";
import {
  UploadOutlined,
  InboxOutlined,
  DollarCircleTwoTone,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import CourseCard from "../../../../components/coursecard";
import DashBoard from "../../../../components/layouts/dashboard";
import { CoursesQuery, getCourseResponse } from "../../../../lib/model/course";
import { getCourseService } from "../../../../lib/services/course";
import { UserOutlined, HeartFilled } from "@ant-design/icons";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import { TeacherInList } from "../../../../lib/model/teacher";
import styles from "../../../../styles/Course.module.css";
import { getTeacherResponse } from "../../../../lib/services/teacher";

export default function EditCourse() {
  const [isLoading, setIsLoading] = useState(false);
  const [courseList, setcourseList] = useState<getCourseResponse[]>([]);
  const [query, setQuery] = useState<CoursesQuery>();
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [teachers, setTeachers] = useState<TeacherInList[]>([]);
  const [courseCode, setCourseCode] = useState<string>("");
  const [courseInfo, setCourseInfo] = useState<any>();
  const { Option } = Select;
  const { TabPane } = Tabs;
  const weeks = ["Monday", "Tuesday"];

  function loadMoreData() {
    setPage(page + 1);
  }
  useEffect(() => {
    setIsLoading(true);
    const response1 = getCourseService({ page: page, limit: 20 });
    response1.then((res) => {
      setcourseList([...courseList, ...res.data.courses]);
      setTotal(res.data.total);
    }); // state will update after whole function changed

    const response2 = getTeacherResponse({ current: page, pageSize: 100 });
    response2.then((res: any) => {
      console.log(res);
      setTeachers([...teachers, ...res.data.teachers]);
    });

    setIsLoading(false);
  }, [page]);

  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  function onSearch() {}

  function updateSubmit(value: any) {
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

  function updateSchedule() {}

  return (
    <DashBoard>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
        <Breadcrumb.Item>Course</Breadcrumb.Item>
        <Breadcrumb.Item>Edit Courses</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ background: "white", padding: "15px 30px" }}>
        <Input.Group compact>
          <Select defaultValue="Code" style={{ width: "10%" }}>
            <Option value="Code">Code</Option>
            <Option value="Name">Name</Option>
          </Select>
          <Input.Search
            placeholder="search course by uid"
            allowClear
            onSearch={onSearch}
            style={{ width: "40%" }}
          />
        </Input.Group>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Course Detail" key="1">
            <Form
              // form={form}
              // labelCol={formItemLayout.labelCol}
              // wrapperCol={{ span: 24 }}
              layout="vertical"
              onFinish={updateSubmit}
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
                          {
                            required: true,
                            message: "Please input course name!",
                          },
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
                          {
                            required: true,
                            message: "Please input course price!",
                          },
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
          </TabPane>
          <TabPane tab="Course Schedule" key="2">
            <Form layout="vertical" onFinish={updateSchedule} preserve={false}>
              <Row style={{ justifyContent: "space-evenly" }}>
                <Col span={11}>
                  <Form.Item name="chapters" label="Chapters">
                    <Form.List
                      name="chapterlist"
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
                          {fields.map((field, name, ...restField) => (
                            <Row key={field.key} gutter={8}>
                              <Col span={8}>
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
                              </Col>

                              <Col span={14}>
                                <Form.Item
                                  {...restField}
                                  name={[name, "chaptercontent"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing last name",
                                    },
                                  ]}
                                >
                                  <Input placeholder="Chapter Content" />
                                </Form.Item>
                              </Col>

                              <Col span={2} style={{ marginTop: "6px" }}>
                                <MinusCircleOutlined
                                  onClick={() => remove(name)}
                                />
                              </Col>
                            </Row>
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
                    <Form.List
                      name="classtimeslist"
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
                          {fields.map((field, name, ...restField) => (
                            // <Space
                            //   key={field.key}
                            //   style={{
                            //     display: "flex",
                            //     marginBottom: 8,
                            //   }}
                            //   align="baseline"
                            // >
                            <Row key={field.key} gutter={8}>
                              <Col span={8}>
                                <Form.Item
                                  noStyle
                                  shouldUpdate={(prevValues, curValues) =>
                                    prevValues.area !== curValues.area ||
                                    prevValues.sights !== curValues.sights
                                  }
                                >
                                  {() => (
                                    <Form.Item
                                      {...field}
                                      // label="Sight"
                                      name={[field.name, "sight"]}
                                      rules={[
                                        {
                                          required: true,
                                          message: "Missing sight",
                                        },
                                      ]}
                                    >
                                      <Select
                                        // disabled={!form.getFieldValue("area")}
                                        style={{ width: "100%" }}
                                      >
                                        {weeks.map((item) => (
                                          <Option key={item} value={item}>
                                            {item}
                                          </Option>
                                        ))}
                                      </Select>
                                    </Form.Item>
                                  )}
                                </Form.Item>
                              </Col>
                              <Col span={14}>
                                <Form.Item
                                  {...field}
                                  // label="Price"
                                  name={[field.name, "price"]}
                                  rules={[
                                    {
                                      type: "object" as const,
                                      required: true,
                                      message: "Please select time!",
                                    },
                                  ]}
                                >
                                  <TimePicker style={{ width: "100%" }} />
                                </Form.Item>
                              </Col>

                              <Col span={2} style={{ marginTop: "6px" }}>
                                <MinusCircleOutlined
                                  onClick={() => remove(name)}
                                />
                              </Col>
                            </Row>
                            // </Space>
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
              </Row>
            </Form>
          </TabPane>
        </Tabs>
      </div>
    </DashBoard>
  );
}
