
import React from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import {BsCart3} from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import jwtDecode from "jwt-decode"
import { getLocal } from '../../../helpers/auth'
import { useState } from 'react'


function NavBar() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('');
  

 

  function searchCourse(e) {
    if (e.key === 'Enter') {
      navigate(`/course?key=${search}`);
    }
  }


  const user_auth = getLocal('authToken');
  let user_name;
  if(user_auth){
    user_name = jwtDecode(user_auth)
    
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    navigate('/login')
  }

  return (
    <div className='w-100 h-20 flex font-poppins px-5 p-4 place-items-center place-content-center gap-5'>
      <div className="flex flex-1 place-items-center place-content-start gap-12">
          <h1 className='font-semibold text-2xl text-customColorC'>EDUHUB</h1>
          <div className="flex px-10 rounded-3xl border-2 border-white py-2 place-items-center ms-3">
            <AiOutlineSearch className='text-black' size={20}></AiOutlineSearch>
            <input
              type="text"
              className="focus:outline-none ms-2 bg-transparent placeholder:text-black"
              value={search}
              placeholder="search for courses"
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => {
                searchCourse(e);
              }}
            />
          </div>
      </div>
      
        <div className='flex gap-3 place-items-center'>
        
            <Link to="/"><li className='px-1 list-none text-black'>Home</li></Link>
            <Link to="/course"><li className='px-1 list-none text-black'>Courses</li></Link>
            <Link to="/user/cart"><BsCart3 className="cursor-pointer text-white"></BsCart3></Link>
            {/* <Link to="/tutorsignup"><li className='px-1 list-none text-black'>Instructor</li></Link> */}
            <Link to="/user/cart"><BsCart3 className="cursor-pointer text-white"></BsCart3></Link>
        </div> 
        {/* {user_auth ? (
          user_name.is_staff ? (
            <Link to="/courses"><li className='px-1 list-none text-black'>Instructor</li></Link>
          ) : (
            <Link to="/tutorregister"><li className='px-1 list-none text-black'>Become an Instructor</li></Link>
          )
        ) : null} */}



        {user_auth ? 
        <div>
            <div className='flex gap-2'>
            <Link to="/login"><li className='px-1 list-none'></li><button className='px-4 py-2 bg-green-400 mx-2 text-black shadow-xl rounded-xl' onClick={logout} >Logout</button></Link>

            </div>   
        </div> 
        : 
        <div>
            <div className='flex gap-2'>
            <Link to="/login"><li className='px-1 list-none'></li><button className='px-4 py-2 bg-green-400 mx-2 text-black shadow-xl rounded-xl' >user Login</button></Link>
            <Link to="/tutorsignin"><li className='px-1 list-none'></li><button className='px-4 py-2 bg-green-400 mx-2 text-black shadow-xl rounded-xl' >tutor Login</button></Link>
            </div>   
        </div>
        }
           
    </div>
  )
}

export default NavBar
