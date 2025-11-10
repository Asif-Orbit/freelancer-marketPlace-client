import React, { use } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../contexts/authContexts/AuthContexts";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation()
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-bars loading-lg text-[#2575FC]"></span>
      </div>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate state={location?.pathname} to={"/login"}></Navigate>;
};

export default PrivateRoute;
