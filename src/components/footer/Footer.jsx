import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaGithub } from "react-icons/fa";
import logo from "../../assets/logo.png"

const Footer=()=> {
  return (
    <footer className="bg-base-200 border-t border-base-300 text-base-content pt-12">
      {/* Top Section */}
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10">
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
            <Link to="/">
            <img src={logo} alt="Logo" className="w-24 h-24 rounded-xl"/>
            </Link>
          <Link
            to="/"
            className="text-2xl font-extrabold bg-linear-to-r from-[#6A11CB] to-[#2575FC] bg-clip-text text-transparent"
          >
            Freelance<span className="text-black">MarketPlace</span>
          </Link>
          <p className="mt-3 text-sm text-base-content/70 leading-relaxed">
            Your trusted platform to connect skilled freelancers and clients globally.
            Post jobs, find work, and grow together - securely and efficiently.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="text-lg font-bold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-primary" to="/">Home</Link></li>
            <li><Link className="hover:text-primary" to="/allJobs">All Jobs</Link></li>
            <li><Link className="hover:text-primary" to="/addJob">Add a Job</Link></li>
            <li><Link className="hover:text-primary" to="/myAddedJobs">My Added Jobs</Link></li>
            <li><Link className="hover:text-primary" to="/my-accepted-tasks">My Accepted Task</Link></li>
          </ul>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-lg font-bold mb-3">Top Categories</h3>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-primary" to="/allJobs?category=Web Development">Web Development</Link></li>
            <li><Link className="hover:text-primary" to="/allJobs?category=UI/UX Design">UI/UX Design</Link></li>
            <li><Link className="hover:text-primary" to="/allJobs?category=Content Writing">Content Writing</Link></li>
            <li><Link className="hover:text-primary" to="/allJobs?category=Marketing">Digital Marketing</Link></li>
            <li><Link className="hover:text-primary" to="/allJobs?category=Video Editing">Video Editing</Link></li>
          </ul>
        </motion.div>

        {/* Connect with us */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-lg font-bold mb-3">Connect With Us</h3>
          <p className="text-sm text-base-content/70 mb-3">
            Follow us for updates, news, and job insights.
          </p>
          <div className="flex gap-3">
            <a href="#" className="btn btn-sm btn-circle bg-base-300 hover:bg-primary hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="btn btn-sm btn-circle bg-base-300 hover:bg-primary hover:text-white">
              <FaLinkedinIn />
            </a>
            <a href="#" className="btn btn-sm btn-circle bg-base-300 hover:bg-primary hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" className="btn btn-sm btn-circle bg-base-300 hover:bg-primary hover:text-white">
              <FaGithub />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="border-t border-base-300" />

      {/* Bottom bar */}
      <div className="w-11/12 mx-auto flex flex-col md:flex-row justify-between items-center py-5 text-sm text-base-content/70 gap-2">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-base-content">Freelance MarketPlace</span>. All Rights Reserved.
        </p>
        <div className="flex gap-4">
          <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-primary">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;