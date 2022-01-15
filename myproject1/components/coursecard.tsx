import { Card, Avatar } from "antd";
// import Meta from 'antd/lib/card/Meta';

const { Meta } = Card;
export default function CourseCard(props: any) {
  return (
    <Card
      // title={}
      style={{ textAlign: "left" }}
      cover={<Avatar size={100} shape="circle" />}
      loading={props.loading}
    >
      <Meta title={props.courseTitle} description={props.description} />
    </Card>
  );
}
