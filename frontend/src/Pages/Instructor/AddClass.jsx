import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUser from "../../hooks/useUser";
import uploadImage from "../../helper/helper";
import Swal from "sweetalert2";

const AddClass = () => {
  const axiosSecure = useAxiosSecure();
  const { currentUser, isLoading } = useUser();
  const [image, setImage] = useState(null);
  const [courseName, setCourseName] = useState("");
  const [seat, setSeat] = useState("");
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload the image to Cloudinary
    const uploadImageCloudinary = await uploadImage(image);
    const imageUrl = uploadImageCloudinary.url;

    // Construct the new class data
    const newClass = {
      courseName,
      imageUrl,
      instructorName: currentUser.name,
      instructorEmail: currentUser.email,
      seat,
      price,
      link,
      description,
      status: "pending",
      totalenrolled: 0,
      submitted: new Date(),
    };

    // Post the new class data to the backend
    try {
      const response = await axiosSecure.post("/new-class", newClass);
      console.log(response);
      if (response.status === 200) {
        Swal.fire({
          position: "top-start",
          icon: "success",
          title: "Your course has been added",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.log("something went wrong");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="my-10">
        <h1 className="text-center text-3xl font-bold">
          Add Your <span className="text-blue-700">Course</span> Here..
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="mx-auto p-6 bg-white rounded shadow"
      >
        <div className="grid grid-cols-2 w-full gap-3">
          <div className="mb-6">
            <label
              htmlFor="courseName"
              className="block text-gray-700 font-bold mb-2"
            >
              Course Name
            </label>
            <input
              onChange={(e) => setCourseName(e.target.value)}
              type="text"
              required
              placeholder="Your Course Name"
              name="courseName"
              id="courseName"
              className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="image"
              className="block text-gray-700 font-bold mb-2"
            >
              Course Thumbnail
            </label>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              required
              name="image"
              id="image"
              className="block mt-[5px] w-full border border-secondary shadow-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 file:border-0 file:bg-secondary file:text-white file:mr-4 file:py-3 file:px-4"
            />
          </div>
        </div>
        <div>
          <h1 className="text-[12px] my-2 ml-2 text-secondary">
            You cannot change your email and name
          </h1>
          <div className="grid gap-3 grid-cols-2">
            <div className="mb-6">
              <label
                htmlFor="instructorName"
                className="block text-gray-700 font-bold mb-2"
              >
                Instructor Name
              </label>
              <input
                type="text"
                value={currentUser?.name}
                required
                readOnly
                name="instructorName"
                id="instructorName"
                className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="instructorEmail"
                className="block text-gray-700 font-bold mb-2"
              >
                Instructor Email
              </label>
              <input
                type="email"
                value={currentUser?.email}
                required
                readOnly
                name="instructorEmail"
                id="instructorEmail"
                className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        <div className="grid gap-3 mt-4 grid-cols-2">
          <div className="mb-6">
            <label
              htmlFor="availableSeats"
              className="block text-gray-700 font-bold mb-2"
            >
              Available seats
            </label>
            <input
              onChange={(e) => setSeat(e.target.value)}
              type="text"
              placeholder="How many seats are available?"
              required
              name="availableSeats"
              id="availableSeats"
              className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="price"
              className="block text-gray-700 font-bold mb-2"
            >
              Price
            </label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              type="text"
              placeholder="How much does it cost?"
              required
              name="price"
              id="price"
              className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="youtubeLink"
            className="block text-gray-700 font-bold mb-2"
          >
            YouTube Link
          </label>
          <p className="text-[12px] my-2 mt-2 text-secondary">
            Only YouTube videos are supported
          </p>
          <input
            onChange={(e) => setLink(e.target.value)}
            type="text"
            required
            className="w-full border-secondary px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
            placeholder="Your course intro video link"
            name="youtubeLink"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description About your course
          </label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border-secondary px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
            placeholder="Description"
            name="description"
            rows="5"
          />
        </div>
        <div className="text-center w-full">
          <button
            type="submit"
            className="bg-secondary w-full hover:bg-red-400 duration-200 text-white font-bold py-2 px-4 rounded"
          >
            Add Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClass;
