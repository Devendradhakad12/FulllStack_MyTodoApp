import React, { useContext, useEffect, useState } from "react";
import Nav from "../components/nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { url } from "../utils/features";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { useFetchAll } from "../hook/useFetch";

// main Home function
const Home = () => {
  const { task } = useFetchAll();

  // const dateee = new Date(task[0]?.createdAt)
  //  console.log(dateee.toDateString() === getDate(2))

  const { username, token, dispatch } = useContext(AuthContext);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.post(`${url}/user`, { token: token });
        dispatch({
          type: "SET_USER",
          username: res.data.user.username,
          email: res.data.user.email,
          token: res.data.token,
        });
        // toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    };
    if (!username && token) {
      getUser();
    }
  }, []);

  const data = [
    {
      date: getDate(2).split(" ")[2],
      month: getDate(2).split(" ")[1],
    },
    {
      date: getDate(1).split(" ")[2],
      month: getDate(1).split(" ")[1],
    },
    {
      date: getDate(0).split(" ")[2],
      month: getDate(0).split(" ")[1],
    },
    {
      date: getNextDate(1).split(" ")[2],
      month: getNextDate(1).split(" ")[1],
    },
    {
      date: getNextDate(2).split(" ")[2],
      month: getNextDate(2).split(" ")[1],
    },
  ];

  return (
    <>
      <Nav />

      <div className="h-full bg">
        {/* Heading Div */}
        <div className="md:pl-10 pl-[56px] pt-7">
          <h1 className=" font-bold text-[50px] md:w-[40%]  m-auto">
            Your <br /> Projects ({task?.length})
          </h1>
        </div>

        {/* Date Div */}
        <div className=" flex gap-4 justify-center items-center py-10 px-10 flex-wrap">
          {data.map((i) => {
            return (
              <div className="box cursor-pointer" key={i.date}>
                <h2 className="text-[25px] font-bold">{i.date}</h2>
                <h3 className=" font-semibold">{i.month}</h3>
              </div>
            );
          })}
        </div>

        {/* Add task button */}

        <div className="flex justify-center items-center">
          <Link to="/addtask" className="btn">
            Add Task
          </Link>
        </div>

        {/* progress bar */}
        <div className="pt-10 md:w-[60%] w-[80%] flex justify-center m-auto">
          <div className="progressBarOutside">
            <div className="progressBarInside bg-green-700 text-slate-900 w-[45%]">
              45%
            </div>
          </div>
        </div>

        {/* Task completed and pending box */}

        <div className="flex gap-4 md:gap-[100px] justify-center items-center flex-wrap py-12">
          {/* All Task box */}
          <div className="homeTaskCompletedBox bg-orange-500">
            <div>
              <Link
                to="/tasks/all"
                className=" font-bold text-[35px] cursor-pointer"
              >
                All
                <br /> Task <FontAwesomeIcon icon={faArrowRightLong} />
              </Link>
            </div>
          </div>

          {/* Task Pending box */}
          <div className="homeTaskCompletedBox bg-red-500">
            <div>
              <Link
                to="/tasks/pending"
                className=" font-bold text-[35px] cursor-pointer"
              >
                Task <br /> Pending <FontAwesomeIcon icon={faArrowRightLong} />
              </Link>
            </div>
          </div>

          {/* Task pending Box */}
          <div className="homeTaskCompletedBox bg-yellow-600">
            <div>
              <Link
                to="/tasks/completed"
                className=" font-bold text-[35px] cursor-pointer"
              >
                Task <br /> Completed{"  "}
                <FontAwesomeIcon icon={faArrowRightLong} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

// Date Function
function getDate(d) {
  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - d);
  return currentDate.toDateString();
}
function getNextDate(d) {
  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + d);
  return currentDate.toDateString();
}
