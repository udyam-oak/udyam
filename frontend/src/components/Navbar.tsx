import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
  <>
  <nav className="flex items-center justify-between text-black h-14 font-poppins" >
        {/* <img className="mx-3 font-bold text-xl w-20" src='src\assets\LOGO.png'/> */}
        <span className='mx-3 font-bold text-xl text-[#263238]'>UDYAM</span>
        <ul className='flex'>
            <li className=" text-[#263238] mx-3 p-2 duration-300 hover:text-[#263238] hover:bg-[#E0BBE6] cursor-pointer rounded-lg"><Link className='hover:text-[#263238] duration-300 hover:bg-[#E0BBE6] rounded-lg' to="/">Home</Link></li>
            <li className=" text-[#263238] mx-3 p-2 duration-300 hover:text-[#263238] hover:bg-[#E0BBE6] cursor-pointer rounded-lg"><Link className='hover:text-[#263238] duration-300 hover:bg-[#E0BBE6] rounded-lg' to="/challenge">Challanges</Link></li>
            <li className=" text-[#263238] mx-3 p-2 duration-300 hover:text-[#263238] hover:bg-[#E0BBE6] cursor-pointer rounded-lg"><Link className='hover:text-[#263238] duration-300 hover:bg-[#E0BBE6] rounded-lg' to="/marketplace">Marketplace</Link></li>
            <li className=" text-[#263238] mx-3 p-2 duration-300 hover:text-[#263238] hover:bg-[#E0BBE6] cursor-pointer rounded-lg"><Link className='hover:text-[#263238] duration-300 hover:bg-[#E0BBE6] rounded-lg' to="/login">Login</Link></li>
        </ul>
    </nav>
  </>
  );
};

export default Navbar;
