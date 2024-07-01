import React, { useEffect, useState } from "react";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";
import { RingLoader } from "react-spinners";
import moment from "moment";
const PaymentHostroy = () => {
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setpagination] = useState([]);
  const totalitems = payments.length;
  const [page, setpage] = useState(1);
  const totalpage = Math.ceil(totalitems / 5);
  let itemsperpage = 5;
  const handleChange = (event, value) => {
    setpage(value);
  };
  const { currentUser } = useUser();
  useEffect(() => {
    const lastindex = page * itemsperpage;
    const firstindex = lastindex - itemsperpage;
    const currentitems = payments.slice(firstindex, lastindex);
    setpagination(currentitems);
  }, [page, payments]);
  useEffect(() => {
    axiosFetch
      .get(`/payment-history/${currentUser.email}`)
      .then((res) => {
        console.log(res);
        setPayments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentUser?.email]);
  const totalPaidAmount = payments.reduce((acc, curr) => acc + curr.amount, 0);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader color="blue" size={80} />
      </div>
    );
  }
  return (
    <div>
      <div className="text-center mt-6 mb-16">
        <p className="text-gray-400">
          Hey ,{" "}
          <span className="text-secondary font-bold">{currentUser.name}</span>{" "}
          Welcome...
        </p>
        <h1 className="text-gray-500  font-bold my-3 text-4xl ">
          My Payment <span className="text-secondary">Histroy</span>
        </h1>
        <p className="text-gray-500 text-sm my-3">
          {" "}
          You can see your payment History here..
        </p>
      </div>
      <div>
        <div>
          <h1 className="font-bold">Total Payments:{payments.length}</h1>
          <h1 className="font-bold mt-1">Total Paid:{totalPaidAmount}$</h1>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="text-left font-semibold py-2">#</th>
                <th className="text-left font-semibold py-2">Amount</th>
                <th className="text-left font-semibold py-2">Total Items</th>
                <th className="text-left font-semibold py-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No Payment
                  </td>
                </tr>
              ) : (
                payments.map((item, index) => (
                  <tr key={index}>
                    <td className="py-4">{index + 1}</td>

                    <td className="py-2">${item.amount}</td>
                    <td className="py-2">{item.classId.length}</td>
                    <td className="py-2">
                      {moment(item.date).format("MMMM Do YYYY")}
                    </td>
                 
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHostroy;
