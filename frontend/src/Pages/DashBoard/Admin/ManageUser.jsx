import React, { useEffect, useState } from "react";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ManageUser = () => {
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [users, setusers] = useState([]);

  useEffect(() => {
    axiosFetch
      .get("/getallusers")
      .then((res) => {
        console.log(res);
        setusers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleDelete = (id) => {
    axiosSecure
      .delete(`/delete-user/${id}`)
      .then((res) => {
        console.log(res);
        setusers(users.filter((user) => user._id !== id));
        if (res.status === 200) {
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
              Swal.fire({
                title: "Deleted!",
                text: "The User  has been deleted.",
                icon: "success",
              });
            }
          });
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold text-center mb-8">
        Manage <span className="text-secondary">Users</span>
      </h1>
      <div className="mb-4">
        <h2 className="font-bold text-lg">Total Users: {users.length}</h2>
      </div>
      <div>
        {users.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <table className="w-full table-auto">
              <thead className="bg-gray-600">
                {" "}
                <tr>
                  <th className="text-left font-semibold py-2">#</th>
                  <th className="text-left font-semibold py-2">Photo</th>
                  <th className="text-left font-semibold py-2">Name</th>
                  <th className="text-left font-semibold py-2">Role</th>
                  <th className="text-left font-semibold py-2">Update</th>
                  <th className="text-left font-semibold py-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-4">{index + 1}</td>
                    <td className="py-2">
                      <img
                        src={user.photoUrl}
                        alt="User"
                        className="w-10 h-10 rounded-full"
                      />
                    </td>
                    <td className="py-2">{user.name}</td>
                    <td className="py-2">{user.role}</td>
                    <td className="py-2">
                      <button
                        onClick={() =>
                          navigate(`/dashboard/update-user/${user._id}`)
                        }
                        className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer hover:bg-green-600 text-center"
                      >
                        Update
                      </button>
                    </td>
                    <td className="py-2">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer hover:bg-red-600 text-center"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-gray-500">No Data Found</div>
        )}
      </div>
    </div>
  );
};

export default ManageUser;
