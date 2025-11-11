import { motion } from "framer-motion";
import { Link } from "react-router";

const About=()=> {
  return (
    <section className="w-11/12 mx-auto py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold">About Freelance MarketPlace</h2>
          <p className="mt-3 text-base-content/80">
            Freelance MarketPlace connects clients with skilled freelancers across
            the globe. Post jobs, review profiles, and collaborate with built-in
            tools that keep everything organized and transparent.
          </p>
          <ul className="mt-4 space-y-2 text-base-content/80">
            <li>• Secure, time-stamped postings</li>
            <li>• Clean API with JWT-ready endpoints</li>
            <li>• Fast UI built on React, Tailwind, and Motion</li>
          </ul>

          <div className="mt-6 flex gap-3">
            <Link to="/allJobs" className="btn bg-blue-600 hover:bg-blue-700 text-white">Browse Jobs</Link>
            <Link to="/addJob" className="btn btn-outline">Post a Job</Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-base-500 text-Black p-4 shadow bg-blue-50"
        >
            <div className="mb-4 text-sm text-black">
            Discover the scale and efficiency of our platform.
          </div>
          <div className="grid grid-cols-3 gap-4 text-black">
            <StatBox label="Active Jobs" value="1,200+"/>
            <StatBox label="Freelancers" value="8,500+"/>
            <StatBox label="Avg. Match Time" value="< 24h"/>
          </div>
          
        </motion.div>
      </div>
    </section>
  );
}

const StatBox=({ label, value })=> {
  return (
    <div className="rounded-xl border border-base-400 p-3 text-center bg-base-50">
      <div className="text-2xl font-extrabold text-black">{value}</div>
      <div className="text-xs text-black mt-1">{label}</div>
    </div>
  );
}

export default About;