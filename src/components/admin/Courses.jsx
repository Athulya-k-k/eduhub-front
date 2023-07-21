import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import instance from "../../utils/axios";
import Pagination from "../Pagination";
import { Link } from "react-router-dom";
import { AiFillEye } from 'react-icons/ai';
import Switch from "react-switch";


function Course() {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(2);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      const response = await instance.get("courses/course/");
      setCourses(response.data);
    } catch (error) {
      toast.error("Failed to fetch courses");
    }
  };

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentCourses = courses.slice(firstPostIndex, lastPostIndex);

  const handleChange = (id) => {
    instance.get(`courses/blockcourse/${id}`).then(() => getCourses());
  };

  async function handleSearch(keyword) {
    const response = await instance.get(
      `courses/adminsearchcourse/?search=${keyword}`
    );
    setCourses(response.data);
  }

  const options = [
    { value: 0, label: "All" },
    { value: 1, label: "Approved" },
    { value: 2, label: "Pending" },
  ];

  const handleFilter = async (option) => {
    const response = await instance.get(
      `courses/adminfiltercourse/${option.value}`
    );
    setCourses(response.data);
  };

  return (
    <div className="flex h-full bg-acontent">
      <Sidebar />

      <div className="px-5 w-full h-auto min-h-screen mx-5 mt-2 py-8 font-poppins flex flex-col place-content-start place-items-center bg-white shadow-xl rounded-xl">
        <div className="w-full h-screen px-3 font-poppins">
          <div className="w-full p-5">
            <input
              type="text"
              placeholder="Search by name or email"
              className="border-b-2 border-primaryBlue focus:outline-none px-2 w-full"
            />
          </div>
          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 font-large text-gray-900">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-4 font-large text-gray-900">
                    Course Image
                  </th>
                  <th scope="col" className="px-6 py-4 font-large text-gray-900">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-4 font-large text-gray-900">
                    Short Description
                  </th>
                  <th scope="col" className="px-6 py-4 font-large text-gray-900">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-4 font-large text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                {currentCourses.map((course) => (
                  <tr className="hover:bg-gray-50" key={course.id}>
                    <td className="px-6 py-4">
                      <p>{course.title}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p>
                        <img className="w-full h-full" src={course.image} alt={course.title} />
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p>{course.description}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p>{course.subtitle}</p>
                    </td>

                    {course.is_approved ? (
                      <td className="approved">Approved</td>
                    ) : course.is_rejected ? (
                      <td className="pending">Rejected</td>
                    ) : (
                      <td className="pending">Pending</td>
                    )}
                    <td className="action-col">
            
                    
                      <Link className='action-text' to={`/detailedcourse/${course?.id}`} ><p className='edit'><AiFillEye /> View</p></Link>
                      <Switch
    onChange={() => handleChange(course.id)}
    checked={course.is_approved}
    onColor="#86d3ff"
    onHandleColor="#2693e6"
    offColor="#ccc"
    offHandleColor="#fff"
    height={24}
    width={48}
    checkedIcon={false}
    uncheckedIcon={false}
  />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            totalPosts={courses.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default Course;
