import React, { useState } from 'react'
import Profilesidebar from './ProfileSide';
import { Toaster,toast } from 'react-hot-toast'
import instance from '../../utils/axios'
import jwtDecode from 'jwt-decode';
import { getLocal } from '../../helpers/auth';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Changepassword() {
    const [oldpass,setOldpass] = useState('')
    const [pass1,setPass1] = useState('')
    const [pass2,setPass2] = useState('')
    const navigate= useNavigate()


    const user_auth = getLocal('authToken');
    let user_name;
    if(user_auth){
        user_name = jwtDecode(user_auth)
    }


    const ChangePass = async (e) => {
        e.preventDefault()
        try{
            if (pass1 === pass2) {
                const res = await instance.post(`api/changepass/`,{oldpass,password:pass1,user_id:user_name.user_id}
                )
                if(res.data.msg===500){
                    toast.error("Old Password Not match")
                }
                else{
                    e.target.reset()
                    localStorage.removeItem('authToken')
                   toast.success('password changed')
                }
                console.log(res.data);
              }
              else {
                toast.error("Password did't match")
              }
          
        }catch(err){
            toast.error('Something went wrong...')
        }
        
      }


  return (
<div className='w-full h-full'>

        <div className='w-full h-full flex gap-2'>
            <Profilesidebar/>

            <div className='px-5 w-full h-full min-h-screen mx-3 mt-2  py-5 font-poppins flex flex-col place-content-start place-items-center bg-white shadow-xl rounded-xl'>
                <Toaster position='top-center' reverseOrder='false' ></Toaster>
                <div class="overflow-hidden  m-5 w-full">
                    <div className='w-full'>
                        <h1 className='font-bold text-3xl'>Change Password</h1>
                    </div>
                    <div className="flex items-center w-full  px-4 py-12">
                      
                        <form className="login-input mt-8" onSubmit={ChangePass}>
        <input
          className="bg-white h-9 w-11/12 border-2 rounded-full mt-5 placeholder-pink-300 outline-none text-black px-6"
          
          type="text"

          name="first_name"
          placeholder="Enter the old password"
          onChange={e => setOldpass(e.target.value)}
        />
  
        <input
          className="bg-white h-9 w-11/12 border-2 rounded-full mt-5 placeholder-pink-300 outline-none text-black px-6"
         
          type="password"
          name="last_name"
          
          placeholder="Enter new password"
          onChange={e => setPass1(e.target.value)}
        />
  
        <input
          className="bg-white h-9 w-11/12 border-2 rounded-full mt-5 placeholder-pink-300 outline-none text-black px-6"

          type="password"
         
         
          placeholder="confirm password"
          onChange={e => setPass2(e.target.value)} 
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
    </div>
  )
}
