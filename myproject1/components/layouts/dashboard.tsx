import { Layout, Menu, Breadcrumb, Avatar, Dropdown } from "antd";
import {
  DashboardOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import React, {
  Component,
  JSXElementConstructor,
  useEffect,
  useState,
} from "react";
import boardStyle from "../../components/layouts/dashboard.module.css";
import { useRouter } from "next/router";
import { Logout } from "../../lib/services/api-services";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function DashBoard({ children }: any): JSX.Element {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const [role, setRole] = useState("");

  const onCollapse = (collapsed: boolean) => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const userDropDownMenu = (
    <Menu>
      <Menu.Item key="profile">
        <a target="_blank" rel="noopener noreferrer" href="">
          Profile(not implemented)
        </a>
      </Menu.Item>
      <Menu.Item key="logout">
        <a target="_blank" rel="noopener noreferrer" onClick={Logout}>
          {/* <a target="_blank" rel="noopener noreferrer" onClick={logout}> */}
          Logout
        </a>
      </Menu.Item>
    </Menu>
  );

  // ??
  useEffect(() => {
    let role: string = localStorage.getItem("userRole");
    setRole(role);
    return () => {
      role = null;
    };
  }, []);

  // console.log(localStorage.getItem("token"));
  return (
    <Layout hasSider style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div style={{ color: "white", fontSize: 39, textAlign: "center" }}>
          CMS
        </div>
        <div className="logo" />
        <Menu theme="dark" mode="inline">
          <Menu.Item
            key="1"
            icon={<DashboardOutlined />}
            onClick={() => router.push(`/dashboard/${role}/overview`)}
            // onClick={() => router.push(`/dashboard/overview`)}
          >
            Overview
          </Menu.Item>
          <SubMenu key="sub1" icon={<TeamOutlined />} title="Student">
            <Menu.Item
              key="2"
              onClick={() => router.push("/dashboard/manager/students")}
            >
              Student List
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<UserOutlined />} title="Teacher">
            <Menu.Item
              key="3"
              onClick={() => router.push(`/dashboard/manager/teachers`)}
            >
              Teacher List
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<TeamOutlined />} title="Course">
            <Menu.Item
              key="4"
              onClick={() =>
                router.push(`/dashboard/manager/courses/allcourses`)
              }
            >
              All Courses
            </Menu.Item>
            <Menu.Item
              key="5"
              onClick={() =>
                router.push(`/dashboard/manager/courses/addcourse`)
              }
            >
              Add Course
            </Menu.Item>
            <Menu.Item
              key="6"
              onClick={() =>
                router.push(`/dashboard/manager/courses/editcourse`)
              }
            >
              Edit Course
            </Menu.Item>
          </SubMenu>

          <Menu.Item
            key="7"
            icon={<FileOutlined />}
            onClick={() => router.push(`/dashboard/manager/message`)}
          >
            Message
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className={boardStyle.header} style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
          <MessageOutlined className={boardStyle.messageIcon} />
          <Dropdown overlay={userDropDownMenu} arrow>
            <Avatar className={boardStyle.avatar} icon={<UserOutlined />} />
          </Dropdown>
        </Header>
        <Content style={{ margin: "0 16px" }}>{children}</Content>
        {/* <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer> */}
      </Layout>
    </Layout>
  );
}
