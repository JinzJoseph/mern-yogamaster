import React, { useEffect, useState } from "react";
import useUser from "../../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FiDollarSign } from "react-icons/fi";
import { RingLoader } from "react-spinners";
import moment from "moment";
import { MdDeleteSweep } from "react-icons/md";
import Swal from "sweetalert2";
const SelectedClass = () => {
  const { currentUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/cart/${currentUser.email}`)
      .then((res) => {
        setClasses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader color="blue" size={80} />
      </div>
    );
  }
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/delete-cart-items/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              const newClasses = classes.filter((item) => item._id !== id);
              setClasses(newClasses);
            }
          })
          .catch((err) => {
            console.error("Error deleting item:", err);
            Swal.fire({
              title: "Error!",
              text: "There was a problem deleting your item.",
              icon: "error",
            });
          });
      }
    });
  };
  const handlepay = (id) => {
    const item = classes.find((item) => item._id === id);
    const price = item.price;
    console.log(price);
    navigate("/dashboard/payment", {
      state: { price: price, itemId: id },
    });
  };
  const totalprice = classes.reduce(
    (acc, item) => acc + parseInt(item.price),
    0
  );
  const totaltax = totalprice * 0.01;
  const price = totalprice + totaltax;
  return (
    <div>
      <div>
        <h1 className="text-4xl text-center font-bold">
          My <span className="text-secondary">Selected</span> Classes
        </h1>
      </div>
      <div className="h-screen py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
          <div className="flex flex-col md:flex-row gap-4">
            {/* left */}
            <div className="md:w-3/4">
              <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <table className="w-full table-auto">
                  <thead>
                    <tr>
                      <th className="text-left font-semibold py-2">#</th>
                      <th className="text-left font-semibold py-2">Product</th>
                      <th className="text-left font-semibold py-2">Price</th>
                      <th className="text-left font-semibold py-2">Date</th>
                      <th className="text-left font-semibold py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classes.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-4">
                          No Classes Available
                        </td>
                      </tr>
                    ) : (
                      classes.map((item, index) => (
                        <tr key={index}>
                          <td className="py-4">{index + 1}</td>
                          <td className="py-2 px-2">
                            <div className="flex items-center">
                              <img
                                src={item.image}
                                alt=""
                                className="h-16 w-16 rounded mr-4"
                              />
                              <span>{item.name}</span>
                            </div>
                          </td>
                          <td className="py-2">${item.price}</td>
                          <td className="py-2">
                            {moment(item.submitted).format("MMMM Do YYYY")}
                          </td>
                          <td className="flex items-center gap-2 py-4">
                            <button
                              onClick={() => handleDelete(item._id)}
                              className="px-3 py-1 cursor-pointer bg-red-400 rounded-xl text-white font-bold"
                            >
                              <MdDeleteSweep />
                            </button>
                            <button
                              onClick={() => handlepay(item._id)}
                              className="px-3 py-1 cursor-pointer bg-green-500 rounded-xl text-white font-bold"
                            >
                              <FiDollarSign />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {/* right */}
            <div className="md:w-1/4 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold">Summary</h3>

              <p className="mt-4">
                Total Classes:
                <span className="font-bold ">{classes.length} </span>{" "}
              </p>
              <div className="flex justify-between mb-3">
                <span>SubTotal:</span>
              <span>${totalprice}</span>
              </div>
              <div className="flex justify-between mb-3">
                <span>Taxes</span>
                <span>${totaltax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-3">
                <span> Extra Taxes</span>
                <span>$0</span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="font-bold">Total</span>
                <span className="font-bold">${price.toFixed(2)}</span>
              </div>
              <hr />
              <button
                onClick={() =>
                  navigate("/dashboard/payment", {
                    state: { price: price, itemId: null },
                  })
                }
                className="mt-4 px-4 py-2 w-full bg-blue-500 text-white rounded-lg"
                disabled={price <= 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedClass;
