import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Toaster } from "react-hot-toast";
import instance from "../../utils/axios";

export default function Dashboard() {
  const[courses,setCourses]=useState([]);
  const[tutor,setTutor]=useState([]);
  const [student, setStudent] = useState([]);
 

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

  async function getStudent() {
    const response = await instance.get("api/users/");
    setStudent(response.data);
  }

  useEffect(() => {
    getStudent();
  }, [])


  return (
    <div className="flex ">
      <Sidebar />
      <div className="px-5 w-full h-full min-h-screen mx-5 mt-2  py-5  flex flex-col place-content-start place-items-center bg-white shadow-xl rounded-xl">
        <div className=" h-20 w-full flex place-content-start place-items-center px-5">
          <h3 className="font-semibold  text-2xl text-start">Dashboard</h3>
        </div>
        <div class="overflow-hidden  m-5 w-full">
          <Toaster position="top-center" reverseOrder="false"></Toaster>
          <div className="w-full h-uto flex place-items-center place-content-between gap-3">
            <div className="bg-cards w-3/6 h-35 shadow-xl p-5 m-3 rounded-xl flex flex-col">
              <div className="w-full h-full flex flex-col place-items-center gap-3 place-content-center">
                <h3 className="text-black font-semibold text-center text-xl">
                  Total Courses
                  <h4 className='font-semibold text-black text-2xl text-center'>{courses.length}</h4>
                </h3>
               
              </div>
            </div>
            <div className="bg-cards w-3/6 h-35 shadow-xl rounded-xl p-5">
              <div className="w-full h-full flex flex-col place-items-center gap-3 place-content-center">
                <h3 className="text-black  font-semibold text-center text-xl">
                  Instructors
                </h3>
                
                <h4 className='font-semibold text-black text-2xl text-center'>{tutor.length}</h4>
               
              </div>
            </div>
            <div className="bg-cards w-3/6 h-35 shadow-xl rounded-xl p-5">
              <div className="w-full h-full flex flex-col place-items-center gap-3 place-content-center">
                <h3 className="text-black font-semibold text-center text-xl">
                  Total Students
                </h3>
                <h4 className='font-semibold text-black text-2xl text-center'>{student.length}</h4>
               
              </div>
            </div>
            {/* <div className="bg-cards w-3/6 h-35 rounded-xl  shadow-xl p-5">
              <div className="w-full h-full flex flex-col place-items-center gap-3 place-content-center">
                <h3 className="text-black font-semibold text-center text-2xl">
                  Total Revenue
                </h3>
                <h4 className="font-semibold text-black text-2xl text-center">
                  15000
                </h4>
              </div>
            </div>
            <div className="bg-cards w-3/6 h-35 rounded-2xl  shadow-xl p-5">
              <div className="w-full h-full flex flex-col place-items-center gap-3 place-content-center">
                <h3 className="text-black font-semibold text-center text-2xl">
                  Total Sales
                </h3>
                <h4 className="font-semibold text-black text-2xl text-center">
                  18000
                </h4>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
