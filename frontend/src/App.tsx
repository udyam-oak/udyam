import { useRef, useState } from "react";
import Navbar from "./components/Navbar";
import { Link } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";

function App() {
  const [user, setUser] = useLocalStorage("username", "");

  return (
    <>
      <div className="flex justify-between font-poppins bg-[#BA68C8]">
        <div className="flex flex-col justify-center gap-14 ml-10">
          <span className="text-6xl text-slate-100 font-bold">
            UD<span className="text-[#263238]">YAM</span>{" "}
          </span>
          <span className="text-white">
            Udyam is an innovative academic platform designed to elevate student<br/> performance through gamification, making learning a dynamic and <br/>engaging experience. By seamlessly integrating gamified elements, <br/> Udyam transforms the educational journey into an interactive adventure,<br/> motivating students to excel..
          </span>
          <div className=" text-white">
            <Link to={"/user/" + user}>
              <button className="bg-white text-[#BA68C8] hover:border-white hover:border-2 hover:text-white hover:bg-[#BA68C8] p-4 w-36 duration-300">
                Your Profile
              </button>
            </Link>
          </div>
        </div>
        <div className="bg-slate-100 h-screen w-1/3 ">
          <img
            src="src\assets\oversight-amico.png"
            alt=""
            className="-translate-x-1/2 translate-y-32"
          />
        </div>
      </div>
    </>
  );
}

export default App;
