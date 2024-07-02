import React, { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import moment from "moment";

const MyClass = () => {
  const [classes, setClasses] = useState([]);
  const { currentUser, isLoading } = useUser();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (currentUser?.email) {
      axiosSecure
        .get(`/classes/${currentUser.email}`)
        .then((res) => {
          setClasses(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [currentUser, axiosSecure]);

  const handleFeedBack = (id) => {
    // Handle feedback action
  };

  const handleDetails = (id) => {
    // Handle details action
  };

  return (
    <div className="my-9">
      <h1 className="text-4xl text-center font-bold">
        My <span className="text-secondary">Class</span>
      </h1>
      <p className="text-[12px] text-center my-2">
        Here you can see the classes added by you and their status.
      </p>

      {classes.length === 0 ? (
        <div className="text-center text-2xl font-bold mt-10">
          You don't have any class yet....
        </div>
      ) : (
        <div className="space-y-5">
          {classes.map((cls, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row bg-white rounded-lg shadow p-4 gap-8 hover:ring ring-secondary duration-200 focus:ring"
            >
              <img
                src={cls.imageUrl}
                alt={cls.courseName}
                className="max-h-[200px] max-w-full md:max-w-[300px] rounded"
              />
              <div className="flex flex-col w-full">
                <h2 className="text-[21px] font-bold text-secondary border-b pb-2 mb-2 capitalize">
                  {cls.courseName}
                </h2>
                <div className="flex flex-col md:flex-row md:justify-between">
                  <div>
                    <h1 className="font-bold mb-3">Some Info:</h1>
                    <p className="text-secondary my-2">
                      <span className="text-black">Total Students: </span>
                      {cls.totalenrolled || 0}
                    </p>
                    <p className="text-secondary my-2">
                      <span className="text-black">Status: </span>
                      <span
                        className={`font-bold ${
                          cls.status === "pending"
                            ? "text-orange-400"
                            : cls.status === "checking"
                            ? "text-yellow-400"
                            : cls.status === "approved"
                            ? "text-green-500"
                            : "text-red-600"
                        }`}
                      >
                        {cls.status}
                      </span>
                    </p>
                  </div>
                  <div>
                    <h1 className="font-bold mb-3">Details:</h1>
                    <p className="text-secondary">
                      <span className="text-black">Price: </span>
                      {cls.price} $
                    </p>
                    <p className="text-secondary my-2">
                      <span className="text-black">Submitted: </span>
                      {cls.submitted
                        ? moment(cls.submitted).format("MMMM Do YYYY")
                        : "Not Get Date"}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <h1 className="font-bold mb-3">Action:</h1>
                  <div className="flex flex-col md:flex-row gap-2">
                    <button
                      onClick={() => handleFeedBack(cls._id)}
                      className="px-3 bg-orange-500 font-bold py-1 text-white rounded-lg"
                    >
                      View Feedback
                    </button>
                    <button
                      onClick={() => handleDetails(cls._id)}
                      className="px-3 bg-green-500 font-bold py-1 text-white rounded-lg"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => navigate(`/dashboard/update/${cls._id}`)}
                      className="px-3 bg-secondary font-bold py-1 text-white rounded-lg"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyClass;
