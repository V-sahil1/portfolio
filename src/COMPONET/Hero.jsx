import React from "react";
import { MdOutlineFileDownload } from "react-icons/md";

function Hero() {
  return (
    <div className="w-full min-h-screen relative px-[40px] mt-[2rem] bg-white">
      <div className="flex flex-col xl:h-[100vh] lg:flex-row items-center justify-center lg:justify-between px-6 lg:px-20 py-16 lg:py-0 ">
        {/* Left Text Section */}
        <div className="w-full lg:w-1/2  text-center lg:text-left">
          <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl mb-6 text-gray-950">
            &lt;Hi, I’m Sahil /&gt;👋
          </h1>
          <p className="font-medium text-lg sm:text-xl text-gray-600">
            A passionate Frontend Developer 🚀 skilled in building responsive and interactive web applications using <strong>ReactJS, HTML, CSS, JavaScript, Tailwind CSS</strong>, and <strong>GSAP</strong>. Focused on creating smooth UI/UX and modern user experiences.
          </p>

          {/* Social Icons */}
          <div className="flex gap-5 justify-center lg:justify-start mt-6">
            <img src="/image/linkedin.jpg" alt="LinkedIn" className="w-8 h-8 object-contain" />
            <img src="/image/github.png" alt="GitHub" className="w-8 h-8 object-contain" />
            <img src="/image/lc.png" alt="LeetCode" className="w-8 h-8 object-contain" />
            <img src="/image/inst.jpg" alt="Instagram" className="w-8 h-8 object-contain" />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
            <a href="#contact">
            <button className="px-6 py-2 border border-gray-400 rounded-md bg-blue-300 hover:bg-blue-500 text-black">
              Contact Me
              
            </button>
            </a>
            <a href="">
            <button className="px-6 py-2 border border-gray-400 rounded-md bg-blue-300 hover:bg-blue-500 text-black flex items-center justify-center">
              Resume
              <span className="text-xl pl-1">
                <MdOutlineFileDownload />
              </span>
            </button>
            </a>
          </div>
        </div>

        {/* Right Video Section */}
        <div className="w-full lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-[90%] max-w-[450px] rounded-xl shadow-lg"
          >
            <source src="/image/hero.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
        </div>
      </div>
    </div>
  );
}

export default Hero;
