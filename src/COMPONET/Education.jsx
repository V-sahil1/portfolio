import React from 'react'

function Education() {
  return (
    <div className='min-h-screen  px-[40px] mt-[2rem] mr-0px '>
        <h1 className='font-medium text-[56px]'>Education</h1>
        <hr className='text-gray-300'/>
        <div className='mt-5' >
            <div className='flex mx-8  flex-col md:flex-row '>
            <div className='mr-9'>
                <img src="/image/gec.png" alt="" />
            </div>
            <div className=''>
                <h1 className='text-2xl font-bold mb-5'>GOVERNMENT ENGINEERING COLLEGE, BHARUCH</h1>

                <h2 className='font-semibold mb-2 text-[17px]'>Bachelor of Technology in Electronics and Communication Engineering</h2>
                <p className='mb-1 font-medium'>JUNE 2022 – MAY 2026 (Expected)</p>
                <p className=' mb-1 font-medium '>CGPA : 7.4</p>
                    <p className='mb-1 font-medium'>Participated as the Event Coordinator in Techtonic 2025</p>
                    <p className='mb-1 font-medium'>Served as the Athletic Sports Coordinator in Nabham 2024</p>
                
            </div>
        </div>
       <hr className='text-gray-300 mt-6 mb-6'/>
         <div className='flex mx-8  flex-col md:flex-row '>
            <div className='mr-9'>
                <img src="/image/T.png" alt="" className='w-[185px]' />
            </div>
            <div>
                <h1 className='text-2xl font-bold mb-5'>T. & T. V. Sarvajanik High School</h1>

                <h2 className='font-semibold mb-2'>11th–12th Science, Gujarat Secondary and Higher Secondary Education Board (GSHSEB)</h2>
                <p className='mb-1 font-medium'>JUNE 2020 – MAY 2022 </p>
               
                
            </div>
        </div>
         <hr className='text-gray-300 mt-5'/>
        </div>
        
         

    </div>
  )
}

export default Education
