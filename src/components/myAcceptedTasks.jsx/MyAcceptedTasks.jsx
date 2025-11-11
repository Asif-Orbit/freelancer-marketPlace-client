import { use, useEffect, useState } from "react";
import AxiosAPI from "../axiosAPI/AxiosAPI";
import { Link } from "react-router";
import { CheckCircle, XCircle } from "lucide-react"; 
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/authContexts/AuthContexts";

const fallbackImg = "https://i.ibb.co/cKHhDvdB/image.png";

const MyAcceptedTasks=()=> {
  const { user } = use(AuthContext);
  const [items, setItems] = useState([]);
  const [view, setView] = useState("grid");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!user?.email) return;
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const { data } = await AxiosAPI.get("/acceptedTasks", {
          params: { email: user.email },
        });
        setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setErr("Failed to load accepted tasks.");
      } finally {
        setLoading(false);
      }
    })();
  }, [user?.email]);

  const count = items.length;

  const handleRemove=async(id, label)=> {
    const prev = items;
    setItems((curr) => curr.filter((x) => x._id !== id));
    try {
      await AxiosAPI.delete(`/acceptedTasks/${id}`);
      toast.success(`${label} ✔`);
    } catch (e) {
      setItems(prev);
      toast.error(`Failed to ${label.toLowerCase()}`);
    }
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (err) {
    return <div className="text-center mt-20 text-error">{err}</div>;
  }

  if (!count) {
    return (
      <div className="max-w-3xl mx-auto p-8 text-center">
        <h1 className="text-2xl font-semibold mb-2">My Accepted Tasks</h1>
        <p className="text-base-content/70">You haven’t accepted any tasks yet.</p>
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto px-4 md:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
        <h1 className="text-3xl font-bold">
          My Accepted Tasks <span className="text-primary">({count})</span>
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

      {view === "grid" ? (
        <GridView items={items} onRemove={handleRemove} />
      ) : (
        <TableView items={items} onRemove={handleRemove} />
      )}
    </div>
  );
}

function GridView({ items, onRemove }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((it) => (
        <div key={it._id} className="card bg-base-200 shadow hover:shadow-lg transition">
          <figure className=" bg-base-300 overflow-hidden">
            <img
              src={it.snapshot?.coverImage || fallbackImg}
              alt={it.snapshot?.title}
              className="w-full h-full object-cover"
              onError={(e) => (e.currentTarget.src = fallbackImg)}
              loading="lazy"
            />
          </figure>
          <div className="card-body">
            <div className="flex items-start justify-between gap-3">
              <h2 className="card-title leading-tight">{it.snapshot?.title}</h2>
              <span className="badge badge-primary whitespace-nowrap">
                {it.snapshot?.category}
              </span>
            </div>
            <p className="text-sm text-base-content/80 line-clamp-3">
              {it.snapshot?.summary}
            </p>
            <div className="text-xs text-base-content/70 mt-1">
              <span className="font-medium">Posted by:</span> {it.snapshot?.postedBy} (
              {it.snapshot?.userEmail})
            </div>

            <div className="card-actions justify-end mt-3">
              <Link to={`/allJobs/${it.jobId}`} className="btn btn-sm">
                View Job
              </Link>
              <button
                onClick={() => onRemove(it._id, "Marked as DONE")}
                className="btn btn-sm btn-success"
                title="Done"
              >
                <CheckCircle className="w-4 h-4 mr-1" /> DONE
              </button>
              <button
                onClick={() => onRemove(it._id, "Cancelled")}
                className="btn btn-sm btn-error"
                title="Cancel"
              >
                <XCircle className="w-4 h-4 mr-1" /> CANCEL
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function TableView({ items, onRemove }) {
  return (
    <div className="overflow-x-auto border rounded-lg bg-base-200">
      <table className="table">
        <thead className="bg-base-300">
          <tr>
            <th>#</th>
            <th>Cover</th>
            <th>Title</th>
            <th>Category</th>
            <th>Summary</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, i) => (
            <tr key={it._id}>
              <td>{i + 1}</td>
              <td>
                <div className="avatar">
                  <div className="w-16 rounded">
                    <img
                      src={it.snapshot?.coverImage || fallbackImg}
                      alt={it.snapshot?.title}
                      onError={(e) => (e.currentTarget.src = fallbackImg)}
                      loading="lazy"
                    />
                  </div>
                </div>
              </td>
              <td className="font-medium">{it.snapshot?.title}</td>
              <td>
                <span className="badge badge-primary">{it.snapshot?.category}</span>
              </td>
              <td className="max-w-xs text-sm line-clamp-2" title={it.snapshot?.summary}>
                {it.snapshot?.summary}
              </td>
              <td className="whitespace-nowrap">
                <div className="flex gap-2">
                  <Link to={`/allJobs/${it.jobId}`} className="btn btn-xs">
                    View
                  </Link>
                  <button
                    onClick={() => onRemove(it._id, "Marked as DONE")}
                    className="btn btn-xs btn-success"
                    title="Done"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRemove(it._id, "Cancelled")}
                    className="btn btn-xs btn-error"
                    title="Cancel"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyAcceptedTasks;