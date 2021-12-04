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
        <a target="_blank" rel="noopener noreferrer">
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
              onClick={() => router.push(`/dashboard/manager/courses`)}
            >
              Course List
            </Menu.Item>
          </SubMenu>
          <Menu.Item
            key="5"
            icon={<FileOutlined />}
            onClick={() => router.push(`/dashboard/manager/message`)}
          >
            Message
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        {/* <Header>
            <div className={boardStyle.trigger} style={{ padding: 0 }}>
              {React.createElement(
                this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: this.toggle,
                }
              )}
            </div> */}
        {/* <Header> */}
        <Header className={boardStyle.trigger} style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
          {/* </div> */}
          <MessageOutlined className={boardStyle.messageIcon} />
          <Dropdown overlay={userDropDownMenu} arrow>
            <Avatar className={boardStyle.avatar} icon={<UserOutlined />} />
          </Dropdown>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          {/* <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              Bill is a cat.
            </div> */}
          {children}
        </Content>
        {/* <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer> */}
      </Layout>
    </Layout>
  );
}
