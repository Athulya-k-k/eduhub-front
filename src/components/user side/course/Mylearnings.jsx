import React from 'react'
import { Toaster } from 'react-hot-toast'
import NavBar from '../navbar/Navbar'
import { useState,useEffect } from 'react'
import instance from '../../../utils/axios';
import jwtDecode from 'jwt-decode';
import { getLocal } from '../../../helpers/auth';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { details } from '../../../utils/axios';

export default function Mylearnings() {

  const [myCoures, setMycourses] = useState([])


  const user_auth = getLocal('authToken');
  let user_name;
  if(user_auth){
    user_name = jwtDecode(user_auth)
  }

  useEffect(()=>{
    getmycourses()
  }, [])

  async function getmycourses(){
    const response = await instance.get(`courses/mycourse/${user_name.user_id}`)
    setMycourses(response.data)
  }





  return (
<div className='w-full h-full font-poppins relative'>
        <Toaster position='top-center' reverseOrder='false' ></Toaster>
        <div className="w-full h-56 bg-cover bg-whie">
            <NavBar/>
            <div className="w-full py-10  flex flex-col place-content-center place-items-center">
                <div className="w-4/5">
                    <h2 className='text-3xl font-semibold text-white '>My Learnings</h2>
                </div>
            </div>
        </div>
        {
          myCoures?.length>0?
        <div className="w-full h-full py-5   flex px-14">
        
          {

            myCoures?.map((item)=>(
            <div className="shadow-xl bg-white rounded-xl place-content-between h-120 px-1 mr-8 py-8 w-72 flex-col flex gap-8">
                <div className='p-3 rounded-md w-full h-56'>
                  <img className='w-full h-5/6 rounded-md' src={details+item?.course.image} alt="course_image" />
                </div>
                <div className="flex flex-col pl-2">
                    <p className='text-md font-bold  text-black'>{item?.course?.title}</p>
                </div>
                <Link to={`/attendcourse/${item?.course?.id}`}>
                <div className="w-full px-3 flex place-content-center">
                    <button className=' text-white px-5 py-3 w-full rounded-lg bg-bgcart' >Start Course</button>
                </div>
                </Link>

               
            </div>
            ))
          }
            
        </div>
        :
        <div className="w-full pl-5 pr-5 absolute top-60 py-5 px-2 flex flex-col place-items-center gap-10">
            <div className='w-full bg-white shadow-xl rounded-xl flex flex-col place-items-center place-content-start p-3'>
                <img className='w-80 h-80 pb-6' src="/no-enrolled-course.gif" alt="" />
                <p className='font-poppins text-3xl font-semibold'>No Course Enrolled</p>
            </div>
        </div>
    
    }
        
            
            
    </div>
    
  )
}
