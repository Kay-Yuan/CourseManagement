import React, { Component } from "react";
import { Menu } from "antd";
import layoutStyles from "../components/layout.module.css";
import cookie from "cookie";

export default function NavBar() {
  // return {cookie.get("currentUser") ? (
  //   <Menu
  //     className={layoutStyles.Menu}
  //     theme="dark"
  //     mode="horizontal"
  //     defaultSelectedKeys={["2"]}
  //   >
  //     <Menu.Item>COURSES</Menu.Item>
  //     <Menu.Item>EVENTS</Menu.Item>
  //     <Menu.Item>HIGH SCHOOL</Menu.Item>
  //     <Menu.Item>STUDENTS</Menu.Item>
  //     <Menu.Item>TEACHERS</Menu.Item>
  //   </Menu>
  // ) : (
  //   <Menu
  //     className={layoutStyles.Menu}
  //     theme="dark"
  //     mode="horizontal"
  //     defaultSelectedKeys={["2"]}
  //   ></Menu>
  // )};

  return (
    <Menu
      className={layoutStyles.Menu}
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["2"]}
    >
      <Menu.Item>COURSES</Menu.Item>
      <Menu.Item>EVENTS</Menu.Item>
      <Menu.Item>HIGH SCHOOL</Menu.Item>
      <Menu.Item>STUDENTS</Menu.Item>
      <Menu.Item>TEACHERS</Menu.Item>
    </Menu>
  );
}
