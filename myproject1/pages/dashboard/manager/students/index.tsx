import DashBoard from "../../../../components/layouts/dashboard";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function StudentIndex() {
  const [data, setData] = useState();

  const students: any = [];

  useEffect(async () => {
    let value;
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/students?page=1&limit=20",
        {
          Authorization: `Bearer ${token}`,
        }
      );
      value = response.data;
    } catch (error) {}

    return () => {
      cleanup;
    };
  }, [input]);

  return <DashBoard>student list</DashBoard>;
}
