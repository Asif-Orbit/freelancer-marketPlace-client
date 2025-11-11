import { use, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContexts/AuthContexts";
import AxiosAPI from "../axiosAPI/AxiosAPI";
import { Link } from "react-router";

const MyAddedJobs = () => {
  const { user } = use(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
  }, [user]);

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
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-3xl font-bold">
          My Added Jobs <span className="text-primary">({jobs.length})</span>
        </h1>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center mt-20 text-gray-500 text-lg">
          You haven’t added any jobs yet.
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
                  <td className="max-w-xs text-sm truncate">
                    {job.summary || "—"}
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <Link
                        to={`/allJobs/${job._id}`}
                        className="btn btn-xs btn-primary"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="btn btn-xs btn-error"
                      >
                        Delete
                      </button>
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

  async function handleDelete(id) {
    const confirm = window.confirm("Are you sure you want to delete this job?");
    if (!confirm) return;
    try {
      await AxiosAPI.delete(`/allJobs/${id}`);
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete job.");
    }
  }
};

export default MyAddedJobs;
