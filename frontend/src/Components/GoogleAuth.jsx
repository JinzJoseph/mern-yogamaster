import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GoogleAuth = () => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential = await googleLogin();
      const user = userCredential.user;

      if (user) {
        const userImp = {
          name: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
          role: "user",
          gender: "Is not specified",
          address: "It is not specified",
          phone: "It is not specified",
        };

        if (user.email && user.displayName) {
          await axios.post("http://localhost:3000/new-user", userImp);
          navigate("/");
          console.log("Registration success");
        }
      }
    } catch (error) {
      console.log("Something went wrong: " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center my-4">
      <button
        onClick={handleLogin}
        className="flex items-center outline-none bg-white border-gray-300 rounded-lg shadow-lg px-6 py-4 text-sm font-medium text-gray-800 hover:bg-gray-300 focus:outline-none"
      >
        <FcGoogle className="w-5 h-5 gap-3 mr-3" />
        <span>Continue with Google</span>
      </button>
    </div>
  );
};

export default GoogleAuth;
