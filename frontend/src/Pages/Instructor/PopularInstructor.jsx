import React, { useEffect, useState } from "react";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import img from "../../assets/home/girl.jpg";
const PopularInstructor = () => {
  const axiosFetch = useAxiosFetch();
  const [instructors, setinstructors] = useState([]);
  useEffect(() => {
    const fetchInstructor = async () => {
      const res = await axiosFetch.get("/popular-instructors");
      console.log(res.data);
      setinstructors(res.data);
    };
    fetchInstructor();
  }, []);
  return (
    <div>
      <div className="md:w-[80%] mx-auto my-36">
        <h1 className="text-5xl font-bold text-center dark:text-white">
          Our <span className="text-secondary">Best</span> Instructor's
        </h1>
        <div className="w-[40%] text-center mx-auto my-4">
          <p className="text-grey-500 dark:text-white">
            Explore our popular Instructor.Here is some popular Instructor based
            on How many student enrolled
          </p>
        </div>
      </div>

      {instructors ? (
        <>
          <div className="w-[90%] grid mb-10 md:grid-cols-2 lg:grid-cols-4 gap-5 mx-auto">
            {instructors?.slice(0, 4).map((instructor, index) => (
              <div
                key={index}
                className="items-center  flex dark:text-white  hover:translate-y-2 duration-200 cursor-pointer flex-col shadow-md py-8 px-10 rounded-sm"
              >
                <div className="flex-col flex gap-6 md:gap-6">
                  <img
                    className="rounded-full border-4 border-gray-300 h-24 w-24 mx-auto"
                    src={instructor?.instructor?.photoUrl || `${img}`}
                    alt="instructor image"
                  />
                  <div className="flex flex-col items-center flex-wrap">
                    <p className="font-medium text-lg dark:text-white text-gray-800">
                      {" "}
                      {instructor.instructor.name}
                    </p>
                    <p className="text-gray-500 whitespace-nowrap">
                      Instructor
                    </p>
                    <p className="text-gray-500 whitespace-nowrap">
                      TotalEnrolled Students:{instructor.totalEnrolled}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PopularInstructor;
