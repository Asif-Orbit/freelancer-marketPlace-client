import { useState, use, useEffect } from "react";
import { toast } from "react-toastify";
import AxiosAPI from "../../components/axiosAPI/AxiosAPI";
import { AuthContext } from "../../contexts/authContexts/AuthContexts";
import { Link, useNavigate, useParams } from "react-router";

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

const UpdateJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = use(AuthContext);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");
  const [form, setForm] = useState({
    title: "",
    category: "",
    postedBy: "",
    salaryRange: "",
    location: "",
    deadline: "", 
    summary: "",
    description: "",
    coverImage: "",
    posterEmail: "",
  });

  // Load job
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await AxiosAPI.get(`/allJobs/${id}`);
        // owner guard on client (server also enforces)
        if (data?.userEmail && user?.email && data.userEmail !== user.email) {
          setErr("You can only edit your own job.");
          return;
        }
        setForm({
          title: data.title || "",
          category: data.category || "",
          postedBy: data.postedBy || "",
          salaryRange: data.salaryRange || "",
          location: data.location || "",
          deadline: data.deadline
            ? new Date(data.deadline).toISOString().slice(0, 10)
            : "",
          summary: data.summary || "",
          description: data.description || "",
          coverImage: data.coverImage || "",
          posterEmail: data.userEmail || user?.email || "",
        });
      } catch (e) {
        setErr("Failed to load job.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, user?.email]);

  const onChange=(e)=> {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  const onSubmit=async(e)=> {
    e.preventDefault();
    if (!user?.email) {
      toast.error("Please log in.");
      return;
    }
    try {
      setSubmitting(true);
      const payload = { ...form, userEmail: user.email }; // server checks ownership
      const { data } = await AxiosAPI.patch(`/allJobs/${id}`, payload);
      if (data?.modifiedCount >= 0) {
        toast.success("Job updated");
        navigate("/myAddedJobs"); // or back to details: `/allJobs/${id}`
      } else {
        toast.info("No changes made");
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to update job");
    } finally {
      setSubmitting(false);
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
    return (
      <div className="max-w-xl mx-auto p-6 text-center">
        <p className="text-error mb-4">{err}</p>
        <Link className="btn btn-outline" to="/myAddedJobs">
          Back to My Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="w-11/12 lg:w-9/12 mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Job Posting</h1>
      <form onSubmit={onSubmit} className="space-y-5">
        {/* Row 1 */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label">
              Job Title<span className="text-error">*</span>
            </label>
            <input
              name="title"
              value={form.title}
              onChange={onChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="label">Posted By</label>
            <input
              name="postedBy"
              value={form.postedBy}
              onChange={onChange}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="label">
              Category<span className="text-error">*</span>
            </label>
            <select
              name="category"
              value={form.category}
              onChange={onChange}
              className="select select-bordered w-full"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">
              Salary Range (USD)<span className="text-error">*</span>
            </label>
            <input
              name="salaryRange"
              value={form.salaryRange}
              onChange={onChange}
              className="input input-bordered w-full"
              placeholder="$50k - $80k / year"
              required
            />
          </div>
          <div>
            <label className="label">
              Location / Type<span className="text-error">*</span>
            </label>
            <input
              name="location"
              value={form.location}
              onChange={onChange}
              className="input input-bordered w-full"
              placeholder="e.g., Remote, Berlin, CA"
              required
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="label">
              Deadline<span className="text-error">*</span>
            </label>
            <input
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={onChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="label">
              Cover Image URL<span className="text-error">*</span>
            </label>
            <input
              name="coverImage"
              value={form.coverImage}
              onChange={onChange}
              className="input input-bordered w-full"
              placeholder="https://..."
              required
            />
          </div>
        </div>

        {/* Summary / Description */}
        <div>
          <label className="label">
            Job Summary / Description<span className="text-error">*</span>
          </label>
          <textarea
            name="summary"
            value={form.summary}
            onChange={onChange}
            className="textarea textarea-bordered w-full min-h-32"
            required
          />
        </div>
        <div>
          <label className="label">Full Description (optional)</label>
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            className="textarea textarea-bordered w-full min-h-32"
          />
        </div>

        {/* Poster email (read-only or editable—your call) */}
        <div>
          <label className="label">Poster Email</label>
          <input
            name="posterEmail"
            value={form.posterEmail}
            onChange={onChange}
            className="input input-bordered w-full"
            readOnly
          />
        </div>

        <div className="flex gap-3">
          <Link to="/myJobs" className="btn">
            Cancel
          </Link>
          <button
            type="submit"
            className={`btn btn-primary ${submitting ? "btn-disabled" : ""}`}
          >
            {submitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default UpdateJob;
