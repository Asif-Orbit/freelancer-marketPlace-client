import { useEffect, useState } from "react";
import AxiosAPI from "../axiosAPI/AxiosAPI";
import JobCard from "../jobCard/JobCard";
import NoJobFound from "../../pages/error/NoJobFound";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await AxiosAPI.get("/allJobs");
        setJobs(Array.isArray(data) ? data : data?.jobs || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Filter by title
  const filtered = jobs.filter((job) =>
    job.title?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-error font-semibold">{error}</div>
    );
  }

  return (
    <div className="bg-base-200">
        <div className="w-11/12 mx-auto px-4 md:px-8 py-8">
      {/* Header + Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-center md:text-left">
          All Freelance Jobs <span>({filtered.length})</span>
        </h1>

        <label className="input input-bordered flex items-center gap-2 w-full md:w-96">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 opacity-70"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m21 21-4.35-4.35M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
            />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Search job title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
            <div className="col-span-full">
                <NoJobFound></NoJobFound>
            </div>
        ): (
          filtered.map((job) => <JobCard key={job._id} job={job} />)
        )}
      </div>
    </div>
    </div>
  );
};

export default AllJobs;
