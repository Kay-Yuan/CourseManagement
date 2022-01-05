import { AxiosResponse } from "axios";
import {
  CourseInDetailTable,
  Student,
  StudentDetailCourse,
  StudentInList,
  StudentResponse,
} from "../model/student";
import { Teacher, TeacherInList, TeacherResponse } from "../model/teacher";

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

export function processTeacherData(
  res: AxiosResponse<any, any>
): TeacherInList[] {
  const rows: TeacherInList[] = [];
  let value: TeacherResponse = res.data;

  const teachers: Teacher[] = value.teachers;
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

export async function getStudentDetail(id: string) {}
