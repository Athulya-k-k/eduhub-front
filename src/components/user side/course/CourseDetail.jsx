import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import instance from '../../../utils/axios';
import { Toaster, toast } from 'react-hot-toast';
import NavBar from '../navbar/Navbar';
import { BsBook, BsClockHistory } from 'react-icons/bs';
import { MdOutlineComputer } from 'react-icons/md';
import { details } from '../../../utils/axios';
import { MdOndemandVideo } from 'react-icons/md';
import { AiOutlineBulb, AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { HiDocumentDuplicate } from 'react-icons/hi';
import jwtDecode from 'jwt-decode';
import { getLocal } from '../../../helpers/auth';
import { useNavigate } from 'react-router-dom';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react';

export default function SingleCourse() {
  const navigate = useNavigate();
  const course_id = useParams();
  const [SingleCourse, setSingleCourse] = useState({});
  const [Singleuser, setSingleuser] = useState({});
  const [Sessions, setSessions] = useState([]);
  const [Lecture, setLecture] = useState([]);
  const [Cart, setCart] = useState(false);
  const [Active, setActive] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [Review, setReview] = useState([]);

  useEffect(() => {
    getCourse();
  }, []);

  const user_auth = getLocal('authToken');
  let user_name;
  if (user_auth) {
    user_name = jwtDecode(user_auth);
    const user = user_name.id;
  }

  function goTocart() {
    navigate('/cart');
  }

  async function getCourse() {
    const response = await instance.get(`courses/singlecourse/${course_id.id}`);
    const user_response = await instance.get(`courses/singleuser/${course_id.id}`);
    const review_response = await instance.get(`learning/getreview/${course_id.id}`);

    setReview(review_response.data);
    setSingleCourse(response.data);
    setSingleuser(user_response.data);

    if (user_name) {
      const cart_response = await instance.get(`cart/carts/${user_name.user_id}`);
      const course_response = await instance.get(`courses/mycourse/${user_name.user_id}`);
      const is_enrolled = course_response.data.find(item => item?.course.id === response.data?.id);
      const is_cart = cart_response.data.find(item => item?.course === response.data?.id);
      setActive(is_cart);
      setCart(true);
      setEnrolled(is_enrolled);
    }
  }

  const [open, setOpen] = useState(0);

  const handleOpen = value => {
    setOpen(open === value ? 0 : value);
  };

  const [contOpen, setContOpen] = useState(0);

  const handleContOpen = value => {
    setContOpen(contOpen === value ? 0 : value);
  };

  function Icon({ id, open }) {
    return (
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
  }

  const addCart = async (e, user, course, price) => {
    e.preventDefault();

    const res = await instance({
      method: 'post',
      url: `cart/addcart/`,
      data: { user, course, price },
    });
    console.log(res);
    if (res.status === 200) {
      toast.success('Added To cart');
      getCourse();
    } else {
      toast.error(res.statusText);
    }
  };

  return (
    <div className="h-full w-full font-poppins">
      <Toaster position="top-center" reverseOrder="false"></Toaster>
      <div className="w-full h-80 bg-white">
        <NavBar />
        <div className="w-full h-full py-5  flex  place-content-start px-14">
          <div className="w-3/5 h-full pt-5 flex flex-col gap-5  place-content-start">
            <h2 className="text-4xl text-black font-bold ">{SingleCourse.title}</h2>
            <h2 className="text-xl text-black font-normal ">{SingleCourse.subtitle}</h2>
          </div>
          <div className="shadow-xl bg-white absolute rounded-xl right-36 h-auto px-1 py-8 w-80 flex-col flex gap-8 place-items-center">
            <div className="p-3 rounded-md w-full h-60">
              <video className="w-full h-full" src={details.base_url + SingleCourse.video} controls></video>
            </div>
            <div className="flex gap-3 place-content-center">
              <p className="text-3xl font-normal  text-gray-600">{"₹ " + SingleCourse.price}</p>
            </div>
            {user_name ? (
              enrolled ? (
                <div className="w-full px-3 flex place-content-center">
                  <button className="text-black px-5 py-3 w-full bg-bgcart">Continue Learning</button>
                </div>
              ) : Active && Cart ? (
                <div className="w-full px-3 flex place-content-center">
                  <button className="text-black px-5 py-3 w-full bg-bgcart" onClick={() => goTocart()}>
                    Go to cart
                  </button>
                </div>
              ) : (
                <div className="w-full px-3 flex place-content-center">
                  <button
                    className="text-black px-5 py-3 w-full bg-bgcart"
                    onClick={e => addCart(e, user_name.user_id, SingleCourse.id, SingleCourse.price)}
                  >
                    Add To Cart
                  </button>
                </div>
              )
            ) : (
              <div className="w-full px-3 flex place-content-center">
                <Link to="/login" className="text-black px-5 py-3 w-full bg-bgcart">
                  Log in to Add To Cart
                </Link>
              </div>
            )}
            <div className="w-full px-3 flex flex-col gap-3">
              <h2 className="text-xl font-semibold ">This course includes</h2>
              <li className="text-gray-600 font-normal list-none flex gap-3 place-items-center">
                <BsBook size={20} className="text-green-500" />
                Language - English
              </li>
              <li className="text-gray-600 font-normal list-none flex gap-3 place-items-center">
                <MdOutlineComputer size={20} className="text-green-500" />
                Use on desktop, mobile, and laptop
              </li>
              <li className="text-gray-600 font-normal list-none flex gap-3 place-items-center">
                <BsClockHistory size={20} className="text-green-500" />
                Lifetime Access
              </li>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full h-full">
        <div className="w-3/5 px-5 py-10 flex flex-col place-items-center">
          <Tabs value="overview" className="w-full px-10">
            <TabsHeader
              className="bg-transparent"
              indicatorProps={{
                className: 'bg-blue-500/10 shadow-none text-blue-500',
              }}
            >
              <Tab key="overview" value="overview" className="font-semibold py-3">
                Overview
              </Tab>
           
              <Tab key="instructor" value="instructor" className="font-semibold py-3">
                Instructor
              </Tab>
             
            </TabsHeader>
            <TabsBody>
              <TabPanel key="Overview" value="overview">
                <div className="flex bg-gray-100 px-5 pt-3 pb-5 rounded-xl flex-col gap-3">
                  <h1 className="text-xl font-semibold text-black">Course Description</h1>
                  <p className="text-gray-700">{SingleCourse.description}</p>
                </div>
              </TabPanel>

              <TabPanel key="curriculum" value="curriculum">
                <div className="w-full flex flex-col gap-3">
                  {Sessions?.map((Session, index) => (
                    <Accordion open={open === index} icon={<Icon id={index} open={open} />} className="bg-gray-100 rounded-xl px-5" key={Session.id}>
                      <AccordionHeader onClick={() => handleOpen(index)} className="text-lg font-semibold font-poppins capitalize tracking-wider">
                        {Session.title}
                      </AccordionHeader>
                      <AccordionBody>
                        <div className="flex flex-col gap-4">
                          <p className="text-gray-600 font-light text-md font-poppins">{Session.description}</p>

                          {Lecture?.map((Lecture, index) =>
                            Lecture?.session === Session?.id ? (
                              <Accordion open={contOpen === index} key={Lecture.id}>
                                <AccordionHeader onClick={() => handleContOpen(index)} className="text-md font-semibold flex place-items-center gap-1 capitalize font-poppins">
                                  <h2 className="flex gap-3 place-items-center text-start">
                                    {Lecture.type === 'Lecture' ? (
                                      <MdOndemandVideo size={20} />
                                    ) : Lecture.type === 'quiz' ? (
                                      <AiOutlineBulb size={20} />
                                    ) : (
                                      <HiDocumentDuplicate size={20} />
                                    )}{' '}
                                    {Lecture.title} <span className="border-l-2 border-primary px-1">{Lecture.type}</span>
                                  </h2>
                                </AccordionHeader>
                                <AccordionBody className="font-poppins">{Lecture.description}</AccordionBody>
                              </Accordion>
                            ) : null
                          )}
                        </div>
                      </AccordionBody>
                    </Accordion>
                  ))}
                </div>
              </TabPanel>
              <TabPanel key="instructor" value="instructor">
                <div className="w-full rounded-xl bg-gray-100 p-5">
                  <div className="flex place-items-center">
                    <div className="w-20">
                      <img className="w-14 h-14 rounded-3xl" src="/avatar1.avif" alt="tutor_profile" />
                    </div>
                    <div className="flex flex-col gap-3 place-content-start">
                      <h1 className="flex gap-3 font-poppins text-xl font-semibold text-black">
                        {Singleuser ? Singleuser.username : null}
                      </h1>
                    </div>
                  </div>
                  <p className="text-lg text-gray-600 pt-3">2+ Year Experience Python-Django Full-stack developer with high specialization in React Js</p>
                </div>
              </TabPanel>
             
            </TabsBody>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
