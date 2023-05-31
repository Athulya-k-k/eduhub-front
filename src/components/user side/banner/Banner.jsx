import React from 'react'
import Loginimage from "../../../images/banner.jpg";

function Banner() {
  return (
    <>
    <div className='font-bold text-4xl mt-14 text-customColorB'>
      EDUHUB COMMUNITY
      <p className='font-normal text-2xl mt-6 text-customColorC'>Let's Take You Forward :)  </p>
    </div >
    <div  className=" h-full w-3/6  flex items-center justify-center mx-auto">
    <img src={Loginimage} alt="Login" />
    </div>
   
    </>
  )
}

export default Banner
