import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaPhone } from "react-icons/fa";
import { MdAddAPhoto } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import GoogleAuth from "../../Components/GoogleAuth";
import { AuthContext } from "../../utilities/Providers/AuthProvider";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const { signup, updateUser ,setErr} = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
 
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setErr("");
    signup(data.email, data.password).then((result) => {
      const user = result.user;
      if (user) {
        return updateUser(data.name, data.photoUrl).then(() => {
          const userImp = {
            name: user?.displayName,
            email: user?.email,
            photoURL: user?.photoUrl,
            role: "user",
            gender: data.gender,
            phone: data.phonenumber,
            address: data.address,
          };
          if (user.email && user.displayName) {
            return axios
              .post("http://localhost:3000/new-user", userImp)
              .then(() => {
                alert("Registeration Successfull")
                navigate("/");
                setErr('')
                return "registertion successfull";
              })
              .catch((err) => {
                throw new Error(err);
              });
          }
        }).catch((err)=>{
          setErr(err.code);
          throw new Error(err)
        })
      }
    });
  };

  return (
    <div className="flex justify-center items-center pt-14 bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg cursor-pointer">
        <h2 className="text-3xl font-bold text-center mb-6">Please Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex items-center gap-5">
            <div className="mb-4 w-full">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                <AiOutlineUser className="inline-block mr-2" />
                Name
              </label>
              <input
                name="name"
                placeholder="Enter your name"
                type="text"
                {...register("name", { required: true })}
                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">Name is required</p>
              )}
            </div>
            <div className="mb-4 w-full">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                <MdOutlineMailOutline className="inline-block mr-2" />
                Email
              </label>
              <input
                name="email"
                placeholder="Enter your Email"
                type="email"
                {...register("email", { required: true })}
                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">Email is required</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="mb-4 w-full">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                <RiLockPasswordLine className="inline-block mr-2" />
                Password
              </label>
              <input
                name="password"
                placeholder="*********"
                type="password"
                {...register("password", { required: true })}
                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">Password is required</p>
              )}
            </div>
            <div className="mb-4 w-full">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-bold mb-2"
              >
                <RiLockPasswordLine className="inline-block mr-2" />
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                placeholder="**********"
                type="password"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="mb-4 w-full">
              <label
                htmlFor="phonenumber"
                className="block text-gray-700 font-bold mb-2"
              >
                <FaPhone className="inline-block mr-2" />
                Phone Number
              </label>
              <input
                name="phonenumber"
                placeholder="Enter your Phone Number"
                type="text"
                {...register("phonenumber", { required: true })}
                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
              />
              {errors.phonenumber && (
                <p className="text-red-500 text-sm">Phone number is required</p>
              )}
            </div>
            <div className="mb-4 w-full">
              <label
                htmlFor="photoUrl"
                className="block text-gray-700 font-bold mb-2"
              >
                <MdAddAPhoto className="inline-block mr-2" />
                Photo URL
              </label>
              <input
                name="photoUrl"
                placeholder="Photo URL"
                type="text"
                {...register("photoUrl")}
                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="gender"
              className="block text-gray-700 font-bold mb-2"
            >
              <AiOutlineUser className="inline-block mr-2" />
              Gender
            </label>
            <select
              {...register("gender", { required: true })}
              className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">---Select---</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm">Gender is required</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-700 font-bold mb-2"
            >
              <CiLocationOn className="inline-block mr-2" />
              Address
            </label>
            <textarea
              {...register("address", { required: true })}
              rows="3"
              placeholder="Enter Address"
              className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
            ></textarea>
            {errors.address && (
              <p className="text-red-500 text-sm">Address is required</p>
            )}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-secondary hover:bg-red-500 text-white py-2 px-4 rounded-md"
            >
              Register
            </button>
          </div>
        </form>
        <p className="text-center mt-2">
          Already have an account?{" "}
          <Link to="/login" className="underline text-secondary ml-2">
            Login
          </Link>
        </p>
        <GoogleAuth />
      </div>
    </div>
  );
};

export default Register;
