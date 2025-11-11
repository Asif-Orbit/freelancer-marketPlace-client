import React from "react";
import { Link } from "react-router";

const JobCard = ({ job }) => {
  const {
    _id,
    title,
    category,
    summary,
    coverImage,
    postedAt,
  } = job;

  const fallbackImg = "https://i.ibb.co/G4Y9djWZ/image.png";

  // Format posted date/time
  const formattedDate = postedAt
    ? new Date(postedAt).toLocaleString("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "Date not available";

  return (
    <div className="card bg-base-200 hover:bg-base-300 transition-all shadow-md hover:shadow-xl border border-base-300">
      {/* Cover Image */}
      <figure className="w-full bg-base-300 overflow-hidden rounded-t-xl p-5">
        <img
          src={coverImage || fallbackImg}
          alt={title}
          className="w-full h-72 object-cover rounded-xl transition-transform duration-300 hover:scale-105"
          onError={(e) => (e.currentTarget.src = fallbackImg)}
          loading="lazy"
        />
      </figure>

      {/* Card Body */}
      <div className="card-body">
        <div className="flex items-start justify-between gap-3 mb-1">
          <h2 className="card-title text-lg md:text-xl font-semibold leading-tight">
            {title}
          </h2>
          <span className="badge badge-primary whitespace-nowrap">
            {category}
          </span>
        </div>

        <p className="text-sm text-base-content/80 line-clamp-3">{summary}</p>

        

        <div className="card-actions justify-end mt-3">
            <p>
            <span className="font-medium text-xl text-black">Posted on:</span> <span className="text-black text-xl">{formattedDate}</span>
          </p>
          <Link
            to={`/allJobs/${_id}`}
            className="btn btn-sm btn-primary w-full lg:w-auto hover:bg-black"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
