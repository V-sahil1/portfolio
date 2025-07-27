import React from "react";

function Proficiency() {
  return (
    <>
      <div className="min-h-screen px-[40px] mt-[2rem] w-full">
        <h1 className=" text-center font-bold text-4xl md:text-5xl ">
          Proficiency
        </h1>
        <div className="  flex flex-row md:flex-col items-center justify-center mt-9  ">
          <div className="flex items-center flex-col md:flex-row justify-center">
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
              {/* frontend */}
              <div className="my-2 ">
                <p className="text-2xl md:text-3xl mb-6">Frontend</p>
                <div className="flex items-center gap-4 ">
                  <div className="bg-gray-300 w-[300px] md:w-[500px] h-[20px] rounded-2xl">
                    <div className="bg-blue-400 w-[80%] h-[20px] rounded-l-2xl" />
                  </div>{" "}
                  <span>75%</span>
                </div>
              </div>
              {/* backend */}

              <div className="my-2">
                <p className="text-2xl md:text-3xl mb-6">backend</p>
                <div className="flex items-center gap-4 ">
                  <div className="bg-gray-300 w-[300px] md:w-[500px] h-[20px] rounded-2xl">
                    <div className="bg-blue-400 w-[30%] h-[20px] rounded-l-2xl" />
                  </div>{" "}
                  <span>30%</span>
                </div>
              </div>
              {/* programming */}
              <div className="my-2">
                <p className="text-2xl md:text-3xl mb-6">Programming</p>
                <div className="flex items-center gap-4 ">
                  <div className="bg-gray-300 w-[300px] md:w-[500px] h-[20px] rounded-2xl">
                    <div className="bg-blue-400 w-[60%] h-[20px] rounded-l-2xl" />
                  </div>{" "}
                  <span>60%</span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 hidden md:block">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="md:w-[90%] md:h-[90vh] h-[60vh] md:mt-0 mt-3   shadow-sm rounded-2xl"
              >
                <source src="./image/about.mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Proficiency;
