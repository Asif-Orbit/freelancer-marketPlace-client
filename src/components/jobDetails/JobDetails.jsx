import { use, useEffect, useState } from "react";
import { useParams } from "react-router";
import { FaMapMarkerAlt, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../contexts/authContexts/AuthContexts";
import AxiosAPI from "../axiosAPI/AxiosAPI";
import NoJobFound from "../../pages/error/NoJobFound";
  const fallbackImg = "https://i.ibb.co/G4Y9djWZ/image.png";

const JobDetails = () => {
  const { user } = use(AuthContext);
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const isOwnJob =
    user?.email && job?.userEmail && user.email === job.userEmail;
  const handleAccept = async () => {
    if (isOwnJob) {
      toast.info("You can’t accept your own job.");
      return;
    }
    try {
      const snapshot = {
        title: job.title,
        category: job.category,
        postedBy: job.postedBy,
        userEmail: job.userEmail,
        coverImage: job.coverImage,
        summary: job.summary,
        postedAt: job.postedAt,
      };
      await AxiosAPI.post("/acceptedTasks", {
        jobId: job._id, 
        userEmail: user.email, 
        snapshot,
      });
      toast.success("Task accepted!");
    } catch (e) {
      toast.error("Task Already Accepted!");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await AxiosAPI.get(`/allJobs/${id}`);
        setJob(data);
      } catch (error) {
        console.error("Failed to fetch job details:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);
  if (loading)
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );

  if (!job)
    return (
      <NoJobFound></NoJobFound>
    );
  const {
    title,
    category,
    postedBy,
    userEmail,
    summary,
    description,
    location,
    salaryRange,
    deadline,
    coverImage,
  } = job;

  return (
    <div className="w-11/12 lg:w-9/12 mx-auto p-4 md:p-8">
        <title>Job Details</title>
      <div className="bg-white shadow-xl rounded-xl p-6 mb-8 border-t-4 border-blue-500">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <img
            src={coverImage || fallbackImg}
            alt={title}
            className="w-full md:w-80 h-48 object-cover rounded-lg shadow-md"
          />

          <div className="flex-1">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
              {title}
            </h1>
            <p className="text-xl font-medium text-blue-600 mb-4">{category}</p>

            <div className="grid grid-cols-1  lg:grid-cols-2 gap-4 text-sm text-gray-600 border-t pt-4 mt-4">
              <p className="flex items-center gap-2">
                <FaMoneyBillWave className="text-green-500" />
                <span className="font-semibold">Salary:</span>{" "}
                {salaryRange || "Competitive"}
              </p>
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500" />
                <span className="font-semibold">Location:</span>{" "}
                {location || "Remote/TBD"}
              </p>
              <p className="flex items-center gap-2">
                <FaCalendarAlt className="text-yellow-600" />
                <span className="font-semibold">Deadline:</span>{" "}
                {deadline || "N/A"}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold">Posted By:</span> {postedBy}
              </p>
            </div>

            <div className="mt-6">
              <button
                onClick={handleAccept}
                className="w-full md:w-auto px-10 py-3 bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105"
                title={isOwnJob ? "You can’t accept your own job" : "Accept this job"}
              >
                Accept Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-3 border-b pb-2">
              Job Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          </div>

          {description && (
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-3 border-b pb-2">
                Full Description
              </h2>

              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {description}
              </p>
            </div>
          )}
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500">
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              About the Poster
            </h2>
            <p className="text-lg font-semibold text-gray-700 mb-1">
              {postedBy}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              <span className="font-medium">Contact:</span> {userEmail}
            </p>
            <button className="w-full py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition duration-300">
              View Poster Profile
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Need Help?</h2>
            <p className="text-sm text-gray-600 mb-4">
              Report any suspicious job posting or share this opportunity.
            </p>
            <div className="flex justify-between gap-2">
              <button className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">
                Share
              </button>
              <button className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm">
                Report Job
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default JobDetails;
