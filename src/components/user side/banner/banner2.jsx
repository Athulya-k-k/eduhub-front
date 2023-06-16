import React from "react";
import img from "../../../images/b3a5c795-dcf9-4ede-b0af-5225a3d0176a_accelerator+5.avif";
function banner2() {
  return (
    <>
      <div className="w-full h-fit flex items-center justify-center">
      <div className="w-1/2 ">
          <img className="h-4/6 w-4/6 mx-auto" src={img}></img>
        </div>
        <div className="w-1/2">
           
          <p className="text-black font-bold text-4xl   ml-7 px-10  ">
            Take the next step toward your personal and professional goals with
            EduHUb.
          </p>
        </div>
      
      </div>
    </>
  );
}

export default banner2;
