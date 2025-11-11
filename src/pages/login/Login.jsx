import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { AuthContext } from "../../contexts/authContexts/AuthContexts";

const Login = () => {
  const { signInUser, setLoading} = use(AuthContext);
  const [loginLoading, setLoginLoading] = useState(false);
  const [hide, setHide] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim();

    const password = e.target.password.value.trim();
    if (!email && !password) {
      return toast.error("Please enter your email and password!");
    } else if (!email) {
      return toast.error("Please enter your email!");
    } else if (!password) {
      return toast.error("Please enter your password!");
    }
    setLoginLoading(true);
    signInUser(email, password)
      .then(() => {
        e.target.reset();
        navigate(location.state || "/");
      })
      .catch((error) => {
        setLoading(false)
        if (error.code === "auth/invalid-email") {
          toast.error("❌ Invalid email address!");
        } else if (error.code === "auth/user-not-found") {
          toast.error("❌ No user found with this email!");
        } else if (error.code === "auth/wrong-password") {
          toast.error("❌ Incorrect password!");
        } else {
          toast.error(error.message);
          
        }
      })
      .finally(() => setLoginLoading(false));
  };
  return (
    <div>
      <title>Login Your Account</title>
      {loginLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <span className="loading loading-bars loading-lg text-[#2575FC]"></span>
          <p className="text-white text-lg font-semibold">
            Login Please wait . . . .{" "}
          </p>
        </div>
      )}
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card bg-base-100 lg:w-96  shrink-0 shadow-2xl">
            <div className="card-body">
              <h1 className="text-3xl font-bold">Login now!</h1>
              <form onSubmit={handleLogin} className="fieldset">
                {/* for email */}
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                />
                {/* for password */}
                <div className="relative">
                  <label className="label">Password</label>
                  <input
                    type={hide ? "text" : "password"}
                    name="password"
                    className="input"
                    placeholder="Password"
                  />
                  <span
                    className="absolute right-7 bottom-3 z-40 cursor-pointer text-xl"
                    onClick={(e) => {
                      e.preventDefault(), setHide(!hide);
                    }}
                  >
                    {hide ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
                <div>
                  <button type="button" className="link link-hover">
                    Forgot password?
                  </button>
                </div>

                <button type="submit" className="btn w-full btn-neutral mt-4">
                  Login
                </button>
              </form>
              
              <p className="text-xs">
                You are new here? Please,{" "}
                <Link
                  to={"/register"}
                  className="text-[#2575FC] text-[16px] font-medium hover:text-black hover:underline"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
        <ToastContainer></ToastContainer>
      </div>
    </div>
  );
};

export default Login;
