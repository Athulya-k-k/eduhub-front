import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import instance, { BASE_URL } from "../../utils/axios";
import { getLocal } from "../../helpers/auth";
import tutor from "../../images/tutor.jpg";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

function TutorForm() {
    // const [name, setName] = useState('');
  
    const [subject, setSubject] =useState('');
    const[qualification,setQualification]=useState('');
    const[experience,setExperience]=useState('');
   
  


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getLocal()
    const decoded = jwtDecode(token)
    const user_id = decoded.user_id
    const form = new FormData()

    // form.append('name',name)
    form.append('user', user_id)
    form.append('subject',subject)
    form.append('qualification',qualification)
    form.append(' experience ',experience)


    try {
      const response = await instance.post(
        'tutor/tutorregister/', form
      );
      console.log(response);

      if (response.status === 200) {
        toast.success("Tutor registration successful!");
        navigate('/dashboard');
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Error registering tutor");
    }
  };

  return (
    <div className="relative">
      <div
        className="h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${tutor})` }}
      ></div>

      <div className="absolute inset-0 bg-opacity-50 bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <Toaster position="top-center" reverseOrder={false} />

          <h1 className="text-2xl font-bold mb-4">WELCOME TUTOR</h1>

          <form onSubmit={handleSubmit}>
            {/* <input
              className="  h-9 w-6/12 border-2 rounded-full mt-5 bg-transparent  outline-none text-black  px-6 mr-6"
              type="text"
              name="name"
              placeholder="  name"
           required
              onChange={e =>setName(e.target.value)}
            /> */}


            <input
              className="h-9 w-6/12 border-2 rounded-full mt-5 bg-transparent  outline-none text-black px-6 mr-6"
              type="text"
              name="subject"
              placeholder=" subject"
              required
              onChange={e =>setSubject(e.target.value) }
            />

            <input
              className="h-9 w-6/12 border-2 rounded-full mt-5 bg-transparent  outline-none text-black px-6 mr-6"
              type="text"
              name="qualificaton"
              placeholder=" qualification"
              required
              onChange={e =>setQualification(e.target.value) }
            />

            <input
              className="h-9 w-6/12 border-2 rounded-full mt-5 bg-transparent  outline-none text-black px-6 mr-6"
              type="text"
              name="experience"
              placeholder=" experience"
              required
              onChange={e =>setExperience(e.target.value) }
            />

            <input
              className=" mt-7 h-11 w-5/12 rounded-full text-white block mx-auto"
              type="submit"
              value="Welcome"
            />
          </form>
        </div>
      </div>
    </div>
  )
}
export default TutorForm;
