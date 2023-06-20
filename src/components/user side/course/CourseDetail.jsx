import React from 'react'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import profile from '../../../images/avatar.jpg'
import instance from '../../../utils/axios';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import { details } from '../../../utils/axios'

import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
   
  } from "@material-tailwind/react";



export default function SingleCourse() {
    const { id } = useParams();
    const course_id = useParams()
    const [SingleCourse, setSingleCourse] = useState({})
    const [Singleuser, setSingleuser] = useState({})
  

    useEffect(() => {
        getCourse();
    }, [])


    async function getCourse() {
        const response = await instance.get(`courses/singlecourse/${course_id.id}`)
        const user_response = await instance.get(`courses/singleuser/${course_id.id}`)
      
        setSingleCourse(response.data)
        setSingleuser(user_response.data)
       
    }
  

    const [open, setOpen] = useState(0);

    
    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    }
    const [contOpen, setContOpen] = useState(0);
    
    const handleContOpen = (value) => {
        setContOpen(contOpen === value ? 0 : value);
    }

    function Icon({ id, open }) {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${
              id === open ? "rotate-180" : ""
            } h-5 w-5 transition-transform`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        );
    }

  return (
    <div className='h-full w-full font-poppins'>
        <Toaster position='top-center' reverseOrder='false' ></Toaster>
        <div className="w-full h-80  bg-red-200">
          
            <div className="w-full h-full py-5  flex  place-content-start px-14">
                <div className='w-3/5 h-full pt-5 flex flex-col gap-5  place-content-start'>
                    <h2 className='text-4xl text-black font-bold '>{SingleCourse.title}</h2>
                    <h2 className='text-xl text-black font-normal '>{SingleCourse.subtitle}</h2>
                </div>
                <div className="shadow-xl bg-white absolute rounded-xl right-36 h-auto px-1 py-8 w-80 flex-col flex gap-8 place-items-center">
                    <div className='p-3 rounded-md w-full h-60'>
                        <video className='w-full h-full' src={details.base_url+SingleCourse.video} controls></video>
                    </div>
                    <div className="flex gap-3 place-content-center">
                        {/* <p className='text-3xl font-semibold text-darkPink'>{'₹ '+SingleCourse.saleprice}</p> */}
                        <p className='text-3xl font-normal  text-gray-600'>{'₹ '+SingleCourse.price}</p>
                    </div>
                    <div className="w-full px-3 flex place-content-center">
                        <button className=' text-white px-5 py-3 w-full bg-bgcart'>Add To Cart</button>
                    </div>
                   
                </div>
            </div>
        </div>
        <div className='flex flex-col w-full h-full'>
            <div className="w-3/5 px-5 py-10 flex flex-col place-items-center">
                <Tabs value="overview" className="w-full px-10">
                    <TabsHeader
                        className="bg-transparent"
                        indicatorProps={{
                            className: "bg-blue-500/10 shadow-none text-blue-500",
                          }}
              
                    >
                    
                        <Tab key="overview" value="overview" className=' font-semibold py-3'>
                            Overview
                        </Tab>
                        <Tab key="curriculum" value="curriculum" className=' font-semibold py-3'>
                            Curriculum
                        </Tab>
                        <Tab key="instructor" value="instructor" className=' font-semibold py-3'>
                            Instructor
                        </Tab>
                        <Tab key="reviews" value="reviews" className=' font-semibold py-3'>
                            Reviews
                        </Tab>
                    
                    </TabsHeader>
                    <TabsBody>
                        
                        <TabPanel key="Overview" value="overview">
                            <div className='flex bg-gray-100 px-5 pt-3 pb-5 rounded-xl flex-col gap-3'>
                                <h1 className='text-xl font-semibold text-black'>Course Description</h1>
                                <p className='text-gray-700'>{SingleCourse.description}</p>
                            </div>
                        </TabPanel>

                        <TabPanel key="curriculum" value="curriculum">
                          
                        </TabPanel>
                        <TabPanel key="instructor" value="instructor">
                            <div className="w-full rounded-xl bg-gray-100 p-5">
                                <div className="flex place-items-center">
                                    <div className="w-20">
                                        <img src={profile} alt="tutor_profile" />  
                                    </div>
                                    <div className="flex flex-col gap-3 place-content-start">
                                        <h1 className='flex gap-3 font-poppins text-xl font-semibold text-black'>
                                            {Singleuser ? Singleuser.username : null}</h1>
                                    </div>
                                </div>
                                <p className='text-lg text-gray-600 pt-3'>2+ Year Experiance Python-Django FUll stack developer with high specialized in React Js</p>
                            </div>
                        </TabPanel>
                        <TabPanel key="reviews" value="reviews">
                        <div className="w-full h-96">
                          
                        </div>
                        </TabPanel>
                    
                    </TabsBody>
                    </Tabs>

            </div>
        </div>





    </div>
  )
}
