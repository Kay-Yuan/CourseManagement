import { Card, Avatar, Row, Col, Button } from "antd";
import Link from "next/link";
import { UserOutlined, HeartFilled } from "@ant-design/icons";
import { Children } from "react";
// import Meta from 'antd/lib/card/Meta';

const { Meta } = Card;
export default function CourseCard(props: any) {
  const gridStyle: React.CSSProperties = {
    width: "25%",
    textAlign: "center",
  };
  let cardGrid = null;
  if (props.grid) {
    cardGrid = [
      <Card.Grid style={gridStyle}>Content</Card.Grid>,
      <Card.Grid style={gridStyle}>Content</Card.Grid>,
      <Card.Grid style={gridStyle}>Content</Card.Grid>,
      <Card.Grid style={gridStyle}>Content</Card.Grid>,
    ];
  }

  return (
    <Card
      // title={}
      style={{ textAlign: "left" }}
      cover={<Avatar size={100} shape="circle" style={{ margin: "auto" }} />}
      loading={props.loading}
      // bodyStyle={{ textAlign: "center" }}
      hoverable
      // headStyle={{ textAlign: "center" }}
      actions={props.action}
    >
      <Meta
        title={props.courseTitle}
        description={
          <>
            <Row>
              <Col>{props.description?.startTime}</Col>
              <Col style={{ marginLeft: "auto" }}>
                <HeartFilled style={{ color: "crimson" }} />{" "}
                {props.description?.star}
              </Col>
            </Row>
            <hr />
            <Row>
              <Col> Duriation: </Col>
              <Col style={{ marginLeft: "auto" }}>
                <b>{props.description?.duration} years</b>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>Teacher:</Col>
              <Col style={{ marginLeft: "auto", color: "dodgerblue" }}>
                <b>{props.description?.teacherName}</b>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <UserOutlined
                  style={{ color: "#1890ff", margin: "0 3px 0 0" }}
                />
                Student limit:
              </Col>
              <Col style={{ marginLeft: "auto" }}>
                <b>{props.description?.maxStudents}</b>
              </Col>
            </Row>
          </>
        }
      />
      {cardGrid}
    </Card>
  );
}
