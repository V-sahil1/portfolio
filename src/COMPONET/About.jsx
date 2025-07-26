import React from "react";
import images from "../../consent";
function About() {
  return (
    <div
      id="about"
      className=" h-[100vh] flex xl:flex-row md:flex-col justify-center items-center w-full"
    >
      <div className="xl:w-1/3 ">
        <video
          muted
          loop
          autoPlay
          playsInline
          className="w-[100%] h-[80vh] max-w-[450px] rounded-xl shadow-lg"
        >
          <source src="/image/about.mp4" alt="about-video" />
          Your Browser dose Not support this video
        </video>
      </div>

      <div className="text-black w-full xl:w-1/2">
        <h1 className="text-5xl mb-5 ">What I do</h1>
        <p className="text-gray-600">
          I build responsive frontends with React, explore backend with Node.js,
          and actively solve DSA problems to sharpen my problem-solving skills —
          passionate about full stack development and continuous learning. 🚀I
          build responsive frontends with React and am growing my skills in
          backend development with Node.js — passionate about full stack
          development and fast learning. 🚀
        </p>
        <div className="flex max-w-{450px} flex-wrap gap-5 mt-5 p-2 ">
          {images.map((images, index) => (
            <img
              src={images.images}
              key={index}
              alt=""
              className=" w-16 h-16 m-2 filter grayscale hover:grayscale-1 transition duration-300 cursor-pointer  "
            />
          ))}

          <p className="text-gray-600">
            ⚡ I specialize in developing highly interactive front-end user
            interfaces for both web and mobile applications using modern
            frameworks like React.js.
          </p>
          <p className="text-gray-600">
            ⚡ I build Progressive Web Apps (PWAs) with support for both
            traditional and Single Page Application (SPA) stacks.
          </p>
          <p className="text-gray-600">
            ⚡ I also integrate third-party tools like Tailwind CSS, ShadCN UI,
            GSAP, AOS, and external APIs to build scalable, real-world
            applications.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
