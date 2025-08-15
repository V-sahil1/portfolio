import React from 'react'
import { certificates } from '../../consent'

function Certification() {
  return (
    <div className='min-h-screen px-[40px] md:mt-[2rem] mr-0px  mt-[90px] '>
        <h1 className='md:text-5xl text-[31px] font-bold w-[430px] bg-gradient-to-r  from-gray-800 to-gray-300 bg-clip-text text-transparent '>Certifications <span className='text-gray-50'>🏆</span></h1>
        <p className='md:text-[20px] text-[16px] mt-4 text-gray-500'>CERTIFICATIONS THAT HIGHLIGHT MY SKILLS AND LEARNING JOURNEY IN WEB DEVELOPMENT AND BEYOND!</p>

        <div className='grid grid-row-3 md:flex  justi gap-6 px-6 py-8 '>
          {certificates.map((ceri,index)=>(
            <div key={index} className="bg-gray-100 rounded-xl  shadow-lg p-5 flex flex-col justify-between transition-transform hover:scale-[1.02] duration-300"
     >
              <div className='flex items-center justify-center'>
                <img src={ceri.img} alt="" className='w-[30vh] rounded-2xl h-[30vh]'/>
              </div>
              <p className='text-center text-[27px] font-semibold text-gray-800 p-3 '>{ceri.Name}</p>
              <p className='text-center text-[17px] text-gray-500 p-2 pb-4'>{ceri.description}</p>
              <div className='flex items-center justify-center'>
                 <a  href={ceri.drive}
              target='_blank'><button className="bg-gradient-to-r from-gray-700/90 to-gray-500/80 
  backdrop-blur-md text-white font-medium 
  flex items-center w-[170px] md:w-[160px] justify-center 
  rounded-md h-[40px] border border-gray-400/30 
  hover:scale-105 hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-600 
  transition-all duration-300">
  View Certificate
</button>



  </a>
              </div>
             
            </div>
          ))}
        </div>

    </div>
  )
}

export default Certification