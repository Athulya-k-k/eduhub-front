import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../../utils/axios'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import { Tabs, TabsHeader, Accordion, AccordionBody, AccordionHeader, Tab, TabPanel, TabsBody } from '@material-tailwind/react'
import ReactPlayer from 'react-player'
import { MdOndemandVideo } from 'react-icons/md'
import { AiOutlineBulb } from 'react-icons/ai'
import { HiDocumentDuplicate } from 'react-icons/hi'
import { details } from '../../../utils/axios'
import {RiVideoFill} from 'react-icons/ri'

import jwtDecode from 'jwt-decode';
import { getLocal } from '../../../helpers/auth';



export default function Courseattend() {
    const course_id = useParams()
    const [singlecourse,setSinglecourse] = useState({})
    const [Sessions, setSessions] = useState([])
    const [Lecture, setLecture] = useState([])
    const [video,setVideo] = useState('')
    const [reviews,Setreviews] = useState([])
    const [Progress,SetProgress] = useState('')
    const user_auth = getLocal('authToken');
    const [current,setCurrent] = useState({})


    let user_name;
    if(user_auth){
        user_name = jwtDecode(user_auth)
    }

    useEffect(() => {
        getCourse();
    }, [])

    async function getCourse() {
        // const initial = lecture_response.data?.find(item=>item.type==="lecture")
        const response = await axios.get(`${BASE_URL}courses/singlecourse/${course_id.id}`)
        const session_response = await axios.get(`${BASE_URL}csession/session/${course_id.id}`)
        const lecture_response = await axios.get(`${BASE_URL}csession/lectures/${course_id.id}`)
        console.log(lecture_response)
        

        const progress_response = await axios.get(`${BASE_URL}learning/progress/${course_id.id}/${user_name.user_id}`)

        const getprogress = await axios.get(`${BASE_URL}learning/getprogress/${course_id.id}/${user_name.user_id}`)
        SetProgress(getprogress.data)

        const review_response = await axios.get(`${BASE_URL}learning/getreview/${course_id.id}`)
        Setreviews(review_response.data)

        const current_lect = progress_response.data?.find(item=>item.is_active)
        setCurrent(current_lect?.lecture)
        console.log(current_lect?.lecture)

        const initial = progress_response.data?.find(item=>item.is_active && item.lecture.type==="lecture")
        setVideo(initial?.lecture?.material)

        setLecture(lecture_response.data)
        setSessions(session_response.data)
        setSinglecourse(response.data)

    }

    const [open, setOpen] = useState(0);

    
    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    }

    const [contOpen, setContOpen] = useState(0);
    
    const handleContOpen = (value) => {
        setContOpen(contOpen === value ? 0 : value);
    }


    async function handleVideoEnded(){
        const progress = await axios.get(`${BASE_URL}learning/progressupdate/${course_id.id}/${user_name.user_id}`)
        console.log(progress.data)
        getCourse();
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
    <div className='w-full min-h-screen'>
      <div className='flex flex-col p-5'>
        <div className='w-full h-40 rounded-xl flex flex-col shadow-xl overflow-hidden bg-white'>
          <div className=' place-content-between flex'>
              <p className=' text-black ml-5 text-xl font-bold mt-2'>{singlecourse?.title}</p>
              <AiOutlineCloseCircle size={20} className=' mr-5 mt-3'></AiOutlineCloseCircle>
          </div>
        
       
        </div>
      </div>
      <div className="w-full flex gap-2 h-full ">
                    <div className="w-3/4 ml-2 flex flex-col">
                      <ReactPlayer width="1080px" height="960px" url={details.base_url+video}  controls={true} config={{
                        file: {
                          attributes: {
                              controlsList: 'nodownload'
                          }
                        }
                      }}
                      onEnded={handleVideoEnded}
                      loop={false}
                      />
                      <div className='flex pr-4 w-full h-full'>
                        
                          <div className="w-full flex gap-3">

                              <Tabs value="overview" className="w-full h-auto mr-4">
                                  <TabsHeader
                                      className="bg-transparent"
                                      indicatorProps={{
                                          className: "bg-blue-500/10 shadow-none text-blue-500",
                                      }}

                                  >

                                      <Tab key="overview" value="overview" className=' font-normal font-poppins py-3'>
                                          Overview
                                      </Tab>
                                      
                                      <Tab key="instructor" value="instructor" className='font-normal font-poppins py-3'>
                                          Instructor
                                      </Tab>
                                    

                                  </TabsHeader>
                                  <TabsBody>

                                      <TabPanel key="overview" value="overview">
                                          <div className="w-full shadow-lg p-5  h-36 rounded-xl">
                                              <h1 className='text-xl font-semibold text-black font-poppins'>Course Description</h1>
                                              <p className='text-gray-700'>{singlecourse?.description}</p>
                                          </div>
                                      </TabPanel>

                                      <TabPanel key="curriculum" value="curriculum">
                                        
                                      </TabPanel>
                                      <TabPanel key="instructor" value="instructor">
                                          <div className="w-full shadow-lg p-5  h-36 rounded-xl">
                                              <div className="flex gap-2 place-items-center">
                                                  <div className="w-20">
                                                      <img className='w-14 h-14' src= '/avatar.png'  alt="tutor_profile"/>
                                                  </div>
                                                  <div className="flex flex-col gap-3 place-content-start">
                                                      <h1 className='flex gap-3 font-poppins text-xl font-semibold text-black'>{singlecourse?.user?.first_name} {singlecourse?.user?.last_name}</h1>
                                                  </div>
                                              </div>
                                              <div className="p-5">
                                                  <p className='text-sm text-gray-600 '>Helloooooooooooooooo welcome </p>
                                              </div>
                                              
                                          </div>
                                      </TabPanel>
                                      <TabPanel key="notes" value="notes">
                                          <div className="w-full h-96">
                                              
                                          </div>

                                      </TabPanel>
                                      <TabPanel key="announcements" value="announcements">
                                          <div className="w-full h-96">
                                              
                                          </div>

                                      </TabPanel>
                                   

                                  </TabsBody>
                              </Tabs>


                          </div>
                        </div>

                    </div>




                    <div className="w-1/4 flex rounded-lg flex-col bg-white mr-5 shadow-xl absolute right-0  place-items-center h-full">

                        <h2 className='text-xl font-semibold text-center p-3'>Course Content</h2>
                        <div className="w-full bg-white flex flex-col gap-3 ">
                        {
                                    
                          Sessions?.map((Session,index)=>(
                              
                              <Accordion open={open === index} icon={<Icon id={index} open={open} />} className=' rounded-xl px-5'>
                                  <AccordionHeader onClick={() => handleOpen(index)} className='text-lg font-semibold font-poppins capitalize tracking-wider'>
                                      {Session.title}
                                  </AccordionHeader>
                                  <AccordionBody>
                                      <div className='flex flex-col gap-4'>
                                      {
                                          Lecture?.map((Lecture,index)=>(
                                          
                                              Lecture?.session===Session?.id &&
                                              <Accordion open={contOpen === index}>
                                                  <AccordionHeader onClick={() => handleContOpen(index)} className='text-md font-semibold flex place-items-center gap-1 capitalize font-poppins'>
                                                      <h2 className='flex gap-3 place-items-center text-start'>{ Lecture.type==="Lecture" ? <MdOndemandVideo size={20}></MdOndemandVideo> : Lecture.type==="Quiz" ? <AiOutlineBulb size={20}></AiOutlineBulb> : <HiDocumentDuplicate size={20}></HiDocumentDuplicate> } {Lecture.title}<span className='border-l-2 border-primary px-1'>{Lecture.type}</span></h2>
                                                  </AccordionHeader>
                                                  <AccordionBody className="font-poppins">
                                                      {Lecture.description}
                                                     
                                                      {
                                                      Lecture.type ==="lecture" ?
                                                      <div className='w-full p-3 flex gap-3 place-items-center' onClick={() =>setVideo(Lecture?.material)}>
                                                          <RiVideoFill size={20}></RiVideoFill>
                                                          <p>Watch</p>
                                                      </div>
                                                      :
                                                      <div className='w-full p-3 flex gap-3 place-items-center'>
                                                          <HiDocumentDuplicate size={20}></HiDocumentDuplicate>
                                                          <a className='text-black font-semibold font-poppins text-md' href={details.base_url+Lecture?.material} onClick={handleVideoEnded} rel='noreferrer' target="_blank">Watch</a>
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
                </div>
        </div>
    </div>
  )
}
