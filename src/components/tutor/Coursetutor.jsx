import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios, { formToJSON } from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import instance, { BASE_URL } from "../../utils/axios";
import Pagination from '../Pagination';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

function Coursetutor() {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(2);
  const [open, setOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedCourse, setEditedCourse] = useState({
    title: "",
    subtitle: "",
    description: "",
    category: 0, // Assuming 0 is the default category value
    image: null,
    video: null,
    price: 0, // Assuming 0 is the default price value
    user: "" // Assuming an empty string is the default user value
  })
  const [category, setCategory] = useState([]);
  
  const [student, setStudent] = useState([]);
  const navigate = useNavigate();

  const handleOpen = (id) => {
    setSelectedCourseId(id);
    setOpen(true);
  };

 const handleEdit = (course) => {
  setSelectedCourseId(course.id);
  setEditMode(true);
  setEditedCourse({
    ...course,
    category: course.category.id, // Extract the ID from the category object
  });
  setOpen(true);
};


  const handleCategoryChange = (event) => {
    const categoryId = parseInt(event.target.value); // Convert the value to an integer
    setEditedCourse({
      ...editedCourse,
      category: categoryId,
    });
  };

  const handleInputChange = (event) => {
    if (event.target.name === "image" || event.target.name === "video"
    ) {
      setEditedCourse({
        ...editedCourse,
        [event.target.name]: event.target.files[0],
      });
    } else if(event.target.name === "category"){
      const categoryId = parseInt(event.target.value);
      setEditedCourse({
        ...editedCourse,
        [event.target.name]: categoryId,
      });
    }else{
      setEditedCourse({
        ...editedCourse,
        [event.target.name]: event.target.value,
      })
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("user", editedCourse.user);
      formData.append("title", editedCourse.title);
      formData.append("subtitle", editedCourse.subtitle);
      formData.append("description", editedCourse.description);
      formData.append("category", editedCourse.category);
      formData.append("image", editedCourse.image);
      formData.append("video", editedCourse.video);
      formData.append("price", editedCourse.price);
    
      await updateCourse(selectedCourseId, formData);
    } catch (error) {
      toast.error("Failed to save the course");
    }
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
      getCourses();
      toast.success("Course updated successfully");
      handleClose();
    } catch (error) {
      toast.error("Failed to update the course");
    }
  };


  const deleteCourse = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `${BASE_URL}courses/delete-course/${id}`
      );
      getCourses();
      toast.success("Course deleted successfully");
      handleClose();
    } catch (error) {
      toast.error("Failed to delete the course");
    }
  };

  const handleClose = () => {
    setSelectedCourseId(null);
    setEditMode(false);
    setEditedCourse({});
    setOpen(false);
  };

  const handleButtonClick = () => {
    navigate("/createcourse");
  };

  const getCourses = async () => {
    try {
      const response = await instance.get("courses/course/");
      setCourses(response.data);
    } catch (error) {
      toast.error("Failed to fetch courses");
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    try {
      const response = await instance.get("courses/category/");
      setCategory(response.data);
    } catch (error) {
      toast.error("Failed to fetch cat");
    }
  };
  // console.log(category);

  async function getStudent() {
    const response = await instance.get("api/users/");
    setStudent(response.data);
  }


  useEffect(() => {
    getStudent();
  }, []);

  const statusChange = (id) => {
    // console.log('user id', id)
    instance.get(`api/blockuser/${id}`).then(() => getStudent());
    // console.log(response);
  };

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentCourses = courses.slice(firstPostIndex, lastPostIndex);
  return (
    <div className="flex h-full bg-acontent">
      <Sidebar />
      <div className="px-5 w-full h-auto min-h-screen mx-5 mt-2  py-8 font-poppins flex flex-col place-content-start place-items-center bg-white shadow-xl rounded-xl">
        <div className="w-full h-screen px-3 font-poppins">
          <div className="w-full p-5">
            <Button
              className="bg-blue-gray-900 float-right"
              onClick={handleButtonClick}
            >
              Create Course
            </Button>
          </div>
          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 font-large text-gray-900"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-large text-gray-900"
                  >
                    Course Image
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-large text-gray-900"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-large text-gray-900"
                  >
                    Short Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-large text-gray-900"
                  >
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
                        <img
                          className=""
                          src={course.image}
                          alt={course.title}
                        />
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p>{course.description}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p>{course.subtitle}</p>
                    </td>
                    <td className="px-6 py-4">
                      <Button className="bg-red-400 "
                        onClick={() => handleOpen(course.id)}
                      
                      >
                        Delete
                      </Button>
                      <Button 
                        onClick={() => handleEdit(course)}
                       
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
        
      
      <Dialog open={open} onClose={handleClose}>
        <DialogHeader>{editMode ? "Edit Course" : "Confirmation"}</DialogHeader>
        <DialogBody divider>
          {editMode ? (
            <div>
              <label className="text-gray-600">Name</label>
              <Input
                name="title"
                value={editedCourse.title || ""}
                onChange={handleInputChange}
                placeholder="Enter name"
                className="mt-1"
              />
              <label className="text-gray-600">Description</label>
              <Input
                name="description"
                value={editedCourse.description || ""}
                onChange={handleInputChange}
                placeholder="Enter description"
                className="mt-1"
              />
              <label className="text-gray-600">Subtitle</label>
              <Input
                name="subtitle"
                value={editedCourse.subtitle || ""}
                onChange={handleInputChange}
                placeholder="Enter subtitle"
                className="mt-1"
              />
              <label className="text-gray-600">Image</label>
              <Input
                type="file"
                name="image"
                onChange={handleInputChange}
                className="mt-1"
              />
              <label className="text-gray-600">category</label>

              <select
                value={editedCourse.category.id}
                onChange={handleCategoryChange}
                name="category"
              >
                {category.map((category) => (
      <option value={category.id} key={category.name}>
        {category.name}
      </option>
                ))}
              </select>

              <label className="text-gray-600">video</label>

              <Input
                type="file"
                name="video"
                onChange={handleInputChange}
                className="mt-1"
              />
              <label className="text-gray-600">price</label>
              <Input
                name="price"
                value={editedCourse.price || ""}
                onChange={handleInputChange}
                placeholder="Enter price"
                className="mt-1"
              />
             
            </div>
          ) : (
            "Are you sure you want to delete this course?"
          )}
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
          {editMode ? (
            <Button variant="gradient" color="green" onClick={handleSave}>
              Save
            </Button>
          ) : (
            <Button
              variant="gradient"
              color="green"
              onClick={() => deleteCourse(selectedCourseId)}
            >
              Confirm
            </Button>
          )}
        </DialogFooter>
      </Dialog>
      <ToastContainer position="top-center" />
      <Pagination
            totalPosts={courses.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
      </div>
     
    </div>
  );
}

export default Coursetutor;
