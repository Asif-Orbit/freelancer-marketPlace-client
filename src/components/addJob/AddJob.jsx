import { use, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../contexts/authContexts/AuthContexts";
import AxiosAPI from "../axiosAPI/AxiosAPI";

const CATEGORIES = [
  "Web Development",
  "Design",
  "Writing",
  "Marketing",
  "Data & AI",
  "Mobile Apps",
];

const AddJob = () => {
  const { user } = use(AuthContext);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in.");
      return;
    }

    const form = e.target;
    const title = form.title.value.trim();
    const postedBy = user.displayName || "Anonymous";
    const category = form.category.value;
    const summary = form.summary.value.trim();
    const coverImage = form.coverImage.value.trim();
    const userEmail = user.email;

    if (!title || !category || !summary || !coverImage) {
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
      // postedAt set on server
    };

    try {
      setSubmitting(true);
      const { data } = await AxiosAPI.post("/allJobs", newJob);
      // success if insert acknowledged
      if (data?.acknowledged || data?.insertedId || data?.insertedCount >= 0) {
        toast.success("Post added successfully!");
        form.reset();
      } else {
        toast.success("Submitted!"); // fallback
      }
    } catch (err) {
      toast.error(err.message || "Failed to submit");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl md:mx-auto p-4 md:p-8 bg-base-300 mx-5 mt-10 rounded-xl mb-10">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6">Add New Job</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">
            Title<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            className="input input-bordered w-full"
            placeholder="Enter a clear, concise title"
            required
          />
        </div>

        {/* Posted By (read-only) */}
        <div>
          <label className="block mb-1 font-medium">Posted By</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={user?.displayName || "Anonymous"}
            readOnly
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">
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

        {/* Summary */}
        <div>
          <label className="block mb-1 font-medium">
            Summary<span className="text-red-500">*</span>
          </label>
          <textarea
            name="summary"
            className="textarea textarea-bordered w-full min-h-32"
            placeholder="Describe the post in a few sentences"
            required
          />
        </div>

        {/* Cover Image (URL) */}
        <div>
          <label className="block mb-1 font-medium">
            Cover Image URL<span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            name="coverImage"
            className="input input-bordered w-full"
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>

        {/* User Email (read-only) */}
        <div>
          <label className="block mb-1 font-medium">User Email</label>
          <input
            type="email"
            className="input input-bordered w-full"
            value={user?.email || ""}
            readOnly
          />
        </div>

        {/* Submit */}
       <div className="text-center">
         <button
          type="submit"
          className="btn bg-[#2575FC] text-white hover:bg-black w-full text-2xl"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
       </div>
      </form>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default AddJob;
