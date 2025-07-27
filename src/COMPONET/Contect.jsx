import React from "react";
import { IoLocationSharp } from "react-icons/io5";
function Contect() {
  return (
    <div id="contact" className="min-h-[60vh] px-[40px] mt-[2rem] mr-0px ">
      <div className="md:flex md:flex-row grid grid-row-2  justify-between">
        <div className="flex flex-col items-start justify-start">
          <h1 className="text-[40px] text-gray-900 ">Reach Out to me!</h1>
          <p className="uppercase text-[18px] text-gray-600 mb-4">
            Discuss a project or just want to say hi? My Inbox is open for all.
          </p>

          <p className="flex text-[20px] uppercase gap-2 font-[500] text-gray-800 mb-2 items-center justify-center">
            <IoLocationSharp  /> Surat
          </p>

          <p className="text-[22px]">Open for opportunities: Yes</p>
          <div className="flex items-center justify-center mt-6  gap-5 ">
            <a target="_blank" href="https://www.linkedin.com/in/sahil-vardekar-9430212a7/">
              <img src="/image/linkedin.jpg" alt="" className="w-[45px] cursor-pointer" />
            </a>
            <a target="_blank" href="https://github.com/V-sahil1">
              <img src="/image/github.png" alt="" className="w-[45px] cursor-pointer "/>
            </a>
            <a target="_blank" href="https://leetcode.com/u/sahil__26/">
              <img src="/image/lc.png" alt="" className="w-[45px] mt-[1px] cursor-pointer"/>
            </a>
            <a target="_blank" href="https://www.npmjs.com/~batman_8">
              <img src="/image/npm.png" alt="" className="w-[45px] mt-[1px] cursor-pointer"/>
            </a>
            <a target="_blank" href="https://www.instagram.com/v_sahil08/?igsh=aHY0dHluMTJ0Zm8x#">
              <img src="/image/inst.jpg" alt="" className="w-[40px]  cursor-pointer"/>
            </a>
          </div>
        </div>

        <div className=" md:w-1/4 w-[90%] ml-[16px] flex  md:mr-6 items-center justify-center  rounded-full">
          <img
            src="/image/photo.jpg"
            alt=""
            className="w-[70%] h-[80%] rounded-full border-[5px] border-blue-400"
          />
        </div>
      </div>
      <p className="text-gray-800 text-[25px] text-center mt-9">Made with ❤️ By Sahil Vardekar</p>


    </div>
  );
}

export default Contect;
