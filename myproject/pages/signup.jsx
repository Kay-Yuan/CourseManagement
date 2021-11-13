import { Divider } from "antd";
import React, { useState, useRef } from "react";
import { Layout } from "antd";
import NavBar from "../components/navbar";
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

const { Header, Content } = Layout;

export default function SignUp() {
  const [value, setValue] = React.useState();

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const [form] = Form.useForm();

  // handle submit
  const handleSubmit = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div>
      <Layout>
        <Header>
          <NavBar />
        </Header>
        <Content>
          <h1 className="signup-title">SIGN UP YOUR ACCOUNT</h1>
          <h3>* Role</h3>
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}>Student</Radio>
            <Radio value={2}>Teacher</Radio>
            <Radio value={3}>Manager</Radio>
          </Radio.Group>
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={handleSubmit}
            scrollToFirstError
          >
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
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
          Alredy have an account? <Link href="/">Sign in</Link>
        </Content>
      </Layout>
    </div>
  );
}
