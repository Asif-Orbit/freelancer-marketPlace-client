import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-4">
      <title>Page Not found</title>
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-[#2575FC] mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-2">Oops! Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
