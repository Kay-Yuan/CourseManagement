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
import React, { Component, JSXElementConstructor, useState } from "react";
import boardStyle from "../../components/layouts/dashboard.module.css";
import { useRouter } from "next/router";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function DashBoard({ children }: any): JSX.Element {
  // state = {
  //   collapsed: false,
  // };
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const onCollapse = (collapsed: boolean) => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };

  const toggle = () => {
    // this.setState({
    //   collapsed: !this.state.collapsed,
    // });
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

  // render() {
  // const { collapsed } = this.state;
  return (
    <Layout hasSider style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div style={{ color: "white", fontSize: 39, textAlign: "center" }}>
          CMS
        </div>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            Overview
          </Menu.Item>
          <SubMenu key="sub1" icon={<TeamOutlined />} title="Student">
            <Menu.Item key="2">Student List</Menu.Item>
            {/* <Menu.Item key="8">Team 2</Menu.Item> */}
          </SubMenu>
          <SubMenu key="sub2" icon={<UserOutlined />} title="Teacher">
            <Menu.Item key="3">Teacher List</Menu.Item>
            {/* <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item> */}
          </SubMenu>
          <SubMenu key="sub3" icon={<TeamOutlined />} title="Course">
            <Menu.Item key="4">Course List</Menu.Item>
            {/* <Menu.Item key="8">Team 2</Menu.Item> */}
          </SubMenu>
          <Menu.Item key="5" icon={<FileOutlined />}>
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
  // }
}

// export default Dashboard;
