import React from 'react'
import { certificates } from '../../consent'

function Certification() {
  return (
    <div className='min-h-screen px-[40px] mt-[2rem] mr-0px '>
        <h1 className='text-4xl md:text-5xl font-bold'>Certifications 🏆</h1>
        <p className='text-[20px] mt-4 text-gray-500'>CERTIFICATIONS THAT HIGHLIGHT MY SKILLS AND LEARNING JOURNEY IN WEB DEVELOPMENT AND BEYOND!</p>

        <div className='grid grid-row-3 md:flex  justi gap-6 px-6 py-8 '>
          {certificates.map((ceri,index)=>(
            <div className="bg-gray-100 rounded-xl  shadow-lg p-5 flex flex-col justify-between transition-transform hover:scale-[1.02] duration-300"
     >
              <div className='flex items-center justify-center'>
                <img src={ceri.img} alt="" className='w-[30vh] rounded-2xl h-[30vh]'/>
              </div>
              <p className='text-center text-[27px] font-semibold text-gray-800 p-3 '>{ceri.Name}</p>
              <p className='text-center text-[17px] text-gray-500 p-2 pb-4'>{ceri.description}</p>
              <div className='flex items-center justify-center'>
                 <a  href={ceri.drive}
              target='_blank'><button className='bg-gray-800 hover:bg-gray-700 text-white text-center flex items-center w-[160px] md:w-[150px] justify-center rounded-md h-[35px]'>View Certificate</button></a>
              </div>
             
            </div>
          ))}
        </div>

    </div>
  )
}

export default Certification