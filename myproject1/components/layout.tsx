import { Layout } from "antd";

import NavBar from "./navbar";
import layoutStyles from "./layout.module.css";

const { Header, Content } = Layout;

export default function LayOut({ children }) {
  return (
    <div>
      <Layout>
        {/* <Header>
          <NavBar />
        </Header> */}
        <Content className={layoutStyles.Content}>{children}</Content>
      </Layout>
    </div>
  );
}
