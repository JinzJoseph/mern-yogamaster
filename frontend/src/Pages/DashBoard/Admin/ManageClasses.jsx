import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import moment from "moment";
import Swal from "sweetalert2";

const ManageClasses = () => {
  const navigate = useNavigate();
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const [classes, setClasses] = useState([]);
  const [page, setPage] = useState(1);
  const [paginated, setPaginated] = useState([]);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(classes.length / itemsPerPage);

  useEffect(() => {
    axiosFetch
      .get("/classes-manage")
      .then((res) => {
        setClasses(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const lastIndex = page * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentData = classes.slice(firstIndex, lastIndex);
    setPaginated(currentData);
  }, [page, classes]);

  const handleReject = (id) => {
    Swal.fire({
      title: "Reason For Rejection",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Submit",
      showLoaderOnConfirm: true,
      preConfirm: async (reason) => {
        try {
          const res = await axiosSecure.put(`/change-status/${id}`, {
            status: "rejected",
            reason,
          });
          console.log(res);

          setClasses(
            classes.map((cls) =>
              cls._id === id ? { ...cls, status: "rejected", reason } : cls
            )
          );
        } catch (err) {
          console.error(err);
          Swal.showValidationMessage(`Request failed: ${err}`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  const handleApprove = async (id) => {
    await axiosSecure
      .put(`/change-status/${id}`, { status: "approved" })
      .then((res) => {
        console.log(res);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Class has been approved",
          showConfirmButton: false,
          timer: 1500,
        });
        setClasses(
          classes.map((cls) =>
            cls._id === id ? { ...cls, status: "approved" } : cls
          )
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl text-secondary font-bold text-center my-10">
        Manage <span className="text-black">Classes</span>
      </h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="text-left font-semibold py-2 px-4">#</th>
              <th className="text-left font-semibold py-2 px-4">Photo</th>
              <th className="text-left font-semibold py-2 px-4">Course Name</th>
              <th className="text-left font-semibold py-2 px-4">
                Instructor Name
              </th>
              <th className="text-left font-semibold py-2 px-4">Status</th>
              <th className="text-left font-semibold py-2 px-4">Submitted</th>
              <th className="text-left font-semibold py-2 px-4">Details</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No Data yet...
                </td>
              </tr>
            ) : (
              paginated.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="py-4 px-4">{index + 1}</td>
                  <td className="py-2 px-4">
                    <img
                      src={item.imageUrl}
                      alt={item.courseName}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="py-2 px-4">{item.courseName}</td>
                  <td className="py-2 px-4">{item.instructorName}</td>
                  <td className="py-2 px-4">{item.status}</td>
                  <td className="py-2 px-4">
                    {moment(item.submitted).format("MMMM Do YYYY")}
                  </td>
                  <td className="py-2 px-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      {item.status === "approved" ? (
                        ""
                      ) : (
                        <button
                          onClick={() => handleApprove(item._id)}
                          className="text-sm bg-green-500 hover:bg-green-600 py-1 px-2 rounded text-white"
                        >
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() => handleReject(item._id)}
                        disabled={
                          item.status === "rejected" ||
                          item.status === "checking"
                        }
                        className="text-sm bg-red-400 hover:bg-red-500 py-1 px-2 rounded text-white"
                      >
                        Deny
                      </button>
                      <button
                        onClick={() => handleReject(item._id)}
                        disabled={
                          item.status === "rejected" ||
                          item.status === "checking"
                        }
                        className="text-sm bg-blue-400 hover:bg-blue-500 py-1 px-2 rounded text-white"
                      >
                        Feedback
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setPage(index + 1)}
            className={`mx-1 px-4 py-2 border rounded ${
              page === index + 1
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ManageClasses;
