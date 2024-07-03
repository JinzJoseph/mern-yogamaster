import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAxiosFetch from '../../hooks/useAxiosFetch';

const Instructors = () => {
  const axiosFetch = useAxiosFetch();
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosFetch.get('/instructors')
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="mt-20 pt-8">
        <h1 className="text-4xl font-bold text-center text-secondary">
          Instructors
        </h1>
        <div className="my-16 w-[90%] mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9">
          {data.length > 0 ? (
            <>
              {data.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center shadow-lg rounded-lg p-6 bg-white transform transition duration-500 hover:scale-105"
                >
                  <img
                    className="rounded-full border-4 border-gray-300 h-24 w-24 mb-4"
                    src={item.photoUrl}
                    alt="instructor"
                  />
                  <div className="text-center">
                    <p className="font-semibold text-lg text-gray-800 mb-2">
                      {item.name}
                    </p>
                    <p className="text-gray-600 mb-1">
                      {item.email}
                    </p>
                    <p className="text-gray-600 mb-1">
                      {item.phone}
                    </p>
                    <p className="text-gray-600">
                      {item.address}
                    </p>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p className="text-center text-gray-500">No instructors available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Instructors;
