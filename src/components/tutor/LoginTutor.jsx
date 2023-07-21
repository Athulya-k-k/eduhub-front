import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Loginimage from "../../images/login.png";
import { toast, Toaster } from "react-hot-toast";

const baseUrl = 'http://localhost:8000/api-tutor';

function TutorLogin() {
  const [teacherLoginData, setteacherLoginData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (event) => {
    setteacherLoginData({
      ...teacherLoginData,
      [event.target.name]: event.target.value
    });
  };
  const submitForm = (e) => {
    e.preventDefault();
    const teacherFormData = new FormData();
    teacherFormData.append('email', teacherLoginData.email);
    teacherFormData.append('password', teacherLoginData.password);
    
    try {
      axios.post(baseUrl + '/teacherlogin/', teacherFormData)
        .then((res) => {
          // console.log(res);
          if (res.data.bool === true) {
            localStorage.setItem('teacherLoginStatus', true);
            localStorage.setItem('tutor_id', res.data.tutor_id);
            window.location.href = '/dashboards';
          } else {
            toast.error('Entered password is incorrect');
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  

   const navigate = useNavigate();
  const teacherLoginStatus = localStorage.getItem('teacherLoginStatus');
  if (teacherLoginStatus == 'true') {
    navigate("/dashboards");
 
}

  useEffect(() => {
    const teacherLoginStatus = localStorage.getItem('teacherLoginStatus');
    if (teacherLoginStatus === 'true') {
      navigate("/dashboards");
    }
  }, []);
  

  return (
    <div className="bg-gradient h-screen w-screen flex items-center justify-center">
      <Toaster position="top-center" reverseOrder={false}/>
      {/* <div className=" h-5/6 w-10/12 flex flex-row bg-gradient-to-r from-yellow-50 to-pink-200 rounded-3xl"> */}
      <div className=" h-5/6 w-10/12 flex flex-row bg-gradient-to-r from-white  to-gray-300 rounded-3xl">
        <div className=" h-full w-3/6  flex items-center justify-center">
          <img src={Loginimage} alt="Login" />
        </div>
        <div className=" h-full w-3/6 flex items-center justify-center  ">
          <div className="bg-white h-5/6  w-4/6 rounded-3xl ">
            <h1 className="font-serif text-3xl text-custom-red mt-24 px-24 font-bold">
              TUTOR LOGIN
            </h1>
            <form onSubmit={submitForm}>
              <input
                className=" bg-white h-12 w-11/12 border-2 rounded-full mt-7 placeholder-pink-300  outline-none  text-black px-6"
                type="email"
                name="email"
                placeholder="  email"
                value={teacherLoginData.email}
                onChange={handleChange}
              />
              <input
                className=" bg-white h-12 w-11/12 border-2 rounded-full  mt-7 placeholder-pink-300 outline-none text-black px-6"
                type="password"
                name="password"
                placeholder="  password" 
                value={teacherLoginData.password}
                onChange={handleChange}
              />
              <input
                className="bg-custom-red mt-7 h-11 w-5/12 rounded-full text-white"
                type="submit"
                value="LOGIN"
              />
            </form>
            <p className="mt-3 text-custom-red text-xs">
              Not yet registered..?
              <Link to="/tutorsignup">
                SignUp
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorLogin;
