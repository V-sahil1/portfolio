import React from "react";
import images from "../../consent";

function About() {
  return (
    <div
      id="about"
      className="min-h-screen flex flex-col xl:flex-row justify-center items-center px-6 py-10 gap-8"
    >
      {/* Video Section */}
      <div className="w-full xl:w-1/3  justify-center hidden md:block">
        <video
          muted
          loop
          autoPlay
          playsInline
          className="w-full md:h-[60vh] h-[50vh] max-w-[450px] rounded-xl shadow-lg"
        >
          <source src="/image/a.mp4" />
          Your browser does not support this video.
        </video>
      </div>

      {/* Text & Images Section */}
      <div className="text-black w-full xl:w-1/2">
        <h1 className="text-4xl md:text-5xl mb-4 text-center xl:text-left">What I do</h1>

        <p className="text-gray-600 text-center xl:text-left mb-4">
          I build responsive frontends with React, explore backend with Node.js,
          and actively solve DSA problems to sharpen my problem-solving skills —
          passionate about full stack development and continuous learning. 🚀
        </p>

        {/* Tech Stack Images */}
        <div className="flex flex-wrap justify-center xl:justify-start gap-4  max-w-[550px] mx-auto xl:mx-0 mt-4">
          {images.map((img, index) => (
            <img
              src={img.images}
              key={index}
              alt="tech"
              className="w-16 h-16 filter md:grayscale hover:grayscale-0 hover:scale-120 transition duration-300   cursor-pointer"
            />
          ))}
        </div>

        {/* Points */}
        <div className="mt-6 space-y-3 px-2 text-center xl:text-left">
          <p className="text-gray-600">
            ⚡ I specialize in developing highly interactive front-end user interfaces for both web and mobile applications using modern frameworks like React.js.
          </p>
          
          <p className="text-gray-600">
            ⚡ I also integrate third-party tools like Tailwind CSS, ShadCN UI, GSAP, AOS, and external APIs to build scalable, real-world applications.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
