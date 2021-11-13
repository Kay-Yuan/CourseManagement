import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import Link from "next/link";

export default function SignIn() {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const [isLoading, setIsLodaing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      await login(userEmail.current.value, userPassword.current.value);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="home-title">COURSE MANAGEMENT ASSISTANT</h1>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input your Username!",
            },
          ]}
          disabled={isLoading}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
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
        <Form.Item>
          <Button
            fullWidth
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={isLoading}
            // disabled={isLoading}
          >
            Log in
          </Button>
        </Form.Item>
        No account?{" "}
        <Link href="/signup">
          <a>Sign up!</a>
        </Link>
      </Form>
    </div>
  );
}
