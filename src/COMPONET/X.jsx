import React from 'react'
import { project } from '../../consent'

function X() {
  return (
    <div className='min-h-screen mt-[90px] px-[40px]'>
      <h1 className='text-[48px] px-[22px]'>  My Builds</h1>
        <div className="grid md:grid-cols-3 gap-6 px-6 py-8">
      {project.map((project, index) => (
        <div
          key={index}
          className="bg-gray-100 rounded-xl  shadow-md p-5 flex flex-col  justify-between transition-transform hover:scale-[1.02]  duration-300 md:mx-9"
        >
          {/* Project Image */}
          <div className="flex items-center justify-center mb-4">
            <img
              src={project.img}
              alt={project.name}
              className="md:w-[85%] md:h-48 w-[92%] object-contain  rounded-md"
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
          <div className="flex justify-between items-center gap-3  mt-auto">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-800 text-white text-sm flex items-center justify-center rounded-md md:w-[130px] md:h-[40px] w-[100px]  h-[50px] hover:bg-gray-700 transition"
            >
              Source Code
            </a>
            <a
              href={project.vercel}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-teal-600 text-white text-sm flex items-center justify-center rounded-md md:w-[130px] md:h-[40px] w-[100px] h-[50px] hover:bg-teal-500 transition"
            >
              Visit Website
            </a>
          </div>
        </div>
      ))}
    </div>
    </div>
  )
}

export default X