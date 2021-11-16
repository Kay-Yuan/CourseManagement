import { Layout } from "antd";
import SignIn from "../components/signin";
import NavBar from "../components/navbar";

const { Header, Content } = Layout;

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
