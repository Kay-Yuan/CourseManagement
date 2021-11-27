import DashBoard from "../../../components/layouts/dashboard";
import { Breadcrumb } from "antd";

export default function DashBoardIndex({ children }: any) {
  return (
    <div>
      <DashBoard>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          Bill is a cat.
        </div>{" "}
      </DashBoard>
    </div>
  );
}
