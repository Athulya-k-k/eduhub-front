import React, { useState } from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { BASE_URL } from "../../utils/axios";
import axios from 'axios'
import login,{getLocal} from "../../helpers/auth";
import Loginimage from "../../images/login.png";
import jwt_decode from 'jwt-decode'
import { useEffect } from 'react'



function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const response = getLocal()
  const history = useNavigate()
  const location = useLocation()

  let state = location.state

  useEffect(() => {
      if (response) {
          history('/')
      }
      if (state?.msg){
        toast.success(state?.msg)
        history(state=>({...state,msg:null}))
      }
  })

  const handleSubmit = async (e) => {
      e.preventDefault()
      const login_response = await login(email,password);
      console.log(login_response, 'log response');
     
     
    

      const local_response = getLocal('authToken');
      // console.log(local_response, 'from local storage');
      if (local_response) {
          const location = localStorage.getItem('location')
          const decoded = jwt_decode(local_response)
          console.log(decoded, 'decoded in login page');
          if (decoded.is_admin) {
              history('/dashboard')
          } else if (decoded.is_staff) {
              console.log('staff');
              history('/')
          } else if (location) {
              history(location, { replace: true })
              localStorage.removeItem('location')
          } else {
              history('/', { replace: true })
          }
      } else {
          toast.error('Invalid User Credentials')
      }
  }


  return (
    <div className="bg-gradient-to-br from-f6c2f9 to-819ff9 h-screen w-screen flex items-center justify-center">
      <Toaster position="top-center" reverseOrder={false}/>
      {/* <div className=" h-5/6 w-10/12 flex flex-row bg-gradient-to-r from-yellow-50 to-pink-200 rounded-3xl"> */}
      <div className=" h-5/6 w-10/12 flex flex-row bg-gradient-to-r from-white  to-gray-300 rounded-3xl">
        <div className=" h-full w-3/6  flex items-center justify-center">
          <img src={Loginimage} alt="Login" />
        </div>
        <div className=" h-full w-3/6 flex items-center justify-center  ">
          <div className="bg-white h-5/6  w-4/6 rounded-3xl ">
            <h1 className="font-serif text-3xl text-custom-red mt-24 px-24 font-bold">
              USER LOGIN
            </h1>
          <form onSubmit={handleSubmit}>
            <input
              className=" bg-white h-12 w-11/12 border-2 rounded-full mt-7 placeholder-pink-300  outline-none  text-black px-6"
              type="email"
              name="email"
              placeholder="  email"
              onChange={e =>setEmail(e.target.value) }
            />
            <input
              className=" bg-white h-12 w-11/12 border-2 rounded-full  mt-7 placeholder-pink-300 outline-none text-black px-6"
              type="password"
              name="password"
              placeholder="  password"
              onChange={e=>setPassword(e.target.value)}
            />
            <input
              className="bg-custom-red mt-7 h-11 w-5/12 rounded-full text-white"
              type="submit"
              value="LOGIN"
            />
            </form>
            <p className="mt-3 text-custom-red text-xs">
              Not yet registered..?
              <Link to="/register">
                SignUp
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login