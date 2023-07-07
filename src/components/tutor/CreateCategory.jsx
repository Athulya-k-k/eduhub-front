import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import instance from "../../utils/axios";

function AddCourseForm() {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log(image);
    const formData = new FormData();
    formData.append("name", category);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await instance.post("courses/createcategory/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);

      if (res.status === 201) {
        
        toast.success("Category created");
        navigate("/categorytutor");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-br h-screen w-screen flex items-center justify-center">
          <Toaster position="top-center" reverseOrder={false} />
      
      <form
        className="w-full mx-auto flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h1 className="font-bold text-2xl block">CREATE CATEGORY</h1>

        <input
          className="bg-white h-14 w-5/12 border-2 mt-5 placeholder-black outline-none text-black px-6 block"
          type="text"
          name="category"
          placeholder="Category Name"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <input
          className="bg-white h-14 w-5/12 border-2 mt-5 placeholder-black outline-none text-black px-6 block"
          type="text"
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

<input
  className="bg-white h-14 w-5/12 border-2 mt-5 placeholder-black outline-none text-black px-6 block"
  type="file"
  name="image"
  accept="image/*"
  onChange={(e) => setImage(e.target.files[0])}
  required
/>


        <input
          className="bg-custom-red mt-6 h-7 w-5/12 text-white"
          type="submit"
          value="Create"
        />
      </form>
  

    </div>
  );
}

export default AddCourseForm;
