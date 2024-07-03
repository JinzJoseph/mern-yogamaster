import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUsers, FaCopy, FaChalkboardTeacher } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { MdPendingActions } from "react-icons/md";

const AdminStats = ({ users }) => {
  const [data, setData] = useState({});
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/admin-stats")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
        <div className="p-4 bg-green-400">
          <FaUsers className="h-12 w-12 text-white" />
        </div>
        <div className="px-4 text-gray-700">
          <h3 className="text-sm tracking-wider">Total Members</h3>
          <p className="text-3xl">{users.length}</p>
        </div>
      </div>
      <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
        <div className="p-4 bg-red-400">
          <FaCopy className="h-12 w-12 text-white" />
        </div>
        <div className="px-4 text-gray-700">
          <h3 className="text-sm tracking-wider">Approved Classes</h3>
          <p className="text-3xl">{data.approvedClasses}</p>
        </div>
      </div>
      <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
        <div className="p-4 bg-blue-400">
          <FaChalkboardTeacher className="h-12 w-12 text-white" />
        </div>
        <div className="px-4 text-gray-700">
          <h3 className="text-sm tracking-wider">Total Instructors</h3>
          <p className="text-3xl">{data.instructor}</p>
        </div>
      </div>
      <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
        <div className="p-4 bg-yellow-400">
          <MdPendingActions className="h-12 w-12 text-white" />
        </div>
        <div className="px-4 text-gray-700">
          <h3 className="text-sm tracking-wider">Total Pending Classes</h3>
          <p className="text-3xl">{data.pendingClasses}</p>
        </div>
      </div>
      <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
        <div className="p-4 bg-pink-400">
          <CiBookmark className="h-12 w-12 text-white" />
        </div>
        <div className="px-4 text-gray-700">
          <h3 className="text-sm tracking-wider">Total Classes</h3>
          <p className="text-3xl">{data.totalClasses}</p>
        </div>
      </div>
      <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
        <div className="p-4 bg-gray-600">
          <CiBookmark className="h-12 w-12 text-white" />
        </div>
        <div className="px-4 text-gray-700">
          <h3 className="text-sm tracking-wider">Total Enrolled</h3>
          <p className="text-3xl">{data.totalEnrolled}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
