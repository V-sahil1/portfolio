import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Education() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Select all blocks
      const items = gsap.utils.toArray(".edu-item");

      items.forEach((item) => {
        const logo = item.querySelector(".edu-logo");
        const text = item.querySelector(".edu-text");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
          },
        });

        // Animate logo first
        tl.from(logo, {
          x: -100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });

        // Then text after a delay
        tl.from(text, {
          x: -50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        }, "+=0.1"); // 0.3s delay after logo
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="min-h-screen px-[40px] mt-[2rem]">
      <h1 className="font-medium text-[56px] w-[430px] bg-gradient-to-r from-gray-800 to-gray-300 bg-clip-text text-transparent">
        Education
      </h1>
      <br />
      <div className="mt-5 ">
        {/* First Education Block */}
        <div className="flex mx-8 flex-col md:flex-row edu-item text-gray-800 ">
          <div className="md:mr-9 pl-5 mb-4 edu-logo " >
            <img src="/image/gec.png" alt="" />
          </div>
          <div className="edu-text">
            <h1 className="text-2xl font-bold mb-5 ">
              GOVERNMENT ENGINEERING COLLEGE, BHARUCH
            </h1>
            <h2 className="font-semibold mb-2 text-[17px]">
              Bachelor of Technology in Electronics and Communication Engineering
            </h2>
            <p className="mb-1 font-medium">JUNE 2022 – MAY 2026 (Expected)</p>
            <p className="mb-1 font-medium">CGPA : 7.4</p>
            <ul className="list-disc list-inside">
              <li className="mb-1 font-medium">
                Served as the Event Coordinator in Techtonic 2025
              </li>
              <li className="mb-1 font-medium">
                Served as the Athletic Sports Coordinator in Nabham 2024
              </li>
            </ul>
          </div>
        </div>

        <p className="bg-gray-200 h-[5px] mt-6 mb-6 transition-all rounded-2xl duration-900 hover:w-full transform hover:bg-blue-300 w-full md:w-[70%]" />

        {/* Second Education Block */}
        <div className="flex mx-8 flex-col md:flex-row edu-item text-gray-800">
          <div className="md:mr-9 pl-5 mb-4 edu-logo">
            <img src="/image/T.png" alt="" className="w-[185px]" />
          </div>
          <div className="ml-[11.5px] edu-text">
            <h1 className="text-2xl font-bold mb-5">T. & T. V. Sarvajanik High School</h1>
            <h2 className="font-semibold mb-2">
              11th–12th Science, Gujarat Secondary and Higher Secondary Education Board (GSHSEB)
            </h2>
            <p className="mb-1 font-medium">JUNE 2020 – MAY 2022</p>
          </div>
        </div>

        <p className="bg-gray-200 h-[5px] mt-6 mb-6 transition-all rounded-2xl duration-900 hover:w-full transform hover:bg-blue-300 w-full md:w-[70%]" />
      </div>
    </div>
  );
}

export default Education;
