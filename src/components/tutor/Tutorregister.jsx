import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, } from 'react-toastify';
import { toast, Toaster } from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';
import register from "../../images/register.png";

const baseUrl = 'http://127.0.0.1:8000/api-tutor/tutor/';

function TutorRegister() {
  const [teacherData, setTeacherData] = useState({
    full_name: "",
    email: "",
    password: "",
    qualification: "",
    mobile_no: "",
    skills: "",
    status: ""
  });

  const handleChange = (event) => {
    setTeacherData({
      ...teacherData,
      [event.target.name]: event.target.value
    });
  };

  const submitForm = async (e) => {
    e.preventDefault()
    const teacherFormData = new FormData();
    teacherFormData.append('full_name', teacherData.full_name);
    teacherFormData.append('email', teacherData.email);
    teacherFormData.append('password', teacherData.password);
    teacherFormData.append('qualification', teacherData.qualification);
    teacherFormData.append('mobile_no', teacherData.mobile_no);
    teacherFormData.append('skills', teacherData.skills);

    try {
      const response = await axios.post(baseUrl, teacherFormData);
      console.log(response.data);

      setTeacherData({
        full_name: "",
        email: "",
        password: "",
        qualification: "",
        mobile_no: "",
        skills: "",
        status: 'success'
      });

      toast.success('Registration successful,Login Now', {
        position: 'top-center',
        autoClose: 3000
      });
    } catch (error) {
      console.log(error);
      setTeacherData({
        ...teacherData,
        status: 'error'
      });

      toast.error('Registration failed', {
        position: 'top-center',
        autoClose: 3000
      });
    }
  };


  
  

  return (
    <div className="bg-gradient h-screen w-screen flex items-center justify-center">
       <Toaster position="top-center" reverseOrder={false}/>
       <div className=" h-5/6 w-10/12 flex flex-row bg-gradient-to-r from-white  to-gray-300 rounded-3xl">
        <div className="h-full w-3/6 flex items-center justify-center">
          <img src={register} alt="Login" />
        </div>
        <div className="h-full w-3/6 flex items-center justify-center">
          <div className="bg-white h-5/6 w-4/6">
            <h1 className="font-serif text-3xl text-custom-red mt-4 px-24 font-bold">
              TUTOR SIGNUP
            </h1>
         
            <form className="login-input">
              <input
                className="bg-white h-9 w-11/12 border-2 rounded-full mt-5 placeholder-pink-300 outline-none text-black px-6"
                type="text"
                name="full_name"
                placeholder="Full Name"
                value={teacherData.full_name}
                onChange={handleChange}
              />
              <input
                className="bg-white h-9 w-11/12 border-2 rounded-full mt-5 placeholder-pink-300 outline-none text-black px-6"
                type="email"
                name="email"
                placeholder="Email"
                value={teacherData.email}
                onChange={handleChange}
              />
              <input
                className="bg-white h-9 w-11/12 border-2 rounded-full mt-5 placeholder-pink-300 outline-none text-black px-6"
                type="text"
                name="mobile_no"
                placeholder="Phone"
                value={teacherData.mobile_no}
                onChange={handleChange}
              />
              <input
                className="bg-white h-9 w-11/12 border-2 rounded-full mt-5 placeholder-pink-300 outline-none text-black px-6"
                type="password"
                name="password"
                placeholder="Password"
                value={teacherData.password}
                onChange={handleChange}
              />
              <input
                className="bg-white h-9 w-11/12 border-2 rounded-full mt-5 placeholder-pink-300 outline-none text-black px-6"
                type="text"
                name="qualification"
                placeholder="Qualification"
                value={teacherData.qualification}
                onChange={handleChange}
              />
              <input
                className="bg-white h-9 w-11/12 border-2 rounded-full mt-5 placeholder-pink-300 outline-none text-black px-6"
                type="text"
                name="skills"
                placeholder="Skills"
                value={teacherData.skills}
                onChange={handleChange}
              />
              <input
                className="bg-red-300 mt-6 h-7 w-5/12 rounded-full text-black"
                type="submit"
                value="SIGNUP"
                onClick={submitForm}
              />
              <p className="text-custom-red text-xs">
                Already a member..?
                <Link to="/tutorsignin">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default TutorRegister;
