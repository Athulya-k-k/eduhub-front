import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import pro from "../../images/avatar.jpg";
import instance from "../../utils/axios";
import { Toaster } from "react-hot-toast";
import Sidebar from "./Sidebar";

import { details } from "../../utils/axios";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

export default function SingleCourses() {
  const { id } = useParams();
  const course_id = useParams();
  const [SingleCourse, setSingleCourse] = useState({});
  const [Singleuser, setSingleuser] = useState({});

  useEffect(() => {
    getCourse();
  }, []);

  async function getCourse() {
    const response = await instance.get(`courses/singlecourse/${course_id.id}`);
    const user_response = await instance.get(
      `courses/singleuser/${course_id.id}`
    );

    setSingleCourse(response.data);
    setSingleuser(user_response.data);
  }

  return (
    <div className="h-full overflow-y-hidden w-full font-poppins flex">
      <Sidebar className="w-1/2 bg-blue-gray-900 border" />

      <div className="w-full flex flex-col items-center">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="w-full h-60 bg-none flex justify-center items-center">
          <div className="w-3/5 h-full flex flex-col gap-2 place-content-center text-center">
            <h2 className="text-2xl text-black font-bold truncate">
              {SingleCourse.title}
            </h2>
            <h2 className="text-base text-black font-normal truncate">
              {SingleCourse.subtitle}
            </h2>
          </div>
          <div className="shadow-xl bg-white rounded-xl right-4 top-4 h-32 px-1 py-2 w-32 flex-col flex gap-2 place-items-center">
            <div className="p-1 rounded-md w-full h-20">
              <video
                className="w-full h-full"
                src={details.base_url + SingleCourse.video}
                controls
              ></video>
            </div>
            <div className="flex gap-2 place-content-center">
              <p className="text-lg font-normal text-gray-600">
                {"₹ " + SingleCourse.price}
              </p>
            </div>
          </div>
        </div>
        <div className="w-3/5 px-5 py-3 flex flex-col items-center">
          <Tabs value="overview" className="w-full px-5">
            <TabsHeader
              className="bg-transparent"
              indicatorProps={{
                className: "bg-blue-500/10 shadow-none text-blue-500",
              }}
            >
              <Tab
                key="overview"
                value="overview"
                className="font-semibold py-2"
              >
                Overview
              </Tab>
              <Tab
                key="curriculum"
                value="curriculum"
                className="font-semibold py-2"
              >
                Curriculum
              </Tab>
              <Tab
                key="instructor"
                value="instructor"
                className="font-semibold py-2"
              >
                Instructor
              </Tab>
              <Tab
                key="reviews"
                value="reviews"
                className="font-semibold py-2"
              >
                Reviews
              </Tab>
            </TabsHeader>

            <TabsBody>
              <TabPanel key="Overview" value="overview">
                <div className="flex bg-gray-100 px-5 pt-3 pb-5 rounded-xl flex-col gap-3">
                  <h1 className="text-lg font-semibold text-black">
                    Course Description
                  </h1>
                  <p className="text-gray-700">{SingleCourse.description}</p>
                </div>
              </TabPanel>

              <TabPanel key="curriculum" value="curriculum"></TabPanel>
              <TabPanel key="instructor" value="instructor">
                <div className="w-full rounded-xl bg-gray-100 p-5">
                  <div className="flex items-center">
                    <div className="w-12 h-12">
                      <img
                        className="w-full h-full rounded-full"
                        src={pro}
                        alt="tutor_profile"
                      />
                    </div>
                    <div className="flex flex-col gap-2 ml-3">
                      <h1 className="text-base font-poppins font-semibold text-black">
                        {Singleuser ? Singleuser.username : null}
                      </h1>
                    </div>
                  </div>
                  <p className="text-base text-gray-600 pt-3">
                    2+ Years of Experience | Python-Django Full Stack Developer | Specialized in React Js
                  </p>
                </div>
              </TabPanel>
              <TabPanel key="reviews" value="reviews">
                <div className="w-full h-96"></div>
              </TabPanel>
            </TabsBody>
          </Tabs>
          <div style={{ marginTop: "10px" }}>
  <h4 style={{ marginBottom: "6px" }}>Username: {Singleuser.username}</h4>
  <p style={{ marginBottom: "6px" }}>Email: {Singleuser.email}</p>

  <div style={{ display: "flex" }}>
    <p style={{ marginBottom: "6px" }}>Staff Status: </p>
    {Singleuser.is_staff ? (
      <p className="approved">Active</p>
    ) : (
      <p className="pending">Blocked</p>
    )}
  </div>
</div>

        </div>
      </div>
    </div>
  );
}
