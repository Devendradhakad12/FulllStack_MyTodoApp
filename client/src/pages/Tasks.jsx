import React from "react";
import Nav from "../components/nav";
import { Link, useLocation } from "react-router-dom";
import Task from "../components/task";

const Tasks = () => {
  const location = useLocation().pathname.split("/")[2];
  const today = new Date().toDateString();

  return (
    <>
      <Nav />
      <div className=" h-[100vh] bg">
        {/* Heading div */}
        <div className="md:pl-10 pl-[56px] pt-7">
          <h1 className=" font-bold text-[50px] md:w-[40%]  capitalize m-auto">
            Your <br /> Projects <br /> {location} (5)
          </h1>
        </div>

        {/* today - Date Div */}
        <div className="md:pl-10 pl-[56px] pt-7">
          <h2 className="text-[23px] md:w-[40%]  capitalize m-auto">
            <span className="text-[25px] font-bold">Today :</span> {today}{" "}
          </h2>
        </div>

        {/* ProgressBar Div */}

        <div className="p-10 md:w-[50%] w-[100%] flex justify-center m-auto">
          <div className="progressBarOutside">
            <div className="progressBarInside bg-orange-600 w-[45%]">
              45% Done
            </div>
          </div>
        </div>

        {/* Pednding or completed task heading div */}
        <div className=" flex md:justify-center items-center gap-10 justify-between px-10 py-3">
          <h2 className="md:hidden capitalize font-bold text-[22px]">
            {location} Task's
          </h2>
          <Link>See All</Link>
        </div>

        {/* Tasks */}
        <div className=" bg flex gap-4 md:gap-[100px] justify-center items-center flex-wrap py-12">
       <Task today={today} /> 
        </div>
      </div>
    </>
  );
};

export default Tasks;
