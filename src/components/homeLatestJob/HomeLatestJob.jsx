import { useEffect, useState } from "react";
import AxiosAPI from "../axiosAPI/AxiosAPI";
import { Link } from "react-router";
import { motion } from "framer-motion";
import JobCard from "../jobCard/JobCard";

const  HomeLatestJob=()=> {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const { data } = await AxiosAPI.get("/allJobs", {
          params: { sort: "newest", limit: 6 },
        });

        let list = Array.isArray(data) ? data : data?.jobs || [];
        list = list
          .slice()
          .sort((a, b) => new Date(b.postedAt || 0) - new Date(a.postedAt || 0))
          .slice(0, 6);

        setJobs(list);
      } catch (e) {
        console.error(e);
        setErr("Failed to load latest jobs.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="w-11/12 mx-auto py-12 md:py-16">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Latest Jobs</h2>
          <p className="text-base-content/70">Fresh opportunities posted by clients.</p>
        </div>
        <Link to="/allJobs" className="btn btn-sm md:btn-md">
          View All
        </Link>
      </div>

      {loading ? (
        <div className="min-h-40 grid place-items-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : err ? (
        <div className="text-center text-error">{err}</div>
      ) : jobs.length === 0 ? (
        <div className="text-center text-base-content/60">No jobs yet. Be the first to post!</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            jobs.map(job=><JobCard key={job._id} job={job}></JobCard>)
          }
        </div>
      )}
    </section>
  );
}

export default HomeLatestJob;