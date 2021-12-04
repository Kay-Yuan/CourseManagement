import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Radio } from "antd";
import AES from "crypto-js/aes";
import MainLayout from "../components/layouts/layout";
// import layoutStyles from "../components/layouts/layout";
import { useRouter } from "next/router";
import Link from "next/dist/client/link";
import { Alert } from "antd";
import { Login, userInfo } from "../lib/services/api-services";

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
  const [role, setRole] = useState("student");
  const router = useRouter();

  const handleSignIn = async (value: any) => {
    // value.preventDefault();
    setIsLoading(true);

    const userInfo: userInfo = {
      email: value.username,
      password: AES.encrypt(value.password, "cms").toString(),
      role: role,
    };
    try {
      const data = await Login(userInfo);
      // if fail to login?
      if (data.code === 401) {
        console.log("wrong role");
        return (
          <Alert message="wrong role!" type="error" closeText="close now" />
        );
        // router.push("/signin");
      }
      //login success
      if (data.code === 201) {
        console.log("login success! ", data);

        // save token
        // setCookie("currentUser", JSON.stringify(data.data), {
        //   path: "/",
        //   maxAge: 3600, // Expires after 1hr
        //   sameSite: "strict",
        //   httpOnly: true,
        //   secure: process.env.NODE_ENV !== "development",
        // });
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("userRole", data.data.role);
        // localStorage.setItem("currentUser", userInfo);
        // console.log(data.data.token);

        // redirect to dashboard
        if (data.data.role === "student") router.push("/dashboard/students");
        else if (data.data.role === "manager")
          router.push("/dashboard/manager");
        else if (data.data.role === "teacher")
          router.push("/dashboard/teachers");
      } else {
        // ??
      }
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
    <MainLayout flag="signin">
      <h1 style={{ textAlign: "center" }}>COURSE MANAGEMENT ASSISTANT</h1>
      <Radio.Group
        style={{
          margin: 25,
          marginLeft: 0,
          display: "flex",
          justifyContent: "left",
        }}
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
          // disabled={isLoading}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
          // disabled={isLoading}
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
          // disabled={isLoading}
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
        No account?{" "}
        <Link href="/signup">
          <a>register now!</a>
        </Link>
      </Form>
    </MainLayout>
  );
}
