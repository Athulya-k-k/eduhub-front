import React from 'react'
import img from '../../../images/pngimg.com - student_PNG146.png'



function Banner() {
  return (
    <>   
     <div className='w-full h-full flex justify-center'>

    <div className=' w-1/2 '>
     <p className=' text-7xl font-semibold  text-customColorC   float-left mt-24 ml-10  '>Learn Without <br /> <span className='float-left'>limits</span>  </p>
      {/* <p className='font-semibold text-7xl  text-customColorC  mt-48 float-left bg-blue-gray-800 '>limits </p> */}
    <p className='mt-72 ml-11  text-xl whitespace-pre-line text-left  '>Start, switch, or advance your career with more than 5,800 courses,Professional Certificates, and degrees from world-class universities
 and companies.</p>

        
    </div > 
    <div className=' w-fit h-fit'>
     <img src={img}/>
    </div>
  
    </div>
    {/* <div className='bg-gray-200 h-96 w-full mt-64 text-4xl font-bold '><p className='float-left ml-20 mt-7'>Explore top courses</p>
    
    </div> */}
    </>

    
  )
}

export default Banner
