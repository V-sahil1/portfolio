import React from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { Typewriter } from 'react-simple-typewriter';
function Hero() {
  return (
    <div className="w-full md:min-h-screen min-h-[75vh] relative px-[40px] mt-[2rem] bg-white">
      <div className="flex flex-col xl:h-[100vh] lg:flex-row items-center justify-center lg:justify-between px-6 lg:px-20 py-16 lg:py-0 ">
        {/* Left Text Section */}
        <div className="w-full lg:w-1/2  text-center lg:text-left">
              <h1 className="font-bold font-Jet text-[27px] md:text-5xl lg:text-6xl mb-6 text-gray-950">
      &lt;
      <span className="bg-gradient-to-r from-indigo-600  to-sky-400 bg-clip-text text-transparent">
        <Typewriter
          words={['Hi, I’m Sahil']}
          loop={true}
          cursor
          cursorStyle="|"
          typeSpeed={90}
          deleteSpeed={50}
          delaySpeed={1000}
        />
     
      </span>
         <span>👋</span>
      /&gt;
    </h1>
  <p className="font-medium text-lg sm:text-xl text-gray-700">
  A passionate <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent font-semibold">Frontend Developer <span className="text-gray-50">🚀</span></span> skilled in building responsive and interactive web applications using <strong className="text-blue-600">ReactJS, HTML, CSS, JavaScript, Tailwind CSS</strong>, and <strong className="text-purple-600">GSAP</strong>. Focused on creating smooth UI/UX and modern user experiences.
</p>






          {/* Social Icons */}
          <div className="flex gap-5 justify-center lg:justify-start mt-6">
            <a target="_blank" href="https://www.linkedin.com/in/sahil-vardekar-9430212a7/">
            <img src="/image/linkedin.jpg" alt="LinkedIn" className="w-8 h-8 object-contain" />
            </a>
            <a target="_blank" href="https://github.com/V-sahil1">
            <img src="/image/github.png" alt="GitHub" className="w-8 h-8 object-contain" /></a>
            <a target="_blank" href="https://leetcode.com/u/sahil__26/">
            <img src="/image/lc.png" alt="LeetCode" className="w-8 h-8 object-contain" /></a>
            <a target="_blank" href="https://www.instagram.com/v_sahil08/?igsh=aHY0dHluMTJ0Zm8x#">
            <img src="/image/inst.jpg" alt="Instagram" className="w-8 h-8 object-contain" /></a>
          </div>

          {/* Buttons */}
          <div className="md:flex md:flex-row grid grid-col-2 gap-4 mt-8 items-center justify-center md:justify-start">
            <a href="#contact" className="scroll-smooth">
            <button className="md:px-6 md:py-2 md:h-[41px] md:w-[150px] 
  w-[150px] h-[41px] 
  bg-gradient-to-r from-indigo-700 to-sky-400 
  hover:from-blue-400 hover:to-blue-500 
  border border-gray-300 rounded-md 
  text-white font-medium 
  
  flex items-center justify-center transition-all duration-300">
              Contact Me
              
            </button>
            </a>
            <a target="_blank" href="https://drive.google.com/file/d/1LRWCCfZa1OX6AJFUapC8qeC0i_0MF0EC/view?usp=sharing">
       <button className="md:px-6 md:py-2 md:h-[41px] md:w-[150px] 
  w-[150px] h-[41px] 
  bg-gradient-to-r from-indigo-700 to-sky-400 
  hover:from-blue-400 hover:to-blue-500 
  border border-gray-300 rounded-md 
  text-white font-medium 
  
  flex items-center justify-center transition-all duration-300">
              Resume
              <span className="text-xl pl-1">
                <MdOutlineFileDownload />
              </span>
            </button>
            </a>
          </div>
        </div>

        {/* Right Video Section */}
        <div className="w-full lg:w-1/2 mt-10 lg:mt-0 ml-12  justify-center hidden md:block">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="md:w-[90%] max-w-[450px] md:h-[60vh] h-[50vh] rounded-xl shadow-lg"
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
