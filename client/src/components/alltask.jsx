import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { url } from "../utils/features";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useFetchAll } from "../hook/useFetch";
import Loader from "./loader";
import { Link } from "react-router-dom";

const AllTask = ({
  location,
  setProjectCount,
  task,
  loading,
  error,
  reFetch,
}) => {
  const { token } = useContext(AuthContext);
  const [allTasks, setAllTasks] = useState([]);
  const [reload, setReload] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  //console.log(task.reverse())

  // refecth data while updating (checking)
  useEffect(() => {
    setProjectCount(task?.length);
    if (reload) reFetch();
    if (!loading) setAllTasks(task);
    setReload(false);
    setTimeout(() => {
      setCurrentTask(null);
    }, 1000);
  }, [task, reload]);

  // check task (update check status)
  const handleChange = async (id, check) => {
    setCurrentTask(id);
    try {
      const res = await axios.patch(`${url}/task/${id}`, {
        checked: !check,
        token,
      });
      setReload(true);
      if (!reload) toast.success(res.data.message);
    } catch (error) {
      toast.error(
        error?.response?.data?.message
          ? error.response.data.message
          : error.message
      );
      console.log(error);
    }
  };

  // delete task
  const handleDelete = async (id) => {
    setCurrentTask(id);
    try {
      const res = await axios.delete(`${url}/task/${id}/${token}`);
      setReload(true);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message
          ? error.response.data.message
          : error.message
      );
    } finally {
      setCurrentTask(null);
    }
  };

  // handle search
  const [searchInp, setSearchInp] = useState("");
  const handleSearch = (e) => {
    let regexp = new RegExp(e, "i");
    let searcht = task?.filter((t) => {
      return regexp.test(t.title) || regexp.test(t.description);
    });

    setAllTasks(searcht);
  };
  useEffect(() => {
    handleSearch(searchInp);
  }, [searchInp]);
  

  if (loading)
    return (
      <div className="flex justify-center">
        <Loader />{" "}
      </div>
    );
  return (
    <>
      <div className="pb-10 flex justify-center ">
        <input
          type="text"
          value={searchInp}
          onChange={(e) => {
            setSearchInp(e.target.value);
          }}
          className="px-4 py-1 rounded-lg outline-none "
          placeholder="Search Task.."
        />
      </div>
      {allTasks[0] ? (
        <>
            <div className="bg flex gap-5 sm:gap-[40px] justify-center items-center flex-wrap py-1">
          {allTasks?.map((t) => {
            return (
              <div className="homeTaskBox bg-orange-400 relative" key={t._id}>
                <div className="flex justify-center gap-5 px-5">
                  <div>
                    <h2 className=" font-semibold text-[20px] capitalize text-center">
                      {t.title}
                    </h2>
                    <p className="">{t.description}</p>
                  </div>
                </div>

                {/* task update and delete buttons */}
                <div className="absolute bottom-10 flex gap-4">
                  <Link
                    to={`/edittask/${t._id}`}
                    className="bg-blue-600 text-white edbtn"
                  >
                    Edit
                  </Link>
                  {currentTask === t._id ? (
                    <Loader wh={"60px"} />
                  ) : (
                    <input
                      type="checkbox"
                      className=" w-[30px] h-[30px] cursor-pointer"
                      checked={t.checked}
                      onChange={(e) => {
                        handleChange(t._id, t.checked, e);
                      }}
                    />
                  )}
                  <button
                    onClick={() => {
                      handleDelete(t._id);
                    }}
                    className="bg-red-600 text-white edbtn"
                  >
                    Delete
                  </button>
                </div>

                {/* task created date */}
                <div className="absolute bottom-2">
                  <p className="text-[16px]">
                    <span className="font-bold">Created Date:</span>{" "}
                    {new Date(t?.createdAt).toDateString()}
                  </p>
                </div>
              </div>
            );
          })}
          </div>
        </>
      ) : (
        <div className="flex justify-center">
          <p className=" capitalize">
            {" "}
            {error ? <> {error} </> : <> {location} Task Not Available </>}{" "}
          </p>
        </div>
        
      )}
    </>
  );
};

export default AllTask;
