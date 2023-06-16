import React from 'react'
import Sidebar from './Sidebar'
import { Toaster } from 'react-hot-toast'
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import instance from '../../utils/axios';
import { useEffect } from "react";


export default function Dashboards() {
  const[courses,setCourses]=useState([]);
  const[tutor,setTutor]=useState([]);
 

  async function getCourses(){
    try{
    const response=await instance.get(`courses/course/`)
    setCourses(response.data)
   
    
    console.log(courses)
   

  }
   catch (error){
    console.log('couldnt fetch data');
   }}

  useEffect(()=>{
    getCourses();
    
  },[]);


  async function getTutor() {
    const response = await instance.get('tutor/tutors/')
    setTutor(response.data)
}

  useEffect(()=>{
    getTutor();
  }, [])





  return (
    <div className='flex bg-acontent'>
        <Sidebar/>
        <div className='px-5 w-full h-full min-h-screen mx-5 mt-2  py-5 font-poppins flex flex-col place-content-start place-items-center bg-white shadow-xl rounded-xl'>
          <div className=" h-20 w-full flex place-content-start place-items-center px-5">
              <h3 className='font-semibold text-primaryViolet text-2xl text-start'>Dashboard</h3>
          </div>
          <div class="overflow-hidden  m-5 w-full">
          <Toaster position='top-center' reverseOrder='false' ></Toaster>
            <div className="w-full h-uto flex place-items-center place-content-between gap-3">
              <div className="bg-cards w-3/6 h-35 shadow-xl p-5 m-3 rounded-xl flex flex-col">
                 <div className="w-full h-full flex flex-col place-items-center gap-3 place-content-center">
                  <h3 className='text-black font-semibold text-center text-xl'>Total Courses</h3>
                  <h4 className='font-semibold text-black text-2xl text-center'>{courses.length}</h4>
                 </div>
              </div>
              <div className="bg-cards w-3/6 h-35 shadow-xl rounded-xl p-5">
              <div className="w-full h-full flex flex-col place-items-center gap-3 place-content-center">
              <h3 className='text-black font-semibold text-center text-xl'>Total Tutors</h3>
              <h4 className='font-semibold text-black text-2xl text-center'>{tutor.length}</h4>
                 
                 </div>
              </div>
            
             
              </div>
            </div>



          
          </div>
        </div>
  
  )
}
