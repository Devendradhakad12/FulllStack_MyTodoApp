import React, { useContext, useEffect, useState } from "react";
import Nav from "../components/nav";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { url } from "../utils/features";
import toast from "react-hot-toast";
import { useFetchAll } from "../hook/useFetch";

const EditTask = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { task } = useFetchAll();
  const { token } = useContext(AuthContext);
  const id = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();
  const currentTask = task.filter((t) => {
    return t._id === id;
  });
  
  useEffect(() => {
    setTitle(currentTask[0]?.title);
    setDescription(currentTask[0]?.description);
  }, [task]);

  const hnadleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.patch(`${url}/task/${id}`, {
        title,
        description,
        checked:currentTask[0]?.checked,
        token,
      });
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setTitle("");
      setDescription("");
      navigate("/tasks/all");
    }
  };

  return (
    <>
      <Nav />
      <div className="mainDiv">
        <div className="loginDiv">
          <h1 className="loginH1">Edit Your Task</h1>
          <form className="loginForm py-10" onSubmit={hnadleSubmit}>
            <input
              type="text"
              placeholder="Task Title"
              className="formInput"
              required
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <textarea
              row={100}
              placeholder="Task Description"
              className="formInput"
              required
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            <button type="submit" className="lsBtn">
              {loading ? "Submit..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditTask;
