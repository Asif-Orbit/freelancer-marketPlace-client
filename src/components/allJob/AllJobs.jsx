import { useEffect, useMemo, useState } from "react";
import AxiosAPI from "../axiosAPI/AxiosAPI";
import JobCard from "../jobCard/JobCard";
import NoJobFound from "../../pages/error/NoJobFound";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortOrder, setSortOrder] = useState("newest"); 

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

  // Sort by postedAt
  const sorted = useMemo(() => {
    const copy = [...jobs];
    copy.sort((a, b) => {
      const da = a?.postedAt ? new Date(a.postedAt) : 0;
      const db = b?.postedAt ? new Date(b.postedAt) : 0;
      return sortOrder === "newest" ? db - da : da - db;
    });
    return copy;
  }, [jobs, sortOrder]);

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
        <title>All Jobs</title>
      <div className="w-11/12 mx-auto px-4 md:px-8 py-8">
        {/* Header + Sort */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-center md:text-left">
            All Freelance Jobs <span>({sorted.length})</span>
          </h1>

          <select
            className="select select-bordered w-full md:w-60"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="newest">Sort by: Newest</option>
            <option value="oldest">Sort by: Oldest</option>
          </select>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.length === 0 ? (
            <div className="col-span-full">
              <NoJobFound />
            </div>
          ) : (
            sorted.map((job) => <JobCard key={job._id} job={job} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default AllJobs;
