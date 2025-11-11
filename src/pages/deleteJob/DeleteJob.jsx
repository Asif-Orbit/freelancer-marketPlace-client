import { useEffect, useState, use } from "react";
import { useNavigate, useParams, Link } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/authContexts/AuthContexts";
import AxiosAPI from "../../components/axiosAPI/AxiosAPI";

const fallbackImg = "https://i.ibb.co/G4Y9djWZ/image.png";

const DeleteJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = use(AuthContext);

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await AxiosAPI.get(`/allJobs/${id}`);
        setJob(data);
        if (data?.userEmail && user?.email && data.userEmail !== user.email) {
          setErr("You can only delete your own job.");
        }
      } catch (e) {
        setErr("Failed to load job.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, user?.email]);

  async function handleDelete() {
    if (!user?.email) {
      Swal.fire("Please log in", "", "info");
      return;
    }
    if (err) {
      Swal.fire("Forbidden", err, "error");
      return;
    }

    const result = await Swal.fire({
      title: "Delete this job?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
    });
    if (!result.isConfirmed) return;

    Swal.fire({
      title: "Deleting...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      await AxiosAPI.delete(`/allJobs/${id}`, {
        params: { userEmail: user.email }, 
      });
      await Swal.fire("Deleted!", "Your job has been deleted.", "success");
      navigate("/myAddedJobs");
    } catch (e) {
      await Swal.fire(
        "Error",
        e?.response?.data?.message || "Failed to delete job.",
        "error"
      );
    }
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center">
        <p className="text-error mb-4">{err || "Job not found."}</p>
        <Link to="/myJobs" className="btn btn-outline">
          Back to My Jobs
        </Link>
      </div>
    );
  }

  const postedWhen = job.postedAt
    ? new Date(job.postedAt).toLocaleString("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "—";

  return (
    <div className="w-11/12 lg:w-8/12 mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Delete Job</h1>

      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={job.coverImage || fallbackImg}
              alt={job.title}
              className="w-full md:w-64 h-40 object-cover rounded"
              onError={(e) => (e.currentTarget.src = fallbackImg)}
            />
            <div className="flex-1">
              <h2 className="text-2xl font-semibold">{job.title}</h2>
              <div className="mt-2 text-sm text-base-content/70 space-y-1">
                <p>
                  <span className="font-medium">Category:</span> {job.category}
                </p>
                <p>
                  <span className="font-medium">Posted by:</span> {job.postedBy}{" "}
                  ({job.userEmail})
                </p>
                <p>
                  <span className="font-medium">Posted on:</span> {postedWhen}
                </p>
              </div>
              <p className="mt-3 line-clamp-3 text-base-content/80">
                {job.summary}
              </p>

              {err && <p className="mt-3 text-error">{err}</p>}

              <div className="mt-6 flex gap-3">
                <button onClick={handleDelete} className="btn btn-error">
                  Delete Permanently
                </button>
                <Link to="/myAddedJobs" className="btn">
                  Cancel
                </Link>
              </div>
            </div>
          </div>

          <div className="alert alert-warning mt-6">
            <span>
              This will permanently remove the job and cannot be undone.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeleteJob;
