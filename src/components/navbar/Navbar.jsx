import React, { use } from "react";
import { Link, NavLink } from "react-router";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../contexts/authContexts/AuthContexts";
import { FaUserLarge } from "react-icons/fa6";
import ThemeToggle from "../themeToggle/ThemeToggle";

const Navbar = () => {
  const { user, logOut, loading } = use(AuthContext);

  const links = (
    <>
      <div className="navbar-link space-x-6 text-xl text-black flex flex-col lg:flex-row">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/allJobs">All Jobs</NavLink>
        {user && (
          <div className="space-x-6  flex flex-col lg:flex-row">
            <NavLink to="/addJob">Add a Job</NavLink>
            <NavLink to="/myAddedJobs">My Added Jobs</NavLink>
            <NavLink to="/my-accepted-tasks">My Accepted Tasks</NavLink>
          </div>
        )}
      </div>
    </>
  );
  return loading ? (
    <div className=" flex justify-center items-center fixed inset-0 bg-black bg-opacity-30 z-50">
      <span className="loading loading-bars loading-lg text-[#2575FC]"></span>
    </div>
  ) : (
    <div className="bg-blue-100 shadow-sm">
      <div className="navbar  w-11/12 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to="/" className="font-bold text-xl flex items-center gap-2">
            <img
              src={logo}
              alt="Freelance logo"
              className="w-12 h-12 rounded-full"
            />
            <span className="text-black">
              FL
              <span className="bg-linear-to-r from-[#6A11CB] to-[#2575FC] bg-clip-text text-transparent">
                MP
              </span>
            </span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        <div className="navbar-end">
          {user ? (
            <div className="flex justify-center items-center">
              {user.photoURL ? (
                <div
                  className="tooltip tooltip-bottom"
                  data-tip={user.displayName}
                >
                  <img
                    src={user.photoURL}
                    alt=""
                    className="w-12 h-12 bg-white  p-0.5 rounded-full mr-2 "
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                    }}
                  />
                </div>
              ) : (
                <span>
                  <FaUserLarge className="bg-white text-5xl p-1 rounded-full mr-2" />
                </span>
              )}
              <ThemeToggle></ThemeToggle>
              <button
                onClick={() => logOut()}
                className="text-xl border-2 border-[#9F62F2] px-3 py-1 rounded-sm font-medium bg-linear-to-r from-[#6A11CB] to-[#2575FC] bg-clip-text text-transparent"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="navbar-end">
              <ThemeToggle></ThemeToggle>
              <Link
                to="/login"
                className="text-xl border-2 border-[#9F62F2] px-3 py-1 rounded-sm font-medium bg-linear-to-r from-[#6A11CB] to-[#2575FC] bg-clip-text text-transparent"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="btn  border-none bg-linear-to-r from-[#6A11CB] to-[#2575FC] text-white ml-4 hover:text-black shadow-none md:flex hidden"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
