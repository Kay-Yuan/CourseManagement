import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Radio } from "antd";
import AES from "crypto-js/aes";

const tailFormItemLayout = {
  xs: {
    span: 24,
    offset: 0,
  },
  sm: {
    span: 16,
    offset: 8,
  },
};

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [cookies, setCookie] = useCookies(["currentUser"]);
  const [role, setRole] = useState("student");

  const handleSignIn = async (value: any) => {
    // e.preventDefault();
    setIsLoading(true);

    console.log("Received values of form: ", value);
    try {
      const axios = require("axios");
      const AES = require("crypto-js/aes");

      const response = await axios.post(
        // "post",
        "http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/swagger/api/login",
        {
          email: value.username,
          password: AES.encrypt(value.password, "cms").toString(),
          role: role,
        }
      );
      const data = response.data;

      setCookie("currentUser", JSON.stringify(data), {
        path: "/",
        maxAge: 3600, // Expires after 1hr
        sameSite: true,
      });
      console.log("login success", data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  function onChange(e: any) {
    console.log(`radio checked:${e.target.value}`);
    setRole(e.target.value);
  }

  return (
    <div>
      <h1>COURSE MANAGEMENT ASSISTANT</h1>
      <Radio.Group
        style={{ margin: 30, display: "flex", justifyContent: "center" }}
        onChange={onChange}
        defaultValue="student"
      >
        <Radio.Button value="student">Student</Radio.Button>
        <Radio.Button value="teacher">Teacher</Radio.Button>
        <Radio.Button value="manager">Manager</Radio.Button>
      </Radio.Group>

      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={handleSignIn}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
          disabled={isLoading}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
          disabled={isLoading}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="remember"
          valuePropName="checked"
          noStyle
          disabled={isLoading}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button
            style={{ width: "100%" }}
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={isLoading}
          >
            Log in
          </Button>
        </Form.Item>
        No account? <a href="/signup">register now!</a>
      </Form>
    </div>
  );
}
