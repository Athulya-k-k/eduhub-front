import React, { useState, useEffect } from "react";
import NavBar from "../../components/user side/navbar/Navbar";
import Profilesidebar from "./ProfileSide";
import { Toaster } from "react-hot-toast";
import jwtDecode from "jwt-decode";
import { getLocal } from "../../helpers/auth";
import axios from "axios";
import instance from "../../utils/axios";
import { toast } from "react-hot-toast";

export default function Profile() {
  const user_auth = getLocal("authToken");
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [phone_number, setPhonenumber] = useState("");
  const [profile, setProfile] = useState([]);

  let user_name;
  if (user_auth) {
    user_name = jwtDecode(user_auth);
  }

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    const response = await instance.get(`api/profile/${user_name.user_id}`);
    console.log(response.data);
    setProfile(response.data);
    setFirstname(response.data[0].first_name);
    setLastname(response.data[0].last_name);
    setPhonenumber(response.data[0].phone_number);
  }

  const updateProfile = async (e) => {
    e.preventDefault();

    const response = await instance.post(`api/updateprofile/`, {
    
        user_id: user_name.user_id,
        first_name,
        last_name,
        phone_number,
    
    });

    if (response.status === 200) {
      toast.success("Updated....!");
      getProfile();
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full h-full ">
       <div className='w-full h-full flex gap-2'> <Profilesidebar />
       <div className='px-5 w-full h-full min-h-screen mx-3 mt-2  py-5 font-poppins flex flex-col place-content-start place-items-center bg-white shadow-xl rounded-xl'>
       <Toaster position="top-center" reverseOrder={false} />
       <div class="overflow-hidden  m-5 w-full">
                    <div className='w-full'>
                    <h1 className="font-bold text-3xl">Edit Profile</h1>
        </div>
        <div className="flex items-center w-full  px-4 py-12">
        </div>
      
  
      <form className="login-input mt-8" onSubmit={updateProfile}>
        <input
          className="bg-white h-9 w-11/12 border-2 rounded-full mt-5 placeholder-pink-300 outline-none text-black px-6"
          value={first_name}
          type="text"
          defaultValue={profile[0]?.first_name}
          name="first_name"
          placeholder="Enter your first name"
          onChange={(e) => setFirstname(e.target.value)}
        />
  
        <input
          className="bg-white h-9 w-11/12 border-2 rounded-full mt-5 placeholder-pink-300 outline-none text-black px-6"
          value={last_name}
          type="text"
          name="last_name"
          defaultValue={profile[0]?.last_name}
          placeholder="Enter your last name"
          onChange={(e) => setLastname(e.target.value)}
        />
  
        <input
          className="bg-white h-9 w-11/12 border-2 rounded-full mt-5 placeholder-pink-300 outline-none text-black px-6"
          value={phone_number}
          type="text"
          name="phone_number"
          defaultValue={profile[0]?.phone_number}
          placeholder="Enter your phone number"
          onChange={(e) => setPhonenumber(e.target.value)}
        />
  
        <div className="w-full flex justify-center mt-6">
          <button
            type="submit"
            className="bg-green-500 text-black font-semibold text-md px-1 py-1 w-1/6 rounded-xl text-center"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
  </div>
  </div>
  
  
  );
}
