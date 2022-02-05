import {
  Breadcrumb,
  Button,
  Col,
  Divider,
  Form,
  Input,
  List,
  message,
  Row,
  Select,
  Steps,
} from "antd";
import { useEffect, useState } from "react";

import DashBoard from "../../../../components/layouts/dashboard";
import { create_UUID } from "../../../../lib/services/course";
import styles from "../../../../styles/Course.module.css";

const { Step } = Steps;

export default function AddCourse() {
  const [current, setCurrent] = useState<number>(0);
  const [courseCode, setCourseCode] = useState<string>("");

  const steps = [
    {
      title: "Course Detail",
      content: (
        <Form
          // form={form}
          // labelCol={{ span: 8 }}
          // wrapperCol={{ span: 16 }}
          layout="vertical"
          // onFinish={handleAdd}
          preserve={false}
        >
          {/* <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}> */}
          <Row style={{ justifyContent: "space-around" }}>
            <Col span={8}>
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
            <Col span={5}>
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
                <Select placeholder="Select teacher" allowClear>
                  <Select.Option value="tester">Tester</Select.Option>
                  <Select.Option value="developer">Developer</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                name="type"
                label="Type"
                rules={[
                  { required: true, message: "Please input type of course!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                name="coursecode"
                label="Course Code"
                // rules={[
                //   { required: true, message: "Please select the student type!" },
                // ]}
              >
                <Input disabled placeholder={courseCode} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ),
    },
    {
      title: "Course Schedule",
      content: "Second-content",
    },
    {
      title: "Success",
      content: "Last-content",
    },
  ];

  useEffect(() => {
    setCourseCode(create_UUID());
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
