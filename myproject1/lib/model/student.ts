export interface Student<T = CourseShort> {
  id: number;
  name: string;
  updatedAt: string;
  country: string;
  ctime: string;
  email: string;
  courses: T[];
  type: BaseType | null;
}

export interface StudentsRequest extends Paginator {
  query?: string;
  userId?: number;
}

export interface StudentResponse extends ListResponse {
  students: Students[];
}

export interface AddStudentRequest {
  name: string;
  country: string;
  email: string;
  type: number;
}

export type AddStudentResponse = Student;

export interface UpdateStudentRequest extends AddStudentRequest {
  id: number;
}

export type UpadateStudentResponse = Student;
