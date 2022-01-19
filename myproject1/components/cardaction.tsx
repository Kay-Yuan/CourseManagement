import { Row } from "antd";

export default function CourseCardAction(props: any) {
  return (
    <>
      <Row>
        <b>{props.content}</b>
      </Row>
      <Row> {props.title} </Row>
    </>
  );
}
