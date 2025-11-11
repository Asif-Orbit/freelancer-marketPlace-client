import { use, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContexts/AuthContexts";
import AxiosAPI from "../axiosAPI/AxiosAPI";
import { Link } from "react-router";

const MyAddedJob = () => {
  const { user } = use(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [view, setView] = useState("grid");

  useEffect(() => {
    if (!user?.email) return;
    (async () => {
      try {
        setLoading(true);
        const { data } = await AxiosAPI.get("/myAddedJobs", {
          params: { email: user.email },
        });
        setJobs(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Failed to load your added jobs.");
      } finally {
        setLoading(false);
      }
    })();
  }, [user?.email]);

  if (loading) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-20 text-error">{error}</div>;
  }

  return (
    <div className="w-11/12 mx-auto px-4 md:px-8 py-8">
      <title>My Added Jobs</title>
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-3xl font-bold">
          My Added Jobs <span className="text-primary">({jobs.length})</span>
        </h1>

        <div className="join">
          <button
            className={`btn join-item ${view === "grid" ? "btn-primary" : ""}`}
            onClick={() => setView("grid")}
          >
            Grid
          </button>
          <button
            className={`btn join-item ${view === "table" ? "btn-primary" : ""}`}
            onClick={() => setView("table")}
          >
            Table
          </button>
        </div>
      </div>
      {jobs.length === 0 ? (
        <div className="text-center mt-20 text-gray-500 text-lg">
          You haven’t added any jobs yet.
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="card bg-base-200 shadow hover:shadow-lg transition border border-base-300"
            >
              <figure className=" w-full bg-base-300 overflow-hidden rounded-t-xl p-5">
                <img
                  src={job.coverImage || "https://i.ibb.co/cKHhDvdB/image.png"}
                  alt={job.title}
                  className="w-full h-72 object-cover rounded-xl transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://i.ibb.co/cKHhDvdB/image.png")
                  }
                />
              </figure>
              <div className="card-body">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="card-title text-lg">{job.title}</h2>
                  <span className="badge badge-primary whitespace-nowrap">
                    {job.category}
                  </span>
                </div>

                <p className="text-sm text-base-content/80 line-clamp-3">
                  {job.summary || "—"}
                </p>

                <div className="text-xs text-base-content/70 mt-2">
                  <span className="font-medium">Posted:</span>{" "}
                  {job.postedAt
                    ? new Date(job.postedAt).toLocaleString("en-GB", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })
                    : "—"}
                </div>

                <div className="card-actions justify-end mt-3">
                  <Link to={`/allJobs/${job._id}`} className="btn btn-sm">
                    View
                  </Link>
                  <Link
                    to={`/updateJob/${job._id}`}
                    className="btn btn-sm btn-info"
                  >
                    Update
                  </Link>
                  <Link
                    to={`/deleteJob/${job._id}`}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto border rounded-lg shadow bg-base-200">
          <table className="table table-zebra w-full">
            <thead className="bg-base-300 text-base font-semibold">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Category</th>
                <th>Posted Date</th>
                <th>Summary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr key={job._id}>
                  <td>{index + 1}</td>
                  <td className="font-semibold">{job.title}</td>
                  <td>
                    <span className="badge badge-primary badge-outline">
                      {job.category}
                    </span>
                  </td>
                  <td>
                    {job.postedAt
                      ? new Date(job.postedAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "—"}
                  </td>
                  <td className="max-w-xs text-sm truncate" title={job.summary}>
                    {job.summary || "—"}
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <Link to={`/allJobs/${job._id}`} className="btn btn-xs">
                        View
                      </Link>
                      <Link
                        to={`/updateJob/${job._id}`}
                        className="btn btn-xs btn-info"
                      >
                        Update
                      </Link>
                      <Link
                        to={`/deleteJob/${job._id}`}
                        className="btn btn-xs btn-error"
                      >
                        Delete
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyAddedJob;
