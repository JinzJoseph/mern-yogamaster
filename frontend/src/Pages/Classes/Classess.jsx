import React, { useContext, useEffect, useState } from "react";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import { Link, useNavigate } from "react-router-dom";
import { Transition } from "@headlessui/react";
import AuthProvider from "../../utilities/Providers/AuthProvider";
import useUser from "../../hooks/useUser";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { ToastContainer, toast } from "react-toastify";
const Classes = () => {
  const { currentUser } = useUser();
  const role = currentUser?.role;
  const [enrolledclasses, setenrolledclasses] = useState([]);
  const [classes, setClasses] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosFetch
      .get("/getallclasses")
      .then((res) => setClasses(res.data))
      .catch((err) => console.log(err));
  }, []);
  //handel add to cart

  const handleSelect = (id) => {
    console.log(id);
    axiosSecure
      .get(`/enrolled-classes/${currentUser?.email}`)
      .then((res) => {
        console.log(res);
        setenrolledclasses(res.data)
        console.log("fghj kl;");
      })
      .catch((err) => console.log(err));
    if (!currentUser) {
      alert("please login First..");
      return navigate("/");
    }
    axiosSecure
      .get(`/cart-items/${id}?email=${currentUser.email}`)
      .then((res) => {
        console.log(res);
        if (res.data.classId === id) {
          return alert("Already added to the cart");
        } else if (enrolledclasses.find((item) => item.classes._id === id)) {
          return alert("Already Enrolled");
        } else {
          const data = {
            classId: id,
            userEmail: currentUser?.email,
            date: new Date(),
          };
          axiosSecure.post("/add-to-cart", data).then((res) => {
            alert("Add to cart successfully");
            console.log(res.data);
          });
        }
      })
      .catch((error) => console.error(error));
  };

  const handleHover = (index) => {
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };
  // const { user } = useContext(AuthContext);

  return (
    <div>
      <div className="mt-20 pt-8">
        <h1 className="text-4xl font-bold text-center text-secondary">
          Classes
        </h1>
      </div>
      <div className="my-16 w-[90%] mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9">
        {classes.map((cls, index) => (
          <div
            key={index}
            className={`relative hover:-translate-y-2 duration-200 hover:ring-[2px] hover:ring-secondary w-64 h-[350px] mx-auto ${
              cls.availableseats < 1 ? "bg-red-300" : "bg-white"
            } dark:bg-slate-600 rounded-lg shadow-lg overflow-hidden cursor-pointer`}
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative h-48">
              <img
                src={cls?.image}
                alt=""
                className="object-cover w-full h-full"
              />
              <div
                className={`absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ${
                  hoveredCard === index ? "opacity-60" : " "
                }`}
              >
                <Transition
                  show={hoveredCard === index}
                  enter="transition-opacity duration-75"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-150"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => handleSelect(cls?._id)}
                      className="px-4 py-2 text-white disabled:bg-red-300 bg-secondary duration-300 rounded hover:bg-red-700"
                      title={
                        role === "admin" || role === " instructor"
                          ? "Instructor/Admin can not be able to secect"
                            ? cls.availableSeats < 1
                            : "No seats available"
                          : "You can seleclt class"
                      }
                      disabled={
                        role == "admin" ||
                        role === "instructor" ||
                        cls.availableSeats < 1
                      }
                    >
                      Add to cart
                    </button>
                  </div>
                </Transition>
              </div>
            </div>
            <div className="px-6 py-2">
              <h3 className="font-semibold mb-1">{cls?.name}</h3>
              <p className="text-gray-500 text-xs">
                Instructor: {cls.instructorName}
              </p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-gray-600 text-xs dark:text-white">
                  Available Seats: {cls.availableSeats}
                </span>
                <span className="text-green-500 font-semibold">
                  ${cls.price}
                </span>
              </div>
              <Link
                to={`/class/id/${cls._id}`}
                className="text-blue-500 hover:underline"
              >
                <button className="px-3 py-2 bg-secondary w-full mt-3 rounded-lg text-white hover:bg-red-500">
                  View{" "}
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
