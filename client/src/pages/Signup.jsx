import React, { useContext, useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../utils/features";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const Signup = () => {
  const { dispatch } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  // sign up
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${url}/auth/register`, userData);
      toast.success(res.data.message);
      dispatch({ type: "LOGIN", token: res.data.token });
      navigate("/");
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data.message ? error.response.data.message : error.message );
    } finally {
      setLoading(false);
    }
  };

 
  return (
    <div className="mainDiv">
      <div className="loginDiv">
        <h1 className="loginH1">Sign Up</h1>
        <form className="loginForm" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Your Name"
            className="formInput"
            required
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
            value={userData.username}
          />
          <input
            type="email"
            placeholder="Enter Your Email"
            className="formInput"
            required
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            value={userData.email}
          />
          <input
            type="password"
            placeholder="Enter Your Password"
            className="formInput"
            required
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            value={userData.password}
          />
          <input
            type="password"
            placeholder="Enter Your Password"
            className="formInput"
            required
            onChange={(e) =>
              setUserData({ ...userData, passwordConfirmation: e.target.value })
            }
            value={userData.passwordConfirmation}
          />
          <button type="submit" className="lsBtn">
            {loading ? "Sign Up........" : "Sign Up"}
          </button>
        </form>
        <p className="loginP">
          New User? <Link to="/login">Login</Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Signup;
