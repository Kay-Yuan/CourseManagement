import { ResponsePaginator } from "./response";

// export interface Student<T = CourseShort> {
//   id: number;
//   name: string;
//   updatedAt: string;
//   country: string;
//   ctime: string;
//   email: string;
//   courses: T[];
//   type: BaseType | null;
// }

// export interface StudentsRequest extends Paginator {
//   query?: string;
//   userId?: number;
// }

// export interface StudentResponse extends ListResponse {
//   students: Students[];
// }

// export interface AddStudentRequest {
//   name: string;
//   country: string;
//   email: string;
//   type: number;
// }

// export type AddStudentResponse = Student;

// export interface UpdateStudentRequest extends AddStudentRequest {
//   id: number;
// }

// export type UpadateStudentResponse = Student;
export interface StudentBase {
  id: number;
  name: string;
}
// export interface ResponsePaginator {
//   page: number;
//   limit: number;
// }

export interface StudentListRecord extends StudentBase {
  area?: string | undefined;
  email?: string | undefined;
  selectedCurriculum?: string | undefined;
  studentType?: string | undefined;
  joinTime?: string | undefined;
}
export type StudentTypeName = "tester" | "developer";

export interface StudentType {
  id: number;
  name: StudentTypeName;
}
export interface Course {
  id: number;
  courseId: number;
  name: string;
}
export interface Student extends StudentBase {
  createdAt: string;
  updatedAt: string;

  email?: string | undefined;

  country?: string;
  profileId?: number;
  type?: StudentType;
  courses?: Course[];
}
export interface StudentResponse {
  total: number;
  students: Student[];
  paginator: ResponsePaginator;
}

export interface StudentInList extends StudentBase {
  area?: string | undefined;
  email?: string | undefined;
  selectedCurriculum?: string | undefined;
  studentType?: string | undefined;
  joinTime?: string | undefined;
}
