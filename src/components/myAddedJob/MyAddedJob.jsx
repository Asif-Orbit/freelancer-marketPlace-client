import { use, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContexts/AuthContexts";
import AxiosAPI from "../axiosAPI/AxiosAPI";
import { Link } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const CATEGORIES = [
  "Web Development",
  "Digital Marketing",
  "Graphics Designing",
  "UI/UX Design",
  "Content Writing",
  "Mobile Development",
  "Video Editing",
  "Data Analysis",
  "E-commerce Development",
];

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

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;
    try {
      await AxiosAPI.delete(`/allJobs/${id}`, {
        params: { userEmail: user.email },
      });
      setJobs((prev) => prev.filter((j) => j._id !== id));
      toast.success("Job deleted");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to delete job.");
    }
    await Swal.fire({
      title: "Deleted!",
      text: "Your job has been deleted.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  };

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
};

export default MyAddedJobs;
