import React from "react";
import { MdOutlineFileDownload } from "react-icons/md";
function Hero() {
  return (
    <div>
      <div className="relative flex h-[100vh]">
        <div className="flex w-full h-[80vh] absolute top-[18px]  items-center justify-center">
          <div className=" w-[50%] px-25">
            <h1 className="font-bold text-6xl mb-9 text-gray-950">
              &lt;Hi, I’m Sahil /&gt;👋
            </h1>
            <p className="w-[100%] font-semibold text-2xl text-gray-500 mb-9">
              A passionate Frontend Developer 🚀 skilled in building responsive
              and interactive web applications using ReactJS, HTML, CSS,
              JavaScript, Tailwind CSS, and GSAP. Focused on creating smooth
              UI/UX and modern user experiences.
              <div className="flex w-10 gap-7 mt-9 shadow-mg">
                <img src="/image/linkedin.jpg" alt="" />
                <img src="/image/github.png" alt="" />
                <img src="/image/lc.png" alt="" />
                <img src="/image/inst.jpg" alt="" />
              </div>
            </p>
          </div>
          <div className="w-[40%]">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-[90vh] h-[80vh]"
            >
              <source src="/image/hero.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
       <div className="flex items-center justify-center absolute top-[73%] left-[11%] gap-4">
  <button className="px-6 py-2 border border-gray-400 rounded-md text-center bg-blue-300 hover:bg-blue-500">
    Contact Me
  </button>
  <button className="px-6 py-2 border border-gray-400 rounded-md text-center flex items-center bg-blue-300 hover:bg-blue-500">
    Resume<span className="text-[25px] pl-1"><MdOutlineFileDownload /></span>
  </button>
</div>

      
      </div>
        
    </div>
  );
}

export default Hero;
