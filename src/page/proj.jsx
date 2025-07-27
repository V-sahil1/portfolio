import React from 'react'

function proj() {
  return (
        <div className="grid md:grid-cols-3 gap-6 px-6 py-8">
      {project.slice(0, 3).map((project, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between transition-transform hover:scale-[1.02] duration-300"
        >
          {/* Project Image */}
          <div className="flex items-center justify-center mb-4">
            <img
              src={project.img}
              alt={project.name}
              className="w-[85%] h-48 object-cover rounded-md"
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
          <div className="flex justify-between items-center mt-auto">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-800 text-white text-sm rounded-md hover:bg-gray-700 transition"
            >
              Source Code
            </a>
            <a
              href={project.vercel}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-teal-600 text-white text-sm rounded-md hover:bg-teal-500 transition"
            >
              Visit Website
            </a>
          </div>
        </div>
      ))}
    </div>
    
  )
}

export default proj