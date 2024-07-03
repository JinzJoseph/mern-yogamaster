import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateUser = () => {
  const data = useLoaderData(); // Assuming data is provided through react-router-dom
  const axiosSecure = useAxiosSecure();

  const [name, setName] = useState(data.name);
  const [email, setEmail] = useState(data.email);
  const [phone, setPhone] = useState(data.phone);
  const [image, setImage] = useState(data.photoUrl);
  const [address, setAddress] = useState(data.address);
  const [role, setRole] = useState(data.role); // State for role
const navigate=useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      name,
      email,
      phone,
      role,
      address,
      photoUrl: image,
    };

    axiosSecure
      .put(`/update-user/${data._id}`, updatedData)
      .then((res) => {
        console.log(res);
        // Handle success if needed
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Status is changed",
            showConfirmButton: false,
            timer: 1500
          });
          navigate("/dashboard/manage-users")
      })
      .catch((err) => console.error(err)); // Handle error if needed
  };

  return (
    <div>
      <div className="my-10">
        <h1 className="text-center text-3xl font-bold">
          Update <span className="text-blue-700">Status</span> ..
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="mx-auto p-6 bg-white rounded shadow"
      >
        <div className="grid grid-cols-2 w-full gap-3">
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              User Name
            </label>
            <input
              type="text"
              required
              value={name}
              readOnly
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Name"
              name="name"
              id="name"
              className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
              User Photo Url
            </label>
            <input
              type="text"
              required
              readOnly
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
            />
          </div>
        </div>
        <div>
          <div className="grid gap-3 grid-cols-2">
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                Email
              </label>
              <input
                type="text"
                value={email}
                readOnly
                name="email"
                id="email"
                className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="phonenumber"
                className="block text-gray-700 font-bold mb-2"
              >
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                readOnly
                name="phonenumber"
                id="phonenumber"
                className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <h1>Please select a role</h1>
        <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
  <div>
    <input
      type="radio"
      id="user"
      value="user"
      checked={role === "user"}
      onChange={(e) => setRole(e.target.value)}
      className="sr-only"
    />
    <label
      htmlFor="user"
      className={`block w-full rounded-lg border border-secondary p-2 cursor-pointer hover:bg-secondary hover:text-white ${
        role === "user" ? "bg-secondary text-white" : ""
      }`}
    >
      User
    </label>
  </div>
  <div>
    <input
      type="radio"
      id="instructor"
      value="instructor"
      checked={role === "instructor"}
      onChange={(e) => setRole(e.target.value)}
      className="sr-only"
    />
    <label
      htmlFor="instructor"
      className={`block w-full rounded-lg border border-secondary p-2 cursor-pointer hover:bg-secondary hover:text-white ${
        role === "instructor" ? "bg-secondary text-white" : ""
      }`}
    >
      Instructor
    </label>
  </div>
  <div>
    <input
      type="radio"
      id="admin"
      value="admin"
      checked={role === "admin"}
      onChange={(e) => setRole(e.target.value)}
      className="sr-only"
    />
    <label
      htmlFor="admin"
      className={`block w-full rounded-lg border border-secondary p-2 cursor-pointer hover:bg-secondary hover:text-white ${
        role === "admin" ? "bg-secondary text-white" : ""
      }`}
    >
      Admin
    </label>
  </div>
</div>


        <div className="mb-6">
          <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
            Address
          </label>
          <textarea
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border-secondary px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
            placeholder="Address"
            name="address"
            rows="5"
          />
        </div>
        <div className="text-center w-full">
          <button
            type="submit"
            className="bg-secondary w-full hover:bg-red-400 duration-200 text-white font-bold py-2 px-4 rounded"
          >
            Update Status
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
