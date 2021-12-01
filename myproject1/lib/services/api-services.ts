import axios from "axios";
import { Cookies } from "react-cookie";
import { useRouter } from "next/router";
import { type } from "os";

export function Logout() {
  // console.log("Loging out")
  const router = useRouter();

  axios
    .post(
      "http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/logout",
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    )
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

export function Login(userInfo: userInfo) {
  return axios.post(
    // "post",
    "http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/login",
    userInfo
  );
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
