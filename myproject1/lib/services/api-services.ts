import axios from "axios";
import { Cookies } from "react-cookie";
import { useRouter } from "next/router";
import { type } from "os";

export default function Logout() {
  // console.log("Loging out")
  const router = useRouter();
  const currentUser = Cookies.get("currentUser");
  //   const currentUser = cookie.value;
  console.log("current User is ", currentUser);
  axios
    .post(
      "http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/logout",
      {
        headers: { Authorization: `Bearer ${currentUser}` },
      }
    )
    .then(function (response) {
      const status = response.data.msg;
      if (status === "success") {
        localStorage.removeItem("token");
        alert(`You have successfully logout.`);

        router.push("/");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
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
