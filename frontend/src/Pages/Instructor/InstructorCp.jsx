import React from "react";
import img from "../../assets/dashboard/jaconda-14.png";

const InstructorCp = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-blue-700">
            Instructor Dashboard
          </h1>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <img src={img} alt="Dashboard Graphic" className="w-full md:w-1/2 mb-4 md:mb-0" />
          <div className="md:ml-6 text-center md:text-left">
            <p className="text-gray-700 text-lg">
              Welcome to your dashboard! Here you can manage your courses, view
              statistics, and more.
            </p>
            <button className="mt-4 px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 focus:outline-none">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorCp;
