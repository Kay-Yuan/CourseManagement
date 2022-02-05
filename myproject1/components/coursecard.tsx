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
    background: "white",
  };
  let cardGrid = null;
  let hoverable = true;
  if (props.id) {
    hoverable = false;
    cardGrid = [
      <Card.Grid style={gridStyle}>
        <b style={{ color: "dodgerblue", fontSize: "x-large" }}>
          {props.description?.price}
        </b>
        <p>Price</p>
      </Card.Grid>,
      <Card.Grid style={gridStyle}>
        <b style={{ color: "dodgerblue", fontSize: "x-large" }}>
          {props.description?.sales.batches}
        </b>
        <p>Batches</p>
      </Card.Grid>,
      <Card.Grid style={gridStyle}>
        <b style={{ color: "dodgerblue", fontSize: "x-large" }}>
          {props.description?.sales.studentAmount}
        </b>
        <p>Students</p>
      </Card.Grid>,
      <Card.Grid style={gridStyle}>
        <b style={{ color: "dodgerblue", fontSize: "x-large" }}>
          {props.description?.sales.earnings}
        </b>
        <p>Earnings</p>
      </Card.Grid>,
    ];
  }

  return (
    <>
      <Card
        // title={props.courseTitle}
        style={{ textAlign: "left", width: "100%" }}
        cover={
          <Avatar
            size={100}
            shape="circle"
            style={{ margin: "auto", marginTop: "1vw" }}
          />
        }
        loading={props.loading}
        // bodyStyle={{ textAlign: "center" }}
        hoverable={hoverable}
        // headStyle={{ textAlign: "center" }}
        actions={props.action}
      >
        <Meta
          // title={props.courseTitle}
          description={
            <>
              <Row
                style={{
                  // margin: "0.5rem 1rem 1rem",
                  fontSize: "x-large",
                  color: "black",
                }}
              >
                {props.courseTitle}
              </Row>
              <Row>
                <Col>{props.description?.startTime}</Col>
                <Col style={{ marginLeft: "auto" }}>
                  <HeartFilled style={{ color: "crimson" }} />
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
      </Card>
      {cardGrid}
    </>
  );
}
