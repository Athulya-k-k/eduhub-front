import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import instance, { BASE_URL } from '../../../utils/axios'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import { Tabs, TabsHeader, Accordion, AccordionBody, AccordionHeader, Tab, TabPanel, TabsBody } from '@material-tailwind/react'
import ReactPlayer from 'react-player'
import { MdOndemandVideo } from 'react-icons/md'
import { AiOutlineBulb } from 'react-icons/ai'
import { HiDocumentDuplicate } from 'react-icons/hi'
import { details } from '../../../utils/axios'
import {RiVideoFill} from 'react-icons/ri'
import Rating from './Rating'
import jwtDecode from 'jwt-decode';
import { getLocal } from '../../../helpers/auth';


export default function Courseattend() {
  const course_id = useParams();
  const [singlecourse, setSinglecourse] = useState({});
  const [sessions, setSessions] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [video, setVideo] = useState('');
  const [reviews, setReviews] = useState([]);
  const [progress, setProgress] = useState('');
  const [current, setCurrent] = useState({});
  const [open, setOpen] = useState(0);
  const [contOpen, setContOpen] = useState(0);
  const user_auth = getLocal('authToken');

  let user_name;
  if(user_auth){
      user_name = jwtDecode(user_auth)
  }


  useEffect(() => {
    getCourse();
  }, []);

  async function getCourse() {
    // Fetch course data
    const response = await fetch(`courses/singlecourse/${course_id.id}`);
    const courseData = await response.json();
    setSinglecourse(courseData);

    // Fetch progress data
    const progressResponse = await fetch(`learning/progress/${course_id.id}/${user_name.user_id}`);
    const progressData = await progressResponse.json();
    const currentLect = progressData.find(item => item.is_active);
    setCurrent(currentLect?.lecture);

    // Fetch reviews data
    const reviewResponse = await fetch(`learning/getreview/${course_id.id}`);
    const reviewData = await reviewResponse.json();
    setReviews(reviewData);

    // Set initial video
    const initialLecture = progressData.find(item => item.is_active && item.lecture.type === 'lecture');
    setVideo(initialLecture?.lecture?.material);
  }

  const handleOpen = value => {
    setOpen(open === value ? 0 : value);
  };

  const handleContOpen = value => {
    setContOpen(contOpen === value ? 0 : value);
  };

  async function handleVideoEnded() {
    const progress = await axios.get(`learning/progressupdate/${course_id.id}/${user_name.user_id}`);
    console.log(progress.data);
    getCourse();
  }

  const Icon = ({ id, open }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${id === open ? 'rotate-180' : ''} h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );

  return (
    <div className="w-full min-h-screen">
      <div className="flex flex-col p-5">
        {/* Course Header */}
        <div className="w-full h-40 rounded-xl flex flex-col shadow-xl overflow-hidden bg-white">
          {/* Course Title and Close Button */}
          <div className="flex justify-between">
            <p className="text-black ml-5 text-xl font-bold mt-2">{singlecourse?.title}</p>
            <AiOutlineCloseCircle size={20} className="mr-5 mt-3" />
          </div>
          {/* Course Progress */}
          <div className="ml-5 mt-3">
            <p className="text-md font-semibold">Completed: {progress}%</p>
          </div>
          {/* Current Lecture */}
          <div className="ml-5 mt-5 flex flex-col">
            <p className="text-md font-semibold">
              Current Lecture: {current?.title}, {current?.type}
            </p>
            <p className="text-md font-semibold mt-1">
              Please complete the lecture/note to move to the next tutorial...
            </p>
          </div>
        </div>
      </div>

      {/* Video Player and Course Content */}
      <div className="w-full flex gap-2 h-full">
        {/* Video Player */}
        <div className="w-3/4 ml-2 flex flex-col">
          <ReactPlayer
            width="1080px"
            height="960px"
            url={details.base_url + video}
            controls={true}
            config={{
              file: {
                attributes: {
                  controlsList: 'nodownload',
                },
              },
            }}
            onEnded={handleVideoEnded}
            loop={false}
          />
          {/* Tabs */}
          <div className="flex pr-4 w-full h-full">
            <div className="w-full flex gap-3">
              <Tabs value="overview" className="w-full h-auto mr-4">
                {/* Tabs Header */}
                <TabsHeader className="bg-transparent" indicatorProps={{ className: 'bg-blue-500/10 shadow-none text-blue-500' }}>
                  <Tab key="overview" value="overview" className="font-normal font-poppins py-3">
                    Overview
                  </Tab>
                  <Tab key="curriculum" value="curriculum" className="font-normal font-poppins py-3">
                    Curriculum
                  </Tab>
                  <Tab key="instructor" value="instructor" className="font-normal font-poppins py-3">
                    Instructor
                  </Tab>
                  <Tab key="reviews" value="reviews" className="font-normal font-poppins py-3">
                    Reviews
                  </Tab>
                </TabsHeader>

                {/* Tabs Body */}
                <TabsBody>
                  <TabPanel key="overview" value="overview">
                    {/* Course Description */}
                    <div className="w-full shadow-lg p-5 h-36 rounded-xl">
                      <h1 className="text-xl font-semibold text-black font-poppins">Course Description</h1>
                      <p className="text-gray-700">{singlecourse?.description}</p>
                    </div>
                  </TabPanel>

                  <TabPanel key="curriculum" value="curriculum">
                    {/* Course Curriculum */}
                    <div className="w-full shadow-lg p-5 h-auto rounded-xl">
                      {sessions.map(session => (
                        <Accordion key={session.id} open={open === session.id} icon={<Icon id={session.id} open={open} />} className="rounded-xl px-5">
                          <AccordionHeader onClick={() => handleOpen(session.id)} className="text-lg font-semibold font-poppins capitalize tracking-wider">
                            {session.title}
                          </AccordionHeader>
                          <AccordionBody>
                            <div className="flex flex-col gap-4">
                              {lectures
                                .filter(lecture => lecture.session === session.id)
                                .map(lecture => (
                                  <Accordion key={lecture.id} open={contOpen === lecture.id}>
                                    <AccordionHeader onClick={() => handleContOpen(lecture.id)} className="text-md font-semibold flex place-items-center gap-1 capitalize font-poppins">
                                      <h2 className="flex gap-3 place-items-center text-start">
                                        {lecture.type === 'lecture' ? (
                                          <MdOndemandVideo size={20} />
                                        ) : lecture.type === 'quiz' ? (
                                          <AiOutlineBulb size={20} />
                                        ) : (
                                          <HiDocumentDuplicate size={20} />
                                        )}{' '}
                                        {lecture.title}
                                        <span className="border-l-2 border-primary px-1">{lecture.type}</span>
                                      </h2>
                                    </AccordionHeader>
                                    <AccordionBody className="font-poppins">
                                      {lecture.description}
                                      {lecture.type === 'lecture' ? (
                                        <div className="w-full p-3 flex gap-3 place-items-center" onClick={() => setVideo(lecture.material)}>
                                          <RiVideoFill size={20} />
                                          <p>Watch</p>
                                        </div>
                                      ) : (
                                        <div className="w-full p-3 flex gap-3 place-items-center">
                                          <HiDocumentDuplicate size={20} />
                                          <a className="text-black font-semibold font-poppins text-md" href={details + lecture.material} rel="noreferrer" target="_blank">
                                            Watch
                                          </a>
                                        </div>
                                      )}
                                    </AccordionBody>
                                  </Accordion>
                                ))}
                            </div>
                          </AccordionBody>
                        </Accordion>
                      ))}
                    </div>
                  </TabPanel>

                  <TabPanel key="instructor" value="instructor">
                    {/* Instructor Details */}
                    <div className="w-full shadow-lg p-5 h-36 rounded-xl">
                      <div className="flex gap-2 place-items-center">
                        <div className="w-20">
                          <img className="w-14 h-14" src="/avatar.png" alt="tutor_profile" />
                        </div>
                        <div className="flex flex-col gap-3 place-content-start">
                          <h1 className="flex gap-3 font-poppins text-xl font-semibold text-black">
                            {singlecourse?.user?.first_name} {singlecourse?.user?.last_name}
                          </h1>
                        </div>
                      </div>
                      <div className="p-5">
                        <p className="text-sm text-gray-600">2+ Years Experience Python-Django Full-stack developer with a high specialization in React Js</p>
                      </div>
                    </div>
                  </TabPanel>

                  <TabPanel key="reviews" value="reviews">
                    {/* Course Reviews */}
                    <div className="w-full flex flex-col shadow-lg p-5 h-auto rounded-xl">
                      <Rating />
                      {reviews.length === 0 ? (
                        <div className="w-full place-content-center place-items-center flex mt-4">
                          <h3 className="text-black font-semibold text-xl">No reviews to show</h3>
                        </div>
                      ) : (
                        reviews.map(review => (
                          <div key={review.id} className="w-full rounded-xl mb-5 shadow-xl bg-white h-32">
                            <div className="m-5 flex flex-row gap-5">
                              <img className="w-14 rounded-xl" src="/avatar1.avif" alt="User Profile" />
                              <p className="font-bold mt-4">{review.user.username}</p>
                              <p className="font-bold mt-4">{review.rating}/5</p>
                            </div>
                            <div className="m-5">
                              <p>{review.discription}</p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </TabPanel>
                </TabsBody>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-1/4 flex rounded-lg flex-col bg-white mr-5 shadow-xl absolute right-0 place-items-center h-full">
          <h2 className="text-xl font-semibold text-center p-3">Course Content</h2>
          <div className="w-full bg-white flex flex-col gap-3">
            {sessions.map(session => (
              <Accordion key={session.id} open={open === session.id} icon={<Icon id={session.id} open={open} />} className="rounded-xl px-5">
                <AccordionHeader onClick={() => handleOpen(session.id)} className="text-lg font-semibold font-poppins capitalize tracking-wider">
                  {session.title}
                </AccordionHeader>
                <AccordionBody>
                  <div className="flex flex-col gap-4">
                    {lectures
                      .filter(lecture => lecture.session === session.id)
                      .map(lecture => (
                        <Accordion key={lecture.id} open={contOpen === lecture.id}>
                          <AccordionHeader onClick={() => handleContOpen(lecture.id)} className="text-md font-semibold flex place-items-center gap-1 capitalize font-poppins">
                            <h2 className="flex gap-3 place-items-center text-start">
                              {lecture.type === 'lecture' ? (
                                <MdOndemandVideo size={20} />
                              ) : lecture.type === 'quiz' ? (
                                <AiOutlineBulb size={20} />
                              ) : (
                                <HiDocumentDuplicate size={20} />
                              )}{' '}
                              {lecture.title}
                              <span className="border-l-2 border-primary px-1">{lecture.type}</span>
                            </h2>
                          </AccordionHeader>
                          <AccordionBody className="font-poppins">
                            {lecture.description}
                            {lecture.type === 'lecture' ? (
                              <div className="w-full p-3 flex gap-3 place-items-center" onClick={() => setVideo(lecture.material)}>
                                <RiVideoFill size={20} />
                                <p>Watch</p>
                              </div>
                            ) : (
                              <div className="w-full p-3 flex gap-3 place-items-center">
                                <HiDocumentDuplicate size={20} />
                                <a className="text-black font-semibold font-poppins text-md" href={details + lecture.material} rel="noreferrer" target="_blank">
                                  Watch
                                </a>
                              </div>
                            )}
                          </AccordionBody>
                        </Accordion>
                      ))}
                  </div>
                </AccordionBody>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
