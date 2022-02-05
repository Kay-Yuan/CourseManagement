import axios, { AxiosPromise, AxiosResponse } from "axios";
import { CourseDetail, CoursesQuery, getCourseResponse } from "../model/course";
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

export function generateClassTime(item: string, data: CourseDetail) {
  if (data !== undefined && data.schedule.classTime !== null) {
    const res = data.schedule.classTime.find((item1) =>
      item1.split(" ")[0].includes(item)
    );
    return res?.split(" ")[1];
  }
}

export function create_UUID() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}
