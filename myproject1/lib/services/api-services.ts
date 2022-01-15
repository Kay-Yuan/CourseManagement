import axios, { AxiosPromise, AxiosResponse } from "axios";
import { apiPath } from "./config";

// const token = localStorage.getItem("token");

export function getService(endPoint: string): Promise<AxiosResponse<any>> {
  const token = localStorage.getItem("token");
  return axios.get(`${apiPath}${endPoint}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function postService(
  endpoint: string,
  params?: object
): Promise<AxiosResponse<any>> {
  return axios.post(apiPath + endpoint, params ? params : "");
}

export function putService(
  endpoint: string,
  params?: object
): Promise<AxiosResponse<any>> {
  return axios.put(apiPath + endpoint, params ? params : "");
}

export function deleteService(endpoint: string): Promise<AxiosResponse<any>> {
  const token = localStorage.getItem("token");
  return axios.delete(`${apiPath}${endpoint}`, {
    headers: { Authorization: `Bearer ${token}` },
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
