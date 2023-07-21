import React from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { getLocal } from "../../helpers/auth";
import { NavLink } from "react-router-dom";
import { BiHomeAlt2, BiCategoryAlt, BiCategory } from "react-icons/bi";
import { BsBook } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { SlGraduation } from "react-icons/sl";
import { CiDiscount1, CiLogout } from "react-icons/ci";
import { HiOutlineDocumentText } from "react-icons/hi";

export default function Profilesidebar() {
  const user_auth = getLocal("authToken");
  let user_name;
  if (user_auth) {
    user_name = jwtDecode(user_auth);
    console.log(user_name);
  }

  return (
    <div className="bg-white z-50 absolute h-auto min-h-screen xl:relative left-0 w-2/4 md:w-2/6 lg:w-1/5 shadow-xl  font-poppins rounded-r-2xl ">
      <div className="flex py-3">
        <h2 className="text-xl font-semibold mt-6 ml-5">
          Hello {user_name?.username}
        </h2>
      </div>

      <div className="flex flex-col px-3 py-5 mt-2">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive
              ? "bg-cards rounded-xl flex place-items-center text-black my-2"
              : "flex place-items-center bg-white-10 my-2"
          }
        >
          <BiHomeAlt2 size={50} className="px-3"></BiHomeAlt2>
          <h3 className=" font-semibold ">Account Details</h3>
        </NavLink>

        <NavLink
          to="/passwordChange"
          className={({ isActive }) =>
            isActive
              ? "bg-cards rounded-xl flex place-items-center text-black my-2"
              : "flex place-items-center bg-white-10 my-2"
          }
        >
          <AiOutlineUser size={50} className="px-3 "></AiOutlineUser>
          <h3 className="font-semibold ">Change Password</h3>
        </NavLink>
        <NavLink
          to="/orderhistory"
          className={({ isActive }) =>
            isActive
              ? "bg-cards rounded-xl flex place-items-center text-black my-2"
              : "flex place-items-center bg-white-10 my-2"
          }
        >
         
          <SlGraduation size={50} className="px-3"></SlGraduation>
          <h3 className="font-semibold">Back</h3>
        </NavLink>
      </div>
    </div>
  );
}
