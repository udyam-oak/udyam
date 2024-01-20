import { useState } from "react";
import Navbar from "./components/Navbar";
import {Link} from "react-router-dom";

function App() {
  

  return (
    <>
      <div className="flex justify-between font-poppins bg-[#BA68C8]">
        <div className="flex flex-col justify-center gap-14 ml-10">
          <span className="text-6xl text-slate-100 font-bold">UD<span className="text-[#263238]">YAM</span> </span>
          <span className="text-white">Lorem ipsum dolor, sit amet consectetur adipisicing elit.<br/> Cum, cupiditate. Rerum ab tempora dolore ad, repudiandae<br/>nisi suscipit facere voluptate ducimus accusamus amet, itaque<br/> consequatur necessitatibus exercitationem sunt fugiat fugit!</span>
          <div className="flex justify-evenly text-white">
          <Link to={"/"}><button className="bg-white text-[#BA68C8] hover:border-white hover:border-2 hover:text-white hover:bg-[#BA68C8] p-4 w-36 duration-300">Button1</button></Link>
          <Link to={"/"}><button className="border-2 border-white p-4 w-36 rounded-sm hover:bg-white hover:text-[#BA68C8] hover:border-white hover:border-2 duration-300">Button2</button></Link>
          </div>
        </div>
        <div className="bg-slate-100 h-screen w-1/3 ">
          <img src="src\assets\oversight-amico.png" alt="" className="-translate-x-1/2 translate-y-32"/>
        </div>
      </div>
    </>
  );
}

export default App;
