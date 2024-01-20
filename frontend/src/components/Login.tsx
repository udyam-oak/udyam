import React, { useEffect, useState } from "react";
import useAxios from "axios-hooks";
import axios from "axios";
import { toast } from "sonner";

const Login = () => {
  const [username, setUsername] = useState("");
  const [passwd, setPasswd] = useState("");
  const [data, setData] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .get("http://127.0.0.1:5000/login", {
        params: {
          name: username,
          password: passwd,
        },
      })
      .then((res) => {
        if (res.data.success) {
          toast("Correct");
        }
        console.log(res.data);
      });
  };

  return (
    <>
      <div className="flex justify-between bg-[#E0BBE6] font-poppins">
        <div className="bg-[#BA68C8] h-screen w-1/3">
          <img
            src="src\assets\Image--.png"
            alt=""
            className="translate-x-1/2 translate-y-32"
            id="login-page-image"
          />
        </div>
        <div className="flex flex-col items-center my-32 mx-56 ">
          <h1 className="text-6xl m-4">LOGIN</h1>
          <br />
          <form action="" onSubmit={onSubmit}>
            <label htmlFor="" className="text-xl my-2 ml-2">
              Username
            </label>
            <br />
            <input
              type="text"
              name="name"
              className="border-2 border-[#7D538D] rounded text-3xl mt-2 h-11"
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <br />
            <br />
            <label htmlFor="" className="text-xl ml-2 mt-40">
              Password
            </label>
            <br />
            <input
              type="password"
              name="password"
              className="border-2 border-[#7D538D] rounded text-3xl mt-2 h-11"
              onChange={(e) => setPasswd(e.target.value)}
            />
            <br />
            <input
              type="submit"
              className="cursor-pointer hover:bg-[#BA68C8] duration-500 text-xl mt-9 ml-28 bg-[#7D538D] px-10 py-2 rounded-xl text-white"
              value={"LOGIN"}
            />
            <br />
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
