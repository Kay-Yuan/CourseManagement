import { TablePaginationConfig } from "antd";
import { AxiosResponse } from "axios";
import {
  CourseInDetailTable,
  Student,
  StudentDetailCourse,
  StudentInList,
  StudentQuery,
  StudentResponse,
} from "../model/student";
import { getService } from "./api-services";

export function processCourses(
  res: AxiosResponse<any, any>
): CourseInDetailTable[] {
  let courses: CourseInDetailTable[] = [];
  res.data.courses.forEach((course: StudentDetailCourse, index: number) => {
    const eachCourse = {
      // key: course.id,
      courseId: course.courseId,
      id: index + 1,
      name: course.name,
      type: course.type[0] ? course.type[0].name : "",
      joinTime: course.createdAt,
    };
    courses.push(eachCourse);
  });
  return courses;
}

export function processStudentData(
  res: AxiosResponse<any, any>
): StudentInList[] {
  const rows: StudentInList[] = [];
  let value: StudentResponse = res.data;

  const students: Student[] = value.students;
  // console.log("student is ", students);
  const calculateJoinTime = (joinTime: string): string => {
    const now = new Date();
    const then = new Date(joinTime);
    const Difference_In_Time: number = now.getTime() - then.getTime();
    // To calculate the no. of days between two dates
    const years: number = Difference_In_Time / (1000 * 3600 * 24 * 30 * 12);
    const almostYear: number = parseInt(years.toString()) + 1;
    if (parseInt((years % 1).toFixed(2).substring(2)) >= 50) {
      return "Almost " + almostYear + " years ago";
    } else if (parseInt((years % 1).toFixed(2).substring(2)) < 50) {
      return "Over " + parseInt(years.toString()) + " years ago";
    }
    return "No record.";
  };
  students.forEach((student) => {
    const row: StudentInList = {
      id: student.id,
      name: student.name,
      area: student.country,
      email: student.email,
      selectedCurriculum: student.courses
        ?.map((course) => course.name)
        .join(","),
      studentType: student.type?.name,
      joinTime: calculateJoinTime(student.createdAt),
    };
    rows.push(row);
  });
  return rows;
}
export async function getStudentResponse(
  pagination: TablePaginationConfig,
  query?: StudentQuery
): Promise<any> {
  let endPoint = `/students?page=${pagination.current}&limit=${pagination.pageSize}`;
  if (query) {
    if (query.name) endPoint += `&query=${query.name}`;
    if (query.userId) endPoint += `&userId=${query.userId}`;
  }

  return getService(endPoint)
    .then((res) => res.data)
    .catch((err) => console.log(err));
}
export async function getStudentDetail(id: any) {
  return getService(`/students/${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
}
// export async function getPostData(id) {
//   const fullPath = path.join(postsDirectory, `${id}.md`);
//   const fileContents = fs.readFileSync(fullPath, "utf8");

//   // Use gray-matter to parse the post metadata section
//   const matterResult = matter(fileContents);

//   // Use remark to convert markdown into HTML string
//   const processedContent = await remark()
//     .use(html)
//     .process(matterResult.content);
//   const contentHtml = processedContent.toString();

//   // Combine the data with the id
//   return {
//     id,
//     contentHtml,
//     ...matterResult.data,
//   };
// }
