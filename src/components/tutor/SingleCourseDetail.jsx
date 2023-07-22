import React from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from './Sidebar'
import { Toaster } from 'react-hot-toast'
import { useState,useEffect } from 'react'
import axios from 'axios'
import instance from '../../utils/axios'
import { details } from '../../utils/axios'
import { useNavigate } from 'react-router-dom'
import AddSession from './AddSession'
import AddMaterial from './AddMaterial'
import { MdOndemandVideo } from 'react-icons/md'
import { AiOutlineBulb } from 'react-icons/ai'
import { HiDocumentDuplicate } from 'react-icons/hi'
import {RiVideoFill} from 'react-icons/ri'
import {CiEdit} from 'react-icons/ci'
import { toast } from 'react-hot-toast'
import Swal from 'sweetalert2'

import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Accordion,
    AccordionHeader,
    AccordionBody,
  } from "@material-tailwind/react";



export default function InstructorSingleCourse() {
    const [toggle,setToggle] = useState({add:false,addmaterial:false});
    const course_id = useParams()
    const [SingleCourse, setSingleCourse] = useState({})
    const [Sessions, setSessions] = useState([])
    const navigate = useNavigate()
    const [Lecture, setLecture] = useState([])


    useEffect(() => {
        getCourse();
    }, [])

    async function getCourse() {
        const response = await instance.get(`courses/singlecourse/${course_id.id}`)
        const session_response = await instance.get(`csession/session/${course_id.id}`)
        const lecture_response = await instance.get(`csession/lectures/${course_id.id}`)

        setLecture(lecture_response.data)
        setSingleCourse(response.data)
        setSessions(session_response.data)
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

    function goTocreate() {
        navigate('/createcourse')    
    }

    const Resubmit = (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "Request for Approval...",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
          }).then((result) => {
            if (result.isConfirmed) {
                instance.get(`courses/resubmit/${id}`).then(
                    getCourse()
                )
                getCourse()
                toast.success("Requested")
            }
        })
    }
    
    


  return (
    <div className='flex h-full bg-acontent'>
        <Toaster position='top-center' reverseOrder='false' ></Toaster>
        <Sidebar/>
        <div className='px-5 w-full h-auto min-h-screen mx-5 mt-2  py-8 font-poppins flex flex-col         place-content-start place-items-center bg-white shadow-xl rounded-xl'>
            <div className='flex place-content-between place-items-center w-full h-14'>
                <h2 className='font-semibold font-poppins text-primaryBlue text-xl'>Course Management</h2>
                <div className=''>
                    {
                    SingleCourse.is_rejected ?
                    <button onClick={() => Resubmit(SingleCourse.id)} className='bg-cards rounded-lg text-center px-5 py-2 text-black text-light'>Re Submit</button>
                    :
                    null
                    }
                    <button onClick={()=>goTocreate()} className='bg-cards rounded-lg text-center ml-5 px-5 py-2 text-black text-light'>Create Course</button>
                </div>
                
            </div>
            {
                SingleCourse.is_rejected ?
                <div className='w-5/6 bg-red-300 py-2 mt-2 rounded-xl flex place-content-center place-items-center'>
                <h2 className='font-poppins text-white text-primaryBlue text-md'>This Course Has been rejected due to : "{SingleCourse.reason}"</h2>
                </div>
                :
                null
            }
        

            <div class="flex flex-col rounded-lg border border-gray-200 shadow-md m-5 w-full">
                <div className="w-full h-full py-5  flex  place-content-start px-14">
                    <div className='w-3/5 h-full pt-5 flex flex-col gap-5  place-content-start'>
                        <h2 className='text-2xl text-black font-bold '>{SingleCourse.title}</h2>
                        <h2 className='text-lg text-black font-normal '>{SingleCourse.subtitle}</h2>
                    </div>
                    <div className=' pl-10'>
                        <div className='p-6 rounded-md w-full h-60'>
                            <video className='w-full h-full' src={details.base_url+SingleCourse.video} controls></video>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col rounded-lg border border-gray-200 shadow-md m-5 w-full">
            <div className='flex flex-col w-full h-full'>
                <div className="w-full px-5 py-10 flex flex-col place-items-center">
                    <Tabs value="overview" className="w-full px-10">
                        <TabsHeader
                            className="bg-transparent"
                            indicatorProps={{
                                className: "bg-blue-500/10 shadow-none text-blue-500",
                            }}>
                        
                            <Tab key="overview" value="overview" className=' font-semibold py-3'>
                                Overview
                            </Tab>
                            <Tab key="curriculum" value="curriculum" className=' font-semibold py-3'>
                                Sessions
                            </Tab>
                            <Tab key="materials" value="materials" className=' font-semibold py-3'>
                                Materials
                            </Tab>
                        
                        </TabsHeader>
                        <TabsBody>
                            
                            <TabPanel key="Overview" value="overview">
                                <div className='flex w-full bg-gray-100 px-5 pt-3 pb-5 rounded-xl flex-col gap-3'>
                                    <h1 className='text-xl font-semibold text-black'>Course Description</h1>
                                    <p className='text-gray-700'>{SingleCourse.description}</p>
                                </div>
                            </TabPanel>
                            <TabPanel key="curriculum" value="curriculum">

                            <div className="w-full flex flex-col gap-3">
                                {
                                    
                                    Sessions?.map((Session,index)=>(
                                        
                                        <Accordion open={open === index} icon={<Icon id={index} open={open} />} className='bg-gray-100 rounded-xl px-5'>
                                            <AccordionHeader onClick={() => handleOpen(index)} className='text-lg font-semibold font-poppins capitalize tracking-wider'>
                                                {Session.title}
                                            </AccordionHeader>
                                            <AccordionBody>
                                                <div className='flex flex-col gap-4'>
                                                <p className='text-gray-600 font-light text-md font-poppins'>{Session.description}</p>
                                                {
                                                    Lecture?.map((Lecture,index)=>(
                                                    
                                                        Lecture?.session===Session?.id &&
                                                        <Accordion open={contOpen === index}>
                                                            <AccordionHeader onClick={() => handleContOpen(index)} className='text-md font-semibold flex place-items-center gap-1 capitalize font-poppins'>
                                                                <div className=' place-content-between flex w-full'>
                                                                <div><h2 className='flex gap-3 place-items-center text-start'>{ Lecture.type==="Lecture" ? <MdOndemandVideo size={20}></MdOndemandVideo> : Lecture.type==="Quiz" ? <AiOutlineBulb size={20}></AiOutlineBulb> : <HiDocumentDuplicate size={20}></HiDocumentDuplicate> } {Lecture.title}<span className='border-l-2 border-primary px-1'>{Lecture.type}</span></h2></div>
                                                                <div>
                                                                <CiEdit size={25}></CiEdit>
                                                                </div>
                                                                </div>
                                                            </AccordionHeader>
                                                            <AccordionBody className="font-poppins">
                                                                {Lecture.description}
                                                                {/* {Lecture.type==="Lecture"?
                                                                  <p>Vedio</p>
                                                                  :
                                                                  Lecture.type==="Quiz" ?
                                                                  <p>Quiz</p>
                                                                  :
                                                                  <p>Assignment</p>
                                                                } */}

{
                                                                Lecture.type ==="lecture" ?
                                                                <div className='w-full p-3 flex gap-3 place-items-center'>
                                                                    <RiVideoFill size={20}></RiVideoFill>
                                                                    <a className='text-black font-semibold font-poppins text-md' href={details+Lecture?.material} rel='noreferrer' target="_blank">Preview</a>
                                                                </div>
                                                                :
                                                                <div className='w-full p-3 flex gap-3 place-items-center'>
                                                                    <HiDocumentDuplicate size={20}></HiDocumentDuplicate>
                                                                    <a className='text-black font-semibold font-poppins text-md' href={details+Lecture?.material} rel='noreferrer' target="_blank">Preview</a>
                                                                </div>
                                                                }
                                                            </AccordionBody>
                                                        </Accordion>
                                                        
                                                    ))
                                                }
                                                
                                                </div>
                                            </AccordionBody>
                                        </Accordion>
                                        
                                    ))
                                }
                                
                            
                            </div>
                                <div className=' flex place-content-center place-items-center pt-5'>
                                    <button className='bg-cards rounded-lg text-center px-5 py-2 text-black text-light' onClick={()=>setToggle({add:true})}>Add Sesion</button>
                                </div>
                            </TabPanel>

                            <TabPanel key="materials" value="materials">

                            <div className="w-full flex flex-col gap-3">
                                
                            
                            </div>
                                <div className=' flex w-full place-content-center place-items-center pt-5'>
                                    <button className='bg-cards rounded-lg text-center px-5 py-2 text-black text-light' onClick={()=>setToggle({addmaterial:true})}>Add Material</button>
                                </div>
                            </TabPanel>
                        
                        </TabsBody>
                    </Tabs>
                    
                </div>
            </div>
            </div>
            {
                toggle.add ? <AddSession setToggle={setToggle} SingleCourse={SingleCourse.id} getCourse={getCourse}/> :toggle.addmaterial ? <AddMaterial setToggle={setToggle} SingleCourse={SingleCourse.id} getCourse={getCourse}/> : null
            }
        </div>
    </div>
  ) 
}
