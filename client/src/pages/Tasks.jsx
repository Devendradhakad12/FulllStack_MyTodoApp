import React, { useEffect, useState } from "react";
import Nav from "../components/nav";
import { Link, useLocation } from "react-router-dom";
import Task from "../components/task";
import { useFetchAll } from "../hook/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import Loader from "../components/loader";
const Tasks = () => {
  const location = useLocation().pathname.split("/")[2];
  const today = new Date().toDateString();

  const [mytask, setMytask] = useState([]);
  const { task,error, loading } = useFetchAll();

  // filter pending or completed tasks
  useEffect(() => {
    const filterTask = () => {
      return location === "pending"
        ? task.filter((t) => t.checked === false)
        : task.filter((t) => t.checked !== false);
    };
    if (!loading) setMytask(filterTask());
  }, [task]);

  //if (!loading) console.log(loading, mytask);

  return (
    <>
      <Nav />
      <div className=" h-[100vh] bg">
        {/* Heading div */}
        <div className="md:pl-10 pl-[56px] pt-7">
          <h1 className=" font-bold text-[50px] md:w-[40%]  capitalize m-auto">
            Your <br /> Projects <br /> {location} ({mytask?.length})
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
          <Link className="md:hidden capitalize font-bold text-[22px]" to="/" >
          <FontAwesomeIcon icon={faArrowLeftLong} />  {location} Task's
          </Link>
          <Link to='/tasks/all'>See All</Link>
        </div>

        {/* Tasks */}
        <div className=" bg flex gap-4 md:gap-[100px] justify-center items-center flex-wrap py-12">
       {
        loading ? <Loader/> :    <Task today={today} error={error} mytask={mytask} location={location} />
       }
        </div>
      </div>
    </>
  );
};

export default Tasks;
