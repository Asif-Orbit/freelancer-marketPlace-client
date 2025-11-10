import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/authContexts/AuthContexts";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import { toast, ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Register = () => {
  const { createUser, signInWithGoogle, setUser } = use(AuthContext);
  const [loading, setLoading] = useState(false);
  const [hide, setHide] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();

    setError("");
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const minLength = 6;
    const password = e.target.password.value.trim();
    const name = e.target.name.value;
    const email = e.target.email.value.trim();
    const photoURL = e.target.photoURL.value.trim();
    if (!email && !password) {
      return toast.error("Please enter your email and password!");
    } else if (!email) {
      return toast.error("Please enter your email!");
    } else if (!password) {
      return toast.error("Please enter your password!");
    }
    if (!uppercase.test(password)) {
      return setError(
        "❌ Password must contain at least one uppercase letter."
      );
    }

    if (!lowercase.test(password)) {
      return setError(
        "❌ Password must contain at least one lowercase letter."
      );
    }

    if (password.length < minLength) {
      return setError("❌ Password must be at least 6 characters long.");
    }
    setLoading(true);

    createUser(email, password)
      .then(() => {
        e.target.reset();
        navigate("/");
        updateProfile(auth.currentUser, { displayName: name, photoURL })
          .then(() => {
            setUser({
              ...auth.currentUser,
              displayName: name,
              photoURL: photoURL,
            });
          })
          .catch((err) => setError(err));
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          toast.error("❌ This email is already registered!");
        } else if (error.code === "auth/invalid-email") {
          toast.error("❌ Invalid email format!");
        } else if (error.code === "auth/weak-password") {
          toast.error("❌ Password must be at least 6 characters long!");
        } else {
          toast.error(error.message);
        }
      })
      .finally(() => setLoading(false));
  };
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => navigate("/"))
      .catch((error) => toast.error(error));
  };
  return (
    <div>
      <title>Register Your Account</title>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <span className="loading loading-bars loading-lg text-[#2575FC]"></span>
          <p className="text-white text-lg font-semibold">
            Registering Your Account Please Wait . . . .
          </p>
        </div>
      )}
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card bg-base-100 lg:w-96  shrink-0 shadow-2xl">
            <div className="card-body">
              <h1 className="text-3xl font-bold">Register now!</h1>
              <form onSubmit={handleRegister}>
                <fieldset className="fieldset">
                  {/* for name */}
                  <label className="label">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    className="input"
                    placeholder="Your Name"
                  />
                  {/* for email  */}
                  <label className="label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="input"
                    placeholder="Email"
                  />
                  {/* for photoURL */}
                  <label className="label">Your PhotoURL</label>
                  <input
                    type="text"
                    name="photoURL"
                    className="input"
                    placeholder="Your PhotoURL"
                  />
                  {/* for password  */}
                  <div className="relative">
                    <label className="label">Password</label>
                    <input
                      type={hide ? "text" : "password"}
                      className="input"
                      placeholder="Password"
                      name="password"
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
                    {" "}
                    <p className="text-red-500">{error}</p>
                  </div>
                  <button type="submit" className="btn w-full btn-neutral mt-4">
                    Register
                  </button>
                </fieldset>
              </form>
              <button
                onClick={handleGoogleSignIn}
                className="btn bg-white text-black border-[#e5e5e5]"
              >
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                Sign In with Google
              </button>
              <p className="text-xs">
                Already have an account? Please{" "}
                <Link
                  to={"/login"}
                  className="text-[#2575FC] text-[16px] font-medium hover:text-black hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Register;
