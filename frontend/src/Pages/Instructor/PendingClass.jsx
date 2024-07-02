import React, { useEffect, useState } from 'react'
import useUser from '../../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import moment from "moment"
import { RingLoader } from 'react-spinners';

const PendingClass = () => {
  const [classes, setClasses] = useState([]);
  const { currentUser, isLoading } = useUser();
  const navigate = useNavigate();
  const [loading,setloading]=useState(true)
  const axiosSecure = useAxiosSecure();
  useEffect(()=>{
axiosSecure.get(`/pendingclasses/${currentUser.email}`).then((res)=>{
  console.log(res)
  setClasses(res.data)
  setloading(false)
}).catch((err)=>console.log(err))
  },[currentUser])
  if(loading){
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader color="blue" size={80} />
      </div>
    );
  }
  return (
    <div className='my-10'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold'>Pending <span className='text-secondary'>classes</span></h1>
        <p className="text-[12px] text-center my-2">
        Here you can see the classes that are pending.
      </p>
      {classes.length === 0 ? (
        <div className="text-center text-2xl font-bold mt-10">
          You don't have any pending class yet....
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
    
    </div>
  )
}

export default PendingClass
