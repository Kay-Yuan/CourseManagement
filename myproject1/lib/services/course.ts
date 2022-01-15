import axios, { AxiosPromise, AxiosResponse } from "axios";
import { getCourseResponse } from "../model/course";
import { postService } from "./api-services";
import { apiPath } from "./config";

const token = localStorage.getItem("token");

export function Logout() {
  // const router = useRouter();

  axios
    .post(apiPath + "/logout", "", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      const status = response.data.msg;
      if (status === "success") {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        alert(`You have successfully logout.`);

        // router.push("/");
      }
    })
    .catch((err) => console.log(err));
}

export interface userInfo {
  email: string;
  password: string;
  role: string;
}

export async function Login(userInfo: userInfo): Promise<any> {
  return postService("/login", userInfo)
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

export async function getService(
  endpoint: string,
  params?: object
): Promise<AxiosResponse<any, any>> {
  // const token = localStorage.getItem("token");
  let path: string = apiPath + endpoint;
  if (params) {
    path = apiPath + endpoint;
    return axios
      .get(path, params)
      .then((res: AxiosResponse) => res.data)
      .catch((err) => console.log(err));
  } else
    return axios
      .get(path, params)
      .then((res: AxiosResponse) => res.data)
      .catch((err) => console.log(err));
}

// export async function postService(
//   endpoint: string,
//   params?: object
// ): Promise<AxiosResponse<any, any>> {
//   // const token = localStorage.getItem("token");
//   return axios
//     .post(apiPath + endpoint, params ? params : "")
//     .then((res: AxiosResponse) => res.data)
//     .catch((err) => console.log(err));
// }

export async function getCourseService(
  endpoint: string,
  params?: object
): Promise<AxiosResponse<any, any>> {
  // const path = `courses`;
  // let value: getCourseResponse;
  // return await getService(path)
  //   .then(function (response: AxiosResponse) {
  //     value = response.data.data.courses;
  //     return value;
  //     console.log(value);
  //   })
  //   .catch(function (error) {
  //     // handle error
  //     console.log(error);
  //   });

  return axios
    .get(apiPath + endpoint, params)
    .then((res: AxiosResponse) => res.data.data.courses)
    .catch((err) => console.log(err));
}
