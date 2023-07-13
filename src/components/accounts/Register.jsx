import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
// import { BASE_URL } from "../../utils/axios";
import register from "../../images/register.png";
import instance from '../../utils/axios';

function Register() {

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    password2: "",
  });

  const { first_name, last_name, email, phone_number, password, password2 } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log(formData);


  const signupSubmit = async (e) => {
    e.preventDefault();

    if (first_name.trim() === "") {
      toast.error("Please enter your first name.");
        return;
      }

    if (last_name.trim() === "") {
    toast.error("Please enter your last name.");
      return;
    }

    if (email.trim() === "") {
      toast.error("Please enter your email.");
      return;
    }

    if (phone_number.trim() === "") {
     toast.error ("Please enter your phone number.");
      return;
    }

    if (password.trim() === "") {
      toast.error("Please enter a password.");
      return;
    }

    if (password !== password2) {
    toast.e("Passwords do not match.");
      return;
    }
  
    try {
      const response = await instance.post('api/register/', {
        first_name,
        last_name,
        email,
        username: email.split("@")[0],
        phone_number,
        password,
      });

      console.log(response);
      if (response.status === 200) {
        toast.success("Please activate your email in account....");
      } else {
        toast.error("Something went wrong");
      }
    } catch(error) {
      toast.error("Password did't match");
    }
  };

  return (
    <div className="bg-gradient-to-br from-f6c2f9 to-819ff9 h-screen w-screen flex items-center justify-center">
        <Toaster position="top-center" reverseOrder={false}/>
      <div className=" h-5/6 w-10/12 flex flex-row bg-gradient-to-r from-yellow-50 to-pink-200 ">
        <div className=" h-full w-3/6  flex items-center justify-center">
          <img src={register} alt="Login" />
        </div>
        <div className=" h-full w-3/6 flex items-center justify-center ">
          <div className="bg-white h-5/6  w-4/6 ">
            <h1 className="font-serif text-3xl text-custom-red mt-4 px-24 font-bold">
              SIGNUP
            </h1>

            <form className="login-input" onSubmit={signupSubmit}>
              <input
                className=" bg-white h-9 w-11/12 border-2 rounded-full mt-5 placeholder-pink-300  outline-none text-black  px-6"
                type="text"
                name="first_name"
                placeholder="  firstname"
                value={first_name}
                onChange={handleChange}
              />
               <input
                className=" bg-white h-9 w-11/12 border-2 rounded-full mt-5 placeholder-pink-300  outline-none text-black px-6 "
                type="text"
                name="last_name"
                placeholder="  lastname"
                value={last_name}
                onChange={handleChange}
              />
              <input
                className=" bg-white h-9 w-11/12 border-2 rounded-full mt-5 placeholder-pink-300  outline-none  text-black px-6"
                type="email"
                name="email"
                placeholder="  email"
                value={email}
                onChange={handleChange}
              />
              <input
                className=" bg-white h-9 w-11/12 border-2 rounded-full mt-5 placeholder-pink-300  outline-none text-black  px-6"
                type="text"
                name="phone_number"
                placeholder="  phone"
                value={phone_number}
                onChange={handleChange}
              />
              <input
                className=" bg-white h-9 w-11/12 border-2 rounded-full mt-5 placeholder-pink-300  outline-none text-black px-6"
                type="password"
                name="password"
                placeholder="  password"
                value={password}
                onChange={handleChange}
              />
              <input
                className=" bg-white h-9 w-11/12 border-2 rounded-full mt-5 placeholder-pink-300  outline-none text-black px-6"
                type="password"
                name="password2"
                placeholder="  confirm password"
                value={password2}
                onChange={handleChange}
              />
              <input
                className="bg-custom-red mt-6 h-7 w-5/12 rounded-full text-white"
                type="submit"
                value="SIGNUP"
              />

              <p className="text-custom-red text-xs">
                {" "}
                Alredy a member..?
                <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
