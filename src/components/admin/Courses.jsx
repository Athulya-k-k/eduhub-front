import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import instance, { BASE_URL } from '../../utils/axios';
import Pagination from '../Pagination';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

function Course() {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(2);
  
  const [open, setOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
 
  const handleOpen = (id) => {
    setSelectedCourseId(id);
    setOpen(true);
  };

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      const response = await instance.get('courses/course/');
      setCourses(response.data);
    } catch (error) {
      toast.error('Failed to fetch courses');
    }
  };

  const deleteCourse = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}courses/delete-course/${id}`);
      getCourses();
      toast.success('Course deleted successfully');
      handleClose();
    } catch (error) {
      toast.error('Failed to delete the course');
    }
  };

  const handleClose = () => {
    setSelectedCourseId(null);
    setOpen(false);
  };

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentCourses = courses.slice(firstPostIndex, lastPostIndex);

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
                        <img src={course.image} alt={course.title} />
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p>{course.description}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p>{course.subtitle}</p>
                    </td>
                    <td className="px-6 py-4">
                      <Button  onClick={() => handleOpen(course.id)} variant="gradient">
                        Delete
                      </Button>
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

      <Dialog open={open} onClose={handleClose}>
        <DialogHeader>Confirmation</DialogHeader>
        <DialogBody divider>
          Are you sure you want to delete this course?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleClose}
            className="mr-1"
          >
            Cancel
          </Button>
          <Button variant="gradient" color="green" onClick={() => deleteCourse(selectedCourseId)}>
            Confirm
          </Button>
        </DialogFooter>
      </Dialog>

      <ToastContainer position="top-center" />
    </div>
  );
}

export default Course;
