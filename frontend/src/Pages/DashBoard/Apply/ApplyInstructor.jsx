import React, { useEffect, useState } from "react";
import useUser from "../../../hooks/useUser";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { RingLoader } from "react-spinners";
import { MdEmail } from "react-icons/md";
import { FiBriefcase, FiSend } from "react-icons/fi";
import { FaUser } from "react-icons/fa";

const ApplyInstructor = () => {
  const { currentUser } = useUser();
  const [submittedData, setSubmittedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosFetch = useAxiosSecure();

  useEffect(() => {
    if (currentUser?.email) {
      axiosFetch
        .get(`/applied-instructors/${currentUser.email}`)
        .then((res) => {
          setSubmittedData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [currentUser, axiosFetch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const experience = e.target.experience.value;

    axiosFetch
      .post("/apply-instructor", { name: currentUser.name, email: currentUser.email, experience })
      .then((res) => {
        console.log(res)
        setSubmittedData(res.data);
        alert("Application submitted successfully!");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to submit application. Please try again.");
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader color="blue" size={80} />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-4xl text-center font-bold">Apply As <span className="text-blue-600 ">Instructor</span></h1>
      {!submittedData?.name && (
        <div className="flex flex-col w-full space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="w-full">
              <label className="text-gray-700">Name</label>
              <div className="flex items-center mt-2">
                <FaUser className="text-gray-500" />
                <input
                  disabled
                  readOnly
                  className="ml-2 w-full border-gray-300 focus:border-secondary outline-none"
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={currentUser?.name}
                />
              </div>
            </div>
            <div className="w-full">
              <label className="text-gray-700">Email</label>
              <div className="flex items-center mt-2">
                <MdEmail className="text-gray-500" />
                <input
                  disabled
                  readOnly
                  className="ml-2 w-full border-gray-300 focus:border-secondary outline-none"
                  type="text"
                  id="email"
                  name="email"
                  defaultValue={currentUser?.email}
                />
              </div>
            </div>
            <div className="w-full">
              <label className="text-gray-700">Experience</label>
              <div className="flex items-center mt-1">
                <FiBriefcase className="text-gray-500" />
                <textarea
                  className="ml-2 rounded-g px-2 placeholder:text-sm py-1 w-full border border-gray-300 focus:border-secondary outline-none resize-none"
                  id="experience"
                  name="experience"
                  required
                />
              </div>
            </div>
            <div className="text-center flex justify-center mt-4">
              <button
                type="submit"
                className="flex items-center px-4 py-2 bg-secondary text-white rounded-md focus:outline-none"
              >
                <FiSend className="mr-2" />
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ApplyInstructor;
