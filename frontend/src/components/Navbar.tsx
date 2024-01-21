import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";
import logo from "../assets/analyzer.png";
const Navbar = () => {
  const [user, setUser] = useLocalStorage("username", "");
  const nav = useNavigate();

  useEffect(() => {
    if (user == "") {
      nav("/login");
    }
  }, [user]);
  return (
    <>
      <nav className="flex items-center justify-between text-black h-14 font-poppins">
        <div className="flex items-center">
          <img className="mx-3 w-10" src={logo} />
          <span className="font-bold text-xl text-[#263238]">UDYAM</span>
        </div>
        <ul className="flex">
          <li className=" text-[#263238] mx-3 p-2 duration-300 hover:text-[#263238] hover:bg-[#E0BBE6] cursor-pointer rounded-lg">
            <Link
              className="hover:text-[#263238] duration-300 hover:bg-[#E0BBE6] rounded-lg"
              to="/"
            >
              Home
            </Link>
          </li>
          {user != "" && (
            <li className=" text-[#263238] mx-3 p-2 duration-300 hover:text-[#263238] hover:bg-[#E0BBE6] cursor-pointer rounded-lg">
              <Link
                className="hover:text-[#263238] duration-300 hover:bg-[#E0BBE6] rounded-lg"
                to="/challenge"
              >
                Challenges
              </Link>
            </li>
          )}
          {user != "" && (
            <li className=" text-[#263238] mx-3 p-2 duration-300 hover:text-[#263238] hover:bg-[#E0BBE6] cursor-pointer rounded-lg">
              <Link
                className="hover:text-[#263238] duration-300 hover:bg-[#E0BBE6] rounded-lg"
                to="/marketplace"
              >
                Marketplace
              </Link>
            </li>
          )}
          {user == "" && (
            <li className=" text-[#263238] mx-3 p-2 duration-300 hover:text-[#263238] hover:bg-[#E0BBE6] cursor-pointer rounded-lg">
              <Link
                className="hover:text-[#263238] duration-300 hover:bg-[#E0BBE6] rounded-lg"
                to="/login"
              >
                Login
              </Link>
            </li>
          )}
          {user != "" && (
            <li
              className=" text-[#263238] mx-3 p-2 duration-300 hover:text-[#263238] hover:bg-[#E0BBE6] cursor-pointer rounded-lg"
              onClick={() => setUser("")}
            >
              <Link
                className="hover:text-[#263238] duration-300 hover:bg-[#E0BBE6] rounded-lg"
                to="/login"
              >
                Sign out
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
