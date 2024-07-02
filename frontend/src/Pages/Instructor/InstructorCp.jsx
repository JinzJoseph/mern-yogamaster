import React from "react";
import img from "../../assets/dashboard/jaconda-14.png";
const InstructorCp = () => {
  return (
    <div className="items-center justify-center">
      <div className="   ">
        <div className=" ">
          <h1 className="text-3xl font-bold text-blue-700 ">
            Instructor DashBoard
          </h1>
        </div>
        <img src={img} alt="" className="md:w-1/2 " />
      </div>
    </div>
  );
};

export default InstructorCp;
