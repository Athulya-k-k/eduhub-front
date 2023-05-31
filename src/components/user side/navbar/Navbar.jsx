import { useState, useEffect } from "react";
import {Link,useNavigate} from 'react-router-dom'
import jwt_decoded from 'jwt-decode'

import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Input
} from "@material-tailwind/react";
import { getLocal } from "../../../helpers/auth";
 
export default function Example() {
  const [openNav, setOpenNav] = useState(false);
  const [logged_in, set_logged] = useState(false)
  const [is_tutor, set_staff] = useState(false)
  const [is_admin, set_admin] = useState(false)
  const history = useNavigate()
  
 
  useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
    const get_token = getLocal('authToken')
    
    if (get_token){
      set_logged(true)
      const decoded = jwt_decoded(get_token)
      if (decoded.is_tutor){
        set_staff(true)
      }
      else if (decoded.is_admin){
        set_admin(true)
      }
    }

  }, []);

  console.log(is_admin);
  
  const logout = () => {
    localStorage.removeItem('authToken')
    history('/login')
  }
 
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 ">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          HOME
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          COURSES
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
        CONTACT
        </a>
      </Typography>
     
      <div className="relative flex w-full gap-2 md:w-max">
          <Input
            type="search"
            // color="customColorB"
            label="Search your courses..."
            className="pr-20 "
            
            containerProps={{
              className: "min-w-[288px]",
            }}
          />
          <Button
            size="sm"
            // color="Deep-Purple-100"
            className="!absolute right-1 top-1 rounded bg-customColorB "
          >
            Search
          </Button>
        </div>
    </ul>
  );
 
  return (
    <Navbar className=" max-w-screen-3xl py-2 px-4 lg:px-8 lg:py-4 bg-customColor rounded-none">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-medium text-customColorA "
        >
          EDUHUB
        </Typography>
       
        <div className="hidden lg:block">{navList}</div>
        {is_tutor && <div onClick={logout}>
        <Button variant="gradient" size="sm" className="hidden lg:inline-block mr-3">
          <Link to ='/register'> <span>Dashboard</span></Link>
        </Button>
        </div>}

        {/* {is_admin && <div >
        <Button variant="gradient" size="sm" className="hidden lg:inline-block mr-3">
          <Link to ='/register'> <span>Admin Dashboard</span></Link>
        </Button>
        </div>} */}

        { logged_in ? <div onClick={logout}>
        <Button variant="gradient" size="sm" className="hidden lg:inline-block mr-3">
          <Link to ='/register'> <span>Log Out</span></Link>
        </Button>
        </div> : <div>
        <Button variant="gradient" size="sm" className="hidden lg:inline-block mr-3">
          
         
          <Link to ='/register'> <span>SIGN UP</span></Link>
        </Button>
        <Button variant="gradient" size="sm" className="hidden lg:inline-block">
          <Link to ='/login'><span>SIGN IN</span></Link>
        </Button>
        </div>} 
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
             
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          <Button variant="gradient" size="sm" fullWidth className="mb-2">
            <span>SIGN UP</span>
          </Button>
          <Button variant="gradient" size="sm" fullWidth className="mb-2">
            <span>SIGN IN</span>
          </Button>
        </div>
      </MobileNav>
    </Navbar>
  );
}



