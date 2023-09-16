import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
const Nav = () => {
  const { token, username, email, dispatch } = useContext(AuthContext);
  const navigate = useNavigate()
  const handleLogout = () => {
    toast.success("You LoggedOut");
    dispatch({ type: "LOGOUT" });
  navigate("/")
  };
  const [toggle, setToggle] = useState(false);

  return (
    <div className=" bg-orange-400 flex justify-between">
      <div className="px-5 py-3 flex gap-4 sm:ml-[30px]">
        <div>
          <img
            src="https://live.staticflickr.com/5252/5403292396_0804de9bcf_b.jpg"
            alt="img"
            className=" w-[50px] h-[50px] object-cover rounded-full "
          />
        </div>
        <div className="leading-5">
          <p className=" opacity-60">{email}</p>
          <h2 className="text-[25px] font-bold capitalize">
            {username ? username : "Login First"}
          </h2>
        </div>
      </div>

      <div className="px-10 py-3 flex justify-center items-center">
        <div className="gap-10 sm:flex hidden mr-[50px] font-semibold text-[18px]">
          <Link to="/">Home </Link>
          <Link to="/addtask">Add Task </Link>
          {token ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </div>

        {/* navigation for small devices */}
        <div className="sm:hidden flex mr-[5px] ">
          {toggle ? (
            <button className=" text-[28px]" onClick={() => setToggle(!toggle)}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          ) : (
            <button onClick={() => setToggle(!toggle)} className=" text-[28px]">
              <FontAwesomeIcon icon={faBars} />
            </button>
          )}

          <div
            className={`${
              toggle ? "flex" : "hidden"
            } absolute top-[74px] right-[2px]`}
          >
            <ul className="flex flex-col bg-slate-800 py-10 pr-10 pl-5 text-white rounded-xl  border-2  border-orange-300">
              <li className=" mx-3 text-lg leading-9">
                <Link
                  to={"/"}
                  className=" cursor-pointer"
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                >
                  Home
                </Link>
              </li>


              <li className=" mx-3 text-lg leading-9">
                <Link
                  to={"/addtask"}
                  className=" cursor-pointer"
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                >
                  Add Task
                </Link>
              </li>


              {!token ? (
                <li className=" mx-3 text-lg leading-9">
                  <Link
                    to={"/login"}
                    className=" cursor-pointer"
                    onClick={() => {
                      setToggle(!toggle);
                    }}
                  >
                    Login
                  </Link>
                </li>
              ) : (
               <>
                <li className="mx-3 text-lg leading-9">
                  <Link to="/tasks/all">All Task</Link>
                </li>
                <li className="mx-3 text-lg leading-9">
                  <button onClick={handleLogout}>Logout</button>
                </li>
               </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
