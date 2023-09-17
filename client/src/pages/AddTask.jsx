import React, { useContext, useState } from "react";
import Nav from "../components/nav";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { url } from "../utils/features";
import toast from "react-hot-toast";

const AddTask = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { token } = useContext(AuthContext);
  const navigate = useNavigate()

  const hnadleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${url}/task/new`, {
        title,
        description,
        token,
      });
      toast.success(res.data.message)
      navigate("/tasks/all")
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setTitle("")
      setDescription("")
    }
  };

  return (
    <>
      <Nav />
      <div className="mainDiv">
        <div className="loginDiv">
          <h1 className="loginH1">Add Your Task</h1>
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

export default AddTask;
