import React from "react";
import { Link } from "react-router-dom";
const Card = ({ item }) => {
  const { _id, courseName, imageUrl, seat, price, totalEnrolled } = item;

  return (
    <div className="shadow-lg rounded-lg p-3 flex flex-col justify-between border-1 border-secondary overflow-hidden m-4 ">
      <img src={imageUrl} alt="" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{courseName}</h2>
        <p className="text-gray-600 mb-2">Available Seats:{seat}</p>
        <p className="text-gray-600 mb-2">Price:{price}</p>
        <p className="text-gray-600 mb-2">Total Students:{totalEnrolled}</p>
        <Link to={`/class/${_id}`} className="text-center">
          <button className="px-2 py-1 w-full bg-secondary rounded-xl text-white font-bold mt-2">Select</button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
