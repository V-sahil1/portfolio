import React from "react";
import images, { project } from "../../consent";
import { useNavigate } from "react-router-dom";

function Project() {
  const navigate = useNavigate()
  return (
    <div id="projects" className="min-h-screen px-[40px] mt-[2rem] mr-0px ">
      <h1 className="text-[56px] mb-2">Projects</h1>
      <p className="text-gray-500 text-[16px]">
        GAINED HANDS-ON EXPERIENCE WITH DEPLOYMENT, VERSION CONTROL, AND MODERN
        FRONTEND TOOLS
      </p>
      <div className="grid md:grid-cols-3 gap-6 px-6 py-8">
  {project.slice(0, 3).map((project, index) => (
    <div
      key={index}
      className="bg-gray-50 rounded-xl shadow-md p-5 flex flex-col justify-between transition-transform hover:scale-[1.02] duration-300"
    >
      {/* Project Image */}
      <div className="flex items-center justify-center mb-4">
        <img
          src={project.img}
          alt={project.name}
          className="md:w-[85%] md:h-48 md:object-cover object-contain rounded-md"
        />
      </div>

      {/* Project Title */}
      <h2 className="text-xl font-semibold mb-2 text-gray-800">
        {project.name}
      </h2>

      {/* Project Description */}
      <p className="text-sm text-gray-600 mb-4">{project.description}</p>

      {/* Tech Stack Icons */}
      <div className="flex gap-3 flex-wrap mb-4">
        {project.techStack.map((stack, i) => (
          <img
            key={i}
            src={stack}
            alt={`tech-${i}`}
            className="w-9 h-9 object-contain"
            
          />
        ))}
      </div>

      {/* Buttons */}
      <div className="flex md:justify-between items-center  mt-auto">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gray-800 w-[100px] h-[50px] md:w-[130px] md:h-[40px] md:pb-2.5 flex items-center justify-center mr-3 text-white text-sm rounded-md hover:bg-gray-700 transition"
        >
          Source Code
        </a>
        <a
          href={project.vercel}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-teal-600 text-white text-sm rounded-md md:pb-2.5 md:w-[130px] md:h-[40px] w-[100px] h-[50px] flex items-center justify-center mr-3 hover:bg-teal-500 transition"
        >
          Visit Website
        </a>
      </div>
    </div>
  ))}
</div>

   
      <div className="relative flex ">
      <button onClick={()=>navigate('/projects')} className="md:w-[150px] w-[130px] h-[40px] absolute top-[-19px] left-[80px] md:top-[30px] md:left-[43%] md:h-[50px] flex items-center justify-center border bg-gray-200 hover:bg-gray-100 rounded-3xl text-gray-700">More Project</button>
      </div>

    </div>
  );
}

export default Project;
