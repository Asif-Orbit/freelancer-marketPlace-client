import { use, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../contexts/authContexts/AuthContexts";
import AxiosAPI from "../axiosAPI/AxiosAPI";

const CATEGORIES = [
  "Web Dev",
  "Marketing",
  "Design",
  "UI/UX Design",
  "Writing",
  "Video Editing",
  "E-commerce",
  "Others",
];

const AddJob = () => {
  const { user } = use(AuthContext);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to post a job.");
      return;
    }

    const form = e.target;
    const title = form.title.value.trim();
    const postedBy = user.displayName || "Anonymous";
    const category = form.category.value;
    const summary = form.summary.value.trim();
    const coverImage = form.coverImage.value.trim();
    const userEmail = user.email;
    const salaryRange = form.salaryRange.value.trim();
    const location = form.location.value.trim();
    const deadline = form.deadline.value; 

    if (
      !title ||
      !category ||
      !summary ||
      !coverImage ||
      !salaryRange ||
      !location ||
      !deadline
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const newJob = {
      title,
      postedBy,
      category,
      summary,
      coverImage,
      userEmail,
      salaryRange,
      location,
      deadline,
    };

    try {
      setSubmitting(true);
      const { data } = await AxiosAPI.post("/allJobs", newJob);
      if (data?.acknowledged || data?.insertedId || data?.insertedCount >= 0) {
        toast.success("Job posted successfully!");
        form.reset();
      } else {
        toast.success("Submitted! (Confirmation pending)"); 
      }
    } catch (err) {
      console.error("Submission error:", err);
      toast.error(err.message || "Failed to submit the job post.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl md:mx-auto p-4 md:p-8 bg-base-300 mx-5 mt-10 rounded-xl mb-10 shadow-lg">
      <title>Add Job</title>
      <h1 className="text-2xl md:text-3xl font-semibold mb-6 border-b pb-2 text-base-content">
        Add New Job
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Job Title<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            className="input input-bordered w-full"
            placeholder="e.g., Senior React Developer"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Category<span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              className="select select-bordered w-full"
              defaultValue=""
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
            <label className="block mb-1 font-medium text-gray-700">
              Posted By
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-100 text-black cursor-not-allowed"
              value={user?.displayName || "Anonymous"}
              readOnly
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Salary Range (USD)<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="salaryRange"
              className="input input-bordered w-full"
              placeholder="$50k - $80k / year"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Location / Type<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="location"
              className="input input-bordered w-full"
              placeholder="e.g., Remote, Berlin, CA"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Deadline<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="deadline"
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Job Summary/Description<span className="text-red-500">*</span>
          </label>
          <textarea
            name="summary"
            className="textarea textarea-bordered w-full min-h-32"
            placeholder="Describe the job requirements, responsibilities, and benefits."
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Cover Image URL<span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            name="coverImage"
            className="input input-bordered w-full"
            placeholder="https://example.com/company_logo.png"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Poster Email
          </label>
          <input
            type="email"
            className="input input-bordered w-full bg-gray-100 text-black cursor-not-allowed"
            value={user?.email || ""}
            readOnly
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="btn bg-blue-600 text-white hover:bg-blue-700 w-full text-lg md:text-xl font-bold transition duration-300"
            disabled={submitting}
          >
            {submitting ? "Submitting Job Post..." : "Publish Job Post"}
          </button>
        </div>
      </form>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default AddJob;
