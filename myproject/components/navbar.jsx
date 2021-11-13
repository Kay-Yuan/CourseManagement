import React, { Component } from "react";
import { Header, Menu } from "antd";

export default class NavBar extends Component {
  render() {
    return (
      <Menu
        className="Menu"
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
}
