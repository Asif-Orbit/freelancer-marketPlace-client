import { motion } from "framer-motion";
import { Link } from "react-router";


const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-br via-[#6A11CB] from-[#9F62F2] to-[#2575FC] text-white">
      {/* floating shapes */}
      <motion.div
        initial={{ y: -30, opacity: 0.3 }}
        animate={{ y: 30, opacity: 0.6 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 6 }}
        className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/10 blur-2xl"
      />
      <motion.div
        initial={{ y: 40, opacity: 0.3 }}
        animate={{ y: -40, opacity: 0.6 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 7 }}
        className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-2xl"
      />

      <div className="w-11/12 mx-auto py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="z-10"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight drop-shadow">
            Freelance MarketPlace - reliable jobs, real talent.
          </h1>
          <p className="mt-4 text-white/90 text-base md:text-lg">
            Post tasks in seconds and hire verified freelancers. We keep things
            fast, secure, and straightforward - so you can focus on getting work
            done.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/addJob" className="btn bg-blue-600 hover:bg-blue-700 text-white shadow-none">
              Create a Job
            </Link>
            <Link
              
              className="btn btn-outline btn-white text-white border-white/60 hover:border-white hover:text-black"
            >
              Why we’re reliable
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="z-10"
        >
          <div className="card bg-white/10 backdrop-blur-md shadow-xl border border-white/20">
            <div className="card-body">
              <h3 className="card-title text-white">
                Post, Match, Collaborate
              </h3>
              <p className="text-white/90">
                Our smart matching and transparent profiles help you quickly
                find the perfect fit for your project — from web dev to design,
                content, marketing, and more.
              </p>
              <ul className="list-disc list-inside text-white/90 space-y-1 mt-2">
                <li>Verified users & clear ratings</li>
                <li>Messaging & progress updates</li>
                <li>Safe server-side timestamps for trust</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default Banner;
