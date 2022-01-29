import axios, { AxiosPromise, AxiosResponse } from "axios";
import { CoursesQuery, getCourseResponse } from "../model/course";
import { getService, postService } from "./api-services";
import { apiPath } from "./config";

// const token = localStorage.getItem("token");

export async function getCourseService(
  query?: CoursesQuery
): Promise<AxiosResponse<any, any>> {
  // query?: CoursesQuery
  let endPoint = "/courses";
  if (query) {
    endPoint += "?";
    if (query.page && query.limit)
      endPoint += `&page=${query.page}&limit=${query.limit}`;
    if (query.name) endPoint += `name=${query.name}`;
    if (query.type) endPoint += `type=${query.type}`;
    if (query.uid) endPoint += `uid=${query.uid}`;
    if (query.userId) endPoint += `userId=${query.userId}`;

    // Object.
    // solution 2
    // for (const property:  in query) {
    //     endPoint += `${property}=${query[property]}`
    //   }
  }
  // console.log(endPoint);
  return getService(endPoint)
    .then((res) => res.data)
    .catch((err) => console.log(err));
}
export async function getCourseDetailService(
  id: string
): Promise<AxiosResponse<any, any>> {
  let endPoint = `/courses/detail?id=${id}`;

  return getService(endPoint)
    .then((res) => res.data)
    .catch((err) => console.log(err));
}
