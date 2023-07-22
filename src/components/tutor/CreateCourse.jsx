import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { getLocal } from "../../helpers/auth";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import instance from "../../utils/axios";

function AddCourseForm() {

  const [course, setCourse] = useState("");
  const [category, setCategory] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
 

  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [categoryList, setCategorylist] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);

  
  const navigate = useNavigate();

  useEffect(() => {
    async function categories() {
      const response = await instance.get("courses/category/");
      setCategorylist(response.data);
    }
    categories();
  }, []);

  console.log("getStudent");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("course", course);
    form.append("category", category);
    form.append("title", title);
    form.append("description", description);
    form.append("price", price);
    form.append("image", image);
    form.append("video", video);
   
    if (image) {
      const imageFileType = image.type;
      if (imageFileType.startsWith("image")) {
        form.append("image", image);
      } else {
        toast.error("Please select an image file for the 'image' field");
        return;
      }
    }
  
    // Validate video file
    if (video) {
      const videoFileType = video.type;
      if (videoFileType.startsWith("video")) {
        form.append("video", video);
      } else {
        toast.error("Please select a video file for the 'video' field");
        return;
      }
    }

    console.log(image);
    const res = await instance({
      method: "post",
      url: "courses/createcourse/",
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

  const handlePriceChange = (e) => {
    const enteredValue = parseFloat(e.target.value);
    if (!isNaN(enteredValue) && enteredValue >= 0) {
      setPrice(enteredValue);
    } else {
      // Prevent updating the state with negative values
      setPrice("");
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setPreviewImage(URL.createObjectURL(selectedImage));
    setImage(selectedImage);
  };
  const handleVideoChange = (e) => {
    const selectedVideo = e.target.files[0];
    setPreviewVideo(URL.createObjectURL(selectedVideo));
    setVideo(selectedVideo);
  };

  return (
    <div className="bg-gradient-to-br  h-full w-full flex items-center justify-center">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <form
        className="w-full mx-auto flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
        encType="multipart/formdata"
      >
        <h1 className="font-bold text-2xl underline mt-7">CREATE COURSE </h1>
        <div className=" w-5/12  ">
          <label className="text-base float-left" htmlFor="course">
            Course Name
          </label>
        </div>
        <input
          id="course"
          className=" h-14 w-5/12 border-2  placeholder-black outline-none text-black px-6 block"
          type="text"
          name="course"
          onChange={(e) => setCourse(e.target.value)}
          required
        />
        <div className=" w-5/12  ">
          <label className="float-left text-base" htmlFor="course">
            Title Name
          </label>
        </div>

        <input
          className=" bg-white  h-14 w-5/12 border-2  placeholder-black outline-none text-black  px-6 block"
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <div className=" w-5/12  ">
          <label className="float-left text-base" htmlFor="course">
            Description
          </label>
        </div>
        <input
          className=" bg-white h-14 w-5/12 border-2   placeholder-black  outline-none text-black  px-6 block"
          type="text"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          required
        />

<div className="w-5/12">
        <label className="float-left text-base" htmlFor="course">
          Price
        </label>
      </div>
      <input
        className="bg-white h-14 w-5/12 border-2 placeholder-black outline-none text-black px-6 block"
        type="number"
        name="price"
        value={price}
        onChange={handlePriceChange}
        required
      />
    
        <div className=" w-5/12  ">
          <label className="float-left text-base" htmlFor="course">
            image
          </label>
        </div>
        <input
          className="bg-white h-14 w-5/12 border-2 placeholder-black outline-none text-black px-6 block"
          type="file"
          name="image"
          onChange={handleImageChange} 
          required
        />
        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className="mt-2 w-32 h-32 object-cover"
          />
        )}
        <div className=" w-5/12  ">
          <label className="float-left text-base" htmlFor="course">
            video
          </label>
        </div>
        <input
          className=" bg-white h-14 w-5/12 border-2  placeholder-black  outline-none text-black  px-6 block"
          type="file"
          id="video"
          name="video"
          onChange={handleVideoChange} 
          required
        />
        {previewVideo && (
          <video 
            src={previewVideo}
            alt="Preview"
            className="mt-2 w-32 h-32 object-cover"
          />
        )}
         
        <div className=" w-5/12  ">
          <label className="float-left text-base" htmlFor="course">
            category
          </label>
        </div>

        <select
          className=" bg-white  h-14 w-5/12 border-2  placeholder-black  outline-none text-black  px-6 block"
          type="text"
          name="category"
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select category</option>
          {categoryList.map((category) => (
            <option value={category.id}>{category.name}</option>
          ))}
        </select>

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
