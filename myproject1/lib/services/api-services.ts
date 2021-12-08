import axios, { AxiosPromise, AxiosResponse } from "axios";
import { Cookies } from "react-cookie";
import { useRouter } from "next/router";
import { type } from "os";
import { apiPath } from "./config";

export function Logout() {
  const router = useRouter();

  axios
    .post(apiPath + "/logout", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then(function (response) {
      const status = response.data.msg;
      if (status === "success") {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        alert(`You have successfully logout.`);

        router.push("/");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

export interface userInfo {
  email: string;
  password: string;
  role: string;
}

export async function Login(userInfo: userInfo): Promise<any> {
  return axios
    .post(apiPath + "/login", userInfo)
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

export async function postService(
  endpoint: string,
  params: object
): Promise<AxiosResponse<any, any>> {
  // const token = localStorage.getItem("token");
  return axios
    .post(apiPath + endpoint, params)
    .then((res: AxiosResponse) => res.data)
    .catch((err) => console.log(err));
}
// type IPath = (string | number)[] | string | number;

// class BaseApiService {
//     protected async get<T>(path: IPath, paramas?: QueryParams): Promise<T> {
//         path = this.getPath(path);
//         path = !!paramas
//             ?`$(path)?{Object.entries(params)
//                 .map(([key, value]) => `${key} = ${value}`)
//                 .join('&')`
//             : path;

//             return axiosInstance
//                 .get(path)
//                 .then((res) => res.data)
//                 .catch((err) => this.errorHandle(err));
//     }
// }
