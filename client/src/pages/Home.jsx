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
 
const Home = () => {

  // find user and set it into  localStorage with the help of useContext
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

  // fetch task and  task completion percentage
  const { task, taskCompletion, loading } = useFetchAll();

  return (
    <>
      <Nav />

      <div className="h-full bg">
        {/* Heading Div */}
        <div className="md:pl-10 pl-[56px] pt-7 pb-6">
          <h1 className=" font-bold text-[50px] md:w-[40%]  m-auto">
            Your <br /> Projects ({task?.length})
          </h1>
        </div>


        {/* Add task button */}
        <div className="flex justify-center items-center">
          <Link to="/addtask" className="btn">
            Add Task
          </Link>
        </div>

        {/* progress bar */}
        <div className="pt-10 md:w-[60%] w-[80%] flex justify-center m-auto">
          <div className="progressBarOutside flex relative">
            <div
              className={`progressBarInside bg-green-700 text-slate-900 `}
              style={{
                width: `${taskCompletion}%`,
                display: `${taskCompletion === 0 ? "none" : "inline"}`,
              }}
            ></div>
            {taskCompletion !== NaN ? (
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

