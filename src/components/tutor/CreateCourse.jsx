import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { getLocal } from "../../helpers/auth";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import instance from "../../utils/axios";

function AddCourseForm() {
  // const [user, setUser] = useState(null);
  const [course, setCourse] = useState("");
  const [category, setCategory] = useState(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);

  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [categoryList, setCategorylist] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function categories() {
      const response = await instance.get('courses/category/');
      setCategorylist(response.data);
    }
    categories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    // form.append("user", user);
    form.append("course", course);
    form.append("category", category);
    form.append("title", title);
    form.append("subtitle", subtitle);
    form.append("description", description);
    form.append("price", price);
    form.append("image", image); 
    form.append("video", video); 

    console.log(image);
    const res = await instance({
      method: "post",
      url: 'courses/createcourse/',
      data: form,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res);
    if (res.status === 201) {
      toast.success("course added");
      navigate("/coursetutor");
    
    } else {
      toast.error(res.statusText);
    }
  };

  return (
    <div className="bg-gradient-to-br  h-screen w-screen flex items-center justify-center">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

     
     

        <form className="w-full mx-auto flex flex-col justify-center items-center" onSubmit={handleSubmit} encType="multipart/formdata">
        <h1 className="font-bold text-2xl block">CREATE COURSE </h1>
          <input
            className=" bg-white h-14 w-5/12 border-2  mt-5 placeholder-black  outline-none text-black  px-6 block"
            type="text"
            name="course"
            placeholder=" coursename"
            onChange={(e) => setCourse(e.target.value)}
            required
          />

          <input
            className=" bg-white  h-14 w-5/12 border-2 mt-5 placeholder-black outline-none text-black  px-6 block"
            type="text"
            name="title"
            placeholder=" titlename"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
           <input
            className=" bg-white  h-14 w-5/12 border-2 mt-5 placeholder-black outline-none text-black  px-6 block"
            type="text"
            name="title"
            placeholder=" titlename"
            onChange={(e) => setSubtitle(e.target.value)}
            required
          />

          <input
            className=" bg-white h-14 w-5/12 border-2  mt-5 placeholder-black  outline-none text-black  px-6 block"
            type="text"
            name="description"
            placeholder=" description"
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <select
            className=" bg-white  h-14 w-5/12 border-2 mt-5 placeholder-black  outline-none text-black  px-6 block"
            type="text"
            name="category"
            placeholder=" category"
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select category</option>
            {categoryList.map((category) => (
              <option value={category.id}>{category.name}</option>
              
            ))}
          </select>

          <input
            className=" bg-white  h-14 w-5/12 border-2  mt-5 placeholder-black  outline-none text-black  px-6 block"
            type="number"
            name="price"
            placeholder=" price"
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <input
            className=" bg-white  h-14 w-5/12 border-2  mt-5 placeholder-black  outline-none text-black  px-6 block"
            type="file"
            name="image"
            placeholder=" image"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />

          <input
            className=" bg-white h-14 w-5/12 border-2  mt-5 placeholder-black  outline-none text-black  px-6 block"
            type="file"
            id="video"
            name="video"
            placeholder=" video"
            onChange={(e) => setVideo(e.target.files[0])}
            required
          />

          <input
            className="bg-custom-red mt-6 h-7 w-5/12  text-white"
            type="submit"
            value="create"
          />
        </form>
      
    </div>
  );
}

export default AddCourseForm;
