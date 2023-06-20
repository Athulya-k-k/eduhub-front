import React from "react";
import Sidebar from "./Sidebar";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import instance from "../../utils/axios";
import axios from 'axios';
import {ToastContainer,toast } from 'react-toastify';
import { BASE_URL } from '../../utils/axios';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

function Categories() {
    const [category, setCategory] = useState([]);
   

//   useEffect(() => {
//     async function getCategory() {
//       const response = await instance.get('courses/category/');
//       setCategory(response.data);
//     }
//     getCategory();
//   }, []);



const [open, setOpen] = useState(false);
const [selectedCategoryName, setSelectedCategoryName] = useState(null);

const handleOpen = (id) => {
  setSelectedCategoryName(id);
  setOpen(true);
};

useEffect(() => {
  getCategory();
}, []);

const getCategory = async () => {
  try {
    const response = await instance.get('courses/category/');
    setCategory(response.data);
  } catch (error) {
    toast.error('Failed to fetch cat');
  }
};
console.log(category);


const handleEdit = (course) => {
    setSelectedCourseId(course.id);
    setEditMode(true);
    setEditedCourse({
      ...course,
      category: course.category.id, // Extract the ID from the category object
    });
    setOpen(true);
  };



const updateCourse = async (id, formData) => {
    try {
      const response = await axios.put(
        `${BASE_URL}courses/update-course/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      getCategory();
      toast.success("Course updated successfully");
      handleClose();
    } catch (error) {
      toast.error("Failed to update the course");
    }
  };



const deleteCategory = async (id) => {
  console.log(id);
  try {

    const response = await axios.delete(`${BASE_URL}courses/delete-category/${id}`);
    getCategory();
    toast.success('Course deleted successfully');
    handleClose();
  } catch (error) {
    toast.error('Failed to delete the course');
  }
};

const handleClose = () => {
  setSelectedCategoryName(null);
  setOpen(false);
};

 
  
 
  return (
    <div className="flex h-full bg-acontent">
      <Sidebar />
      <div className="px-5 w-full h-auto min-h-screen mx-5 mt-2  py-8 font-poppins flex flex-col place-content-start place-items-center bg-white shadow-xl rounded-xl">
        <div className="w-full h-screen px-3 font-poppins">
          <Toaster position="top-center" reverseOrder="false"></Toaster>
         
          <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
            <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-4 font-large text-gray-900">
                    Name
                  </th>
                  <th scope="col" class="px-6 py-4 font-large text-gray-900">
                    course image
                  </th>

                  <th scope="col" class="px-6 py-4 font-large text-gray-900">
                    description
                  </th>
                  <th scope="col" className="px-6 py-4 font-large text-gray-900">
                    Actions
                  </th>
                 
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 border-t border-gray-100">
                {category.map((category) => (
                  <tr class="hover:bg-gray-50" key={category.id}>
                    <td class="px-6 py-4">
                      <p>{category.name}</p>
                    </td>
                    <td class="px-6 py-4">
                      <p>
                        <img className="w-4/5 h-24" src={category.image} />
                      </p>
                    </td>

                     { <td class="px-6 py-4">
                      <p>{category.description}</p>
                    </td> }

                    <td class="px-6 py-4">
                      <p>{category.subtitle}</p>
                    </td> 
                    <td className="px-6 py-4">
                      <Button  onClick={() => handleOpen(category.id)} variant="gradient">
                        Delete
                      </Button>
                      <Button 
                        onClick={() => handleEdit(category)}
                       
                        className="ml-2 bg-green-400"
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
          <Button variant="gradient" color="green" onClick={() => deleteCategory(selectedCategoryName)}>
            Confirm
          </Button>
        </DialogFooter>
      </Dialog>

      <ToastContainer position="top-center" />
    </div>
  );
}

export default Categories;
