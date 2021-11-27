import { Divider } from "antd";
import React, { useState, useRef } from "react";
import {
  Radio,
  Form,
  Input,
  InputNumber,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from "antd";
import Link from "next/link";
import { text } from "stream/consumers";
import MainLayout from "../components/layouts/layout";

export default function SignUp() {
  const [value, setValue] = React.useState();
  const [isLoading, setIsLodaing] = useState(false);

  const onChange = (e: any) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const formItemLayout = {
    labelCol: {
      // xs: { span: 27 },
      // sm: { span: 10 },
      span: 24,
    },
    wrapperCol: {
      // xs: { span: 24 },
      // sm: { span: 16 },
      span: 24,
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        // offset: 0,
      },
      sm: {
        span: 24,
        // offset: 16,
      },
    },
  };

  const [form] = Form.useForm();

  // handle submit
  const handleSubmit = (values: any) => {
    console.log("Received values of form: ", values);
    console.log("role is ", value);

    // API call
    // 1 Check wheather the email been used or not
    // 2 Creat new user
  };

  return (
    <MainLayout flag="signin">
      <h1 style={{ textAlign: "center" }}>SIGN UP YOUR ACCOUNT</h1>
      <h2>* Role</h2>
      <div style={{ margin: 10 }}>
        <Radio.Group onChange={onChange} value={value}>
          <Radio value={"student"}>Student</Radio>
          <Radio value={"teacher"}>Teacher</Radio>
          <Radio value={"manager"}>Manager</Radio>
        </Radio.Group>
      </div>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={handleSubmit}
        scrollToFirstError
      >
        {/* <Form.Item
          label="Role"
          rules={[
            {
              required: true,
            },
          ]}
        ></Form.Item> */}
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button
            style={{ width: "100%" }}
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
      Alredy have an account? <Link href="/signin">Sign in</Link>
    </MainLayout>
  );
}
