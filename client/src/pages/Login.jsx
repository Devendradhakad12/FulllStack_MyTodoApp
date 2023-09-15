import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../utils/features";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";


const Login = () => {
  
  const {dispatch} = useContext(AuthContext)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${url}/auth/login`, userData);
      toast.success(res.data.message);
      dispatch({type:"LOGIN",token:res.data.token})
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message ? error.response.data.message : error.message );
    } finally {
      setLoading(false);
    }
  };


  
  return (
    <div className="mainDiv">
      <div className="loginDiv">
        <h1 className="loginH1">Login</h1>
        <form className="loginForm" onSubmit={handleSubmit}>
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
          <button type="submit" className="lsBtn">
            {loading ? "Login....." :"Login"}
          </button>
        </form>
        <p className="loginP">
          New User? <Link to="/signup">Sign Up</Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
