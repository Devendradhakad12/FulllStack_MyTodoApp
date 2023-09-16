import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { url } from "../utils/features";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useFetchAll } from "../hook/useFetch";
import Loader from "./loader";

const AllTask = ({ location,setProjectCount }) => {

  const { token } = useContext(AuthContext);
  const { task, loading, reFetch,refetchload } = useFetchAll();
  const [allTasks, setAllTasks] = useState([]);
  const [reload, setReload] = useState(false);

  setProjectCount(task?.length)

  // refecth data while updating (checking)
  useEffect(() => {
    if (reload) reFetch();
    if (!loading) setAllTasks(task);
    setReload(false);
  }, [task, reload]);

  // check task
  const handleChange = async (id, check) => {
    try {
      const res = await axios.patch(`${url}/task/${id}`, {
        checked: !check,
        token,
      });
      setReload(true);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  // delete task
  const handleDelete = async(id) => {
    try {
      const res = await axios.delete(`${url}/task/${id}/${token}`);
      setReload(true);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message ? error.response.data.message : error.message );
    }
  }

  if (loading) return <div><Loader/> </div>;
  return (
    <>
      {allTasks[0] ? (
        <>
          {allTasks?.map((t) => {
            return (
              <div className="homeTaskBox bg-orange-400 relative" key={t._id}>
                <div className="flex justify-center gap-5 px-3">
                  <div>
                    <h2 className=" font-semibold text-[20px] capitalize text-center">{t.title}</h2>
                    <p>{t.description}</p>
                  </div>
                </div>
                <div className="absolute bottom-2">
                  <p className="text-[16px]">
                    <span className="font-bold">Created Date:</span>{" "}
                    {new Date(t?.createdAt).toDateString()}
                  </p>
                </div>
                <div className="absolute bottom-10 flex gap-4">
                  <button className="bg-blue-600 text-white edbtn">Edit</button>
              <input
                type="checkbox"
                className=" w-[30px] h-[30px] cursor-pointer"
                checked={t.checked}
                onChange={(e) => {
                  handleChange(t._id, t.checked, e);
                }}
              />
                  <button onClick={()=>{handleDelete(t._id)}} className="bg-red-600 text-white edbtn">
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div>
          <p className=" capitalize">{location} Task Not Available</p>
        </div>
      )}
    </>
  );
};

export default AllTask;
