import React from 'react'
import { NavLink } from 'react-router-dom'
import {BiHomeAlt2,BiCategoryAlt,BiCategory} from 'react-icons/bi'
import {BsBook} from 'react-icons/bs'
import {AiOutlineUser} from 'react-icons/ai'
import {SlGraduation} from 'react-icons/sl'
import {CiDiscount1,CiLogout} from 'react-icons/ci'
import {HiOutlineDocumentText} from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { avatar } from '@material-tailwind/react'
import profile from '../../images/avatar2.png'

export default function Sidebar() {
    const history = useNavigate()

    const adminLogout = () => {
        localStorage.removeItem('authToken')
        history('/')
    }

  return (
    <div className='bg-white z-50 absolute h-auto min-h-screen xl:relative left-0 w-2/4 md:w-2/6 lg:w-1/5 shadow-xl  font-poppins rounded-r-2xl '>
        <div className="flex py-3">
            <img src={profile} alt="admin_profile_image" className='rounded-xl w-14 h-30 ml-12 mt-6' />
            <div className="flex flex-col place-content-center place-items-start">
              
                <p className='text-black font-semibold ml-8 mt-8'>Admin</p>
            </div>
        </div>
        <div className="flex flex-col px-3 py-5 mt-2">
            <NavLink to="/dashboard" className={({isActive})=>(isActive ? 'bg-cards rounded-xl flex place-items-center text-black my-2' : 'flex place-items-center bg-white-10 my-2')}>
                <BiHomeAlt2 size={50} className='px-3'></BiHomeAlt2>
                <h3 className=' font-semibold '>Dashboard</h3>
            </NavLink>
            <NavLink to="/courses" className={({isActive})=>(isActive ? 'bg-cards rounded-xl flex place-items-center text-black my-2' : 'flex place-items-center bg-white-10 my-2')}>
            <BsBook size={50} className='px-3'></BsBook>
                <h3 className='font-semibold'>Courses</h3>
            </NavLink>
            <NavLink to="/student" className={({isActive})=>(isActive ? 'bg-cards rounded-xl flex place-items-center text-black my-2' : 'flex place-items-center bg-white-10 my-2')}>
                <AiOutlineUser size={50} className='px-3 '></AiOutlineUser>
                <h3 className='font-semibold '>Students</h3>
            </NavLink>
            <NavLink to="/tutor" className={({isActive})=>(isActive ? 'bg-cards rounded-xl flex place-items-center text-black my-2' : 'flex place-items-center bg-white-10 my-2')}>
                <SlGraduation size={50} className='px-3'></SlGraduation>
                <h3 className='font-semibold'>Instructors</h3>
            </NavLink>
           
            <NavLink to="/categories" className={({isActive})=>(isActive ? 'bg-cards rounded-xl flex place-items-center text-black my-2' : 'flex place-items-center bg-white-10 my-2')}>
                <BiCategoryAlt size={50} className='px-3'></BiCategoryAlt>
                <h3 className='font-semibold'>Categories</h3>
            </NavLink>
          
            {/* <NavLink to="/sales" className={({isActive})=>(isActive ? 'bg-cards rounded-xl flex place-items-center text-white my-2' : 'flex place-items-center bg-white-10 my-2')}>
                <HiOutlineDocumentText size={50} className='px-3'></HiOutlineDocumentText>
                <h3 className='font-semibold'>Sales Report</h3>
            </NavLink> */}

            <div className="flex place-items-center h-10 my-2 cursor-pointer" onClick={()=>{adminLogout()}}>
                <CiLogout size={50} className='px-3 text-primaryBlue'></CiLogout>
                <h3 className='font-semibold text-primaryBlue'>Logout</h3>
            </div>

        </div>
    </div>
  )
}
