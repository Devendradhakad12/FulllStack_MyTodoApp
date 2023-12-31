import React, { useEffect, useState } from "react";
import Nav from "../components/nav";
import { Link, useLocation } from "react-router-dom";
import AllTask from "../components/alltask";
import { useFetchAll } from "../hook/useFetch";
const AllTasks = () => {
  const location = useLocation().pathname.split("/")[2];
  const today = new Date().toDateString();
  const [projectcoutn, setProjectCount] = useState(0);
  const { task, loading, error, reFetch, taskCompletion } = useFetchAll();
  return (
    <>
      <Nav />
      <div className=" h-[100vh] bg">
        {/* Heading div */}
        <div className="md:pl-10 pl-[56px] pt-7">
          <h1 className=" font-bold text-[50px] md:w-[40%]  capitalize m-auto">
            Your <br /> {location} <br /> Projects ({projectcoutn})
          </h1>
        </div>

        {/* today - Date Div */}
        <div className="md:pl-10 pl-[56px] pt-7">
          <h2 className="text-[23px] md:w-[40%]  capitalize m-auto">
            <span className="text-[25px] font-bold">Today :</span> {today}{" "}
          </h2>
        </div>

        {/* ProgressBar Div */}
        <div className="p-7 md:w-[50%] w-[100%] flex justify-center m-auto">
          <div className="progressBarOutside flex relative">
            <div
              className={`progressBarInside bg-orange-500 text-slate-900 `}
              style={{
                width: `${taskCompletion}%`,
              
              }} 
            ></div>
            {taskCompletion ? (
              <div className="pl-3 absolute top-1 left-[40%] font-bold text-center">
                {loading ? " Loading...." : <>{taskCompletion}% Done </>}
              </div>
            ) : (
              <div className="pl-3 absolute top-1 left-[40%] font-bold text-center">
                {loading ? " Loading...." : <>0% Done </>}
              </div>
            )}
          </div>
        </div>

        {/* Pednding or completed task heading div */}
        <div className=" flex md:justify-center items-center gap-10 justify-center px-10 py-3">
          <h2 className="md:hidden capitalize font-bold text-[22px]">
            {location} Task's
          </h2>
        </div>

        {/* Tasks */}
        <div className="bg">
          <AllTask
            today={today}
            task={task}
            loading={loading}
            error={error}
            reFetch={reFetch}
            location={location}
            setProjectCount={setProjectCount}
          />
        </div>
      </div>
    </>
  );
};

export default AllTasks;
