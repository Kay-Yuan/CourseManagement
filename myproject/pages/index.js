// import * as React from "react";
// import { Component } from "react";
import { Layout } from "antd";
// import { render } from "react-dom";
import styled from "styled-components";
import SignIn from "../components/signin";
import NavBar from "../components/navbar";

const { Header, Content } = Layout;

// const StyleMenu = styled(Menu)`
//   /* display: flex;
//   /* text-align：center ; */
//   /* justify-content: center; */ */
// `;

function Home() {
  return (
    <div>
      <Layout className="layout">
        <Header>
          <NavBar />
        </Header>
        <Content>
          <SignIn />
        </Content>
      </Layout>
      {/* <LogIn /> */}
    </div>
  );
}

export default Home;
