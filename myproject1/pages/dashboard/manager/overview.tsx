import { Avatar, Breadcrumb, Card, Col, Progress, Row } from "antd";
import {
  SolutionOutlined,
  ReadOutlined,
  DeploymentUnitOutlined,
} from "@ant-design/icons";
import DashBoard from "../../../components/layouts/dashboard";

export default function Overview() {
  return (
    <DashBoard>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
        <Breadcrumb.Item>Course</Breadcrumb.Item>
        <Breadcrumb.Item>Overview</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ background: "white", padding: 10 }}>
        <Row gutter={10}>
          <Col span={8}>
            <Card style={{ background: "dodgerblue" }}>
              <Row>
                <Col span={6} style={{ alignSelf: "center" }}>
                  <Avatar
                    size={75}
                    icon={<SolutionOutlined style={{ color: "green" }} />}
                    style={{ background: "white" }}
                  />
                </Col>
                <Col span={18}>
                  <h5 style={{ color: "white" }}>TOTAL STUDENTS</h5>
                  <h2 style={{ color: "white" }}>305</h2>
                  <Progress
                    percent={50}
                    size="small"
                    status="active"
                    showInfo={false}
                    strokeColor="lightgrey"
                  />
                  <p style={{ color: "white" }}>{50}% increase in 30 Days</p>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ background: "purple" }}>
              <Row>
                <Col span={6} style={{ alignSelf: "center" }}>
                  <Avatar
                    size={75}
                    icon={<DeploymentUnitOutlined style={{ color: "green" }} />}
                    style={{ background: "white" }}
                  />
                </Col>
                <Col span={18}>
                  <h5 style={{ color: "white" }}>TOTAL TEACHERS</h5>
                  <h2 style={{ color: "white" }}>305</h2>
                  <Progress
                    percent={50}
                    size="small"
                    status="active"
                    showInfo={false}
                    strokeColor="lightgrey"
                  />
                  <p style={{ color: "white" }}>{50}% increase in 30 Days</p>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ background: "orange" }}>
              <Row>
                <Col span={6} style={{ alignSelf: "center" }}>
                  <Avatar
                    size={75}
                    icon={<ReadOutlined style={{ color: "green" }} />}
                    style={{ background: "white" }}
                  />
                </Col>
                <Col span={18}>
                  <h5 style={{ color: "white" }}>TOTAL COURSES</h5>
                  <h2 style={{ color: "white" }}>305</h2>
                  <Progress
                    percent={50}
                    size="small"
                    status="active"
                    showInfo={false}
                    strokeColor="lightgrey"
                    style={{ color: "white" }}
                    // format={(percent) => }
                  />
                  <p style={{ color: "white" }}>{50}% increase in 30 Days</p>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </DashBoard>
  );
}
