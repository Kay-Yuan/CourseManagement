import { TablePaginationConfig } from "antd";
import { AxiosResponse } from "axios";
import {
  CourseInDetailTable,
  Student,
  StudentDetailCourse,
  StudentInList,
  StudentResponse,
} from "../model/student";
import { Teacher, TeacherInList, TeacherResponse } from "../model/teacher";
import { getService } from "./api-services";

export function processCourses(res: AxiosResponse<any>): CourseInDetailTable[] {
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

// export async function getStudentDetail(id: string) {}

export async function getTeacherList(
  query?: string,
  page: number = 1,
  limit: number = 10
): Promise<any> {
  let endPoint = `/teachers?page=${page}&limit=${limit}`;
  let value: TeacherResponse;
  const rows: TeacherInList[] = [];
  endPoint = query ? endPoint + `&query=${query}` : endPoint;
  // return await getService(endPoint).then((res)=>{

  //   value = res.data.data;
  // }).catch((err) => console.log(err)).
  const res = await getService(endPoint);
  value = res.data.data;
  const teachers: Teacher[] = value.teachers;
  teachers.forEach((teacher) => {
    const row: TeacherInList = {
      id: teacher.id,
      name: teacher.name,
      country: teacher.country,
      email: teacher.email,
      skill: teacher.skills.map((item: any) => item.name).join(", "),
      courseAmount: teacher.courseAmount,
      phone: teacher.phone,
    };
    rows.push(row);
  });
  return { data: rows, total: value.total };
}

export async function getTeacherResponse(
  // page: number = 1,
  // limit: number = 10,
  pagination: TablePaginationConfig,
  query?: string
): Promise<any> {
  let endPoint = `/teachers?page=${pagination.current}&limit=${pagination.pageSize}`;
  endPoint = query ? endPoint + `&query=${query}` : endPoint;

  return getService(endPoint)
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

export function processTeacherData(res: AxiosResponse<any>): TeacherInList[] {
  const rows: TeacherInList[] = [];
  let value: TeacherResponse = res.data;

  // console.log("student is ", value);
  const teachers: Teacher[] = value.teachers;

  teachers.forEach((teacher) => {
    const row: TeacherInList = {
      id: teacher.id,
      name: teacher.name,
      country: teacher.country,
      email: teacher.email,
      skill: teacher.skills.map((item: any) => item.name).join(", "),
      courseAmount: teacher.courseAmount,
      phone: teacher.phone,
    };
    rows.push(row);
  });
  return rows;
}
