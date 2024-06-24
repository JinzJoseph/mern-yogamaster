import React, { useEffect, useState } from "react";
import useAxiosFetch from "../hooks/useAxiosFetch";
import Card from "./Card";

const PopularClasses = () => {
  const axiosFetch = useAxiosFetch();
  const [classes, setclasses] = useState([]);
  useEffect(() => {
    const fetchClasses = async () => {
      const res = await axiosFetch.get("/getallclasses");
      // console.log(res);
      setclasses(res.data);
    };
    fetchClasses();
  }, []);

  return (
    <div className="md:w-[80%] mx-auto my-36 ">
      <div>
        <h1 className="text-5xl font-bold text-center dark:text-white ">
          Our <span className="text-secondary">Popular</span> Classes
        </h1>
        <div className="w-[40%] text-center mx-auto my-4 dark:text-white">
          <p className="text-grey-500">
            Explore our popular Classes.Here is some popular classes based on
            How many student enrolled
          </p>
        </div>
      </div>
      <div className="grid md:grid-cos-2 lg:grid-cols-3 gap-3">
        {classes.slice(0, 3).map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default PopularClasses;
