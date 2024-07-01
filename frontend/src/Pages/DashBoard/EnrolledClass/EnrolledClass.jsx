import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";
const EnrolledClass = () => {
  const axiosSecure = useAxiosSecure();
  const { currentUser } = useUser();
  const [data, setdata] = useState([]);
  const[loading,setloading]=useState(true)
  const [page, setpage] = useState(1);
  const [pagination, setpagination] = useState([]);
  useEffect(() => {
    axiosSecure
      .get(`/enrolled-classes/${currentUser?.email}`)
      .then((res) => {
        console.log(res);
        setdata(res.data);
        setloading(false)
      })
      .catch((err) => console.log(err));
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader color="blue" size={80} />
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-2xl my-6 font-bold">Enrolled Classes</h1>
      <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-6">
        {data.map((item, index) => {
          return (
            <>
              <div
                key={index}
                className="bg-white shadow-md h-96  mx-3 rounded-3xl flex flex-col  md:flex-row justify-around items-center overflow-hidden sm:flex-row sm:h-52 sm:w-4/5"
              >
                <img
                  src={item.classes.image}
                  alt=""
                  className="h-1/2 w-full sm:h-full sm:w-1/2 object-cover"
                />
                <div className="flex-1 w-full flex flex-col items-baseline justify-around h-1/2 pl-6 sm:h-full sm:items-baseline sm:w-1/2">
                  <div>
                    <h1>{item.classes.name}</h1>
                    <p className="text-secondary">{item.classes.instructorName}</p>
                  </div>
                  <div className="flex gap-2">
                    <p className="font-bold text-gray-500">${item.classes.price}</p>
                  <Link to={"/dashboard/course-details"}>
                  <button className="bg-secondary font-bold rounded-xl mr-5 text-white px-3 py-1 shadow-md">View</button>
                  </Link>  
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default EnrolledClass;
