import React, { useState } from "react";
import { MdOutlineAlternateEmail, MdOutlineRemoveRedEye } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleAuth from "../../Components/GoogleAuth";
import useAuth from "../../hooks/useAuth";
import { setLogLevel } from "firebase/app";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const { login, err, setErr, loader } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
        console.log(err.message);
      setErr(err.message);
      
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-secondary sm:text-3xl text-center">
        Get started Today
      </h1>
      <p className="mx-auto mt-4 max-w-md text-center">
        Explore our comprehensive library of courses, meticulously crafted for
        all levels of experience.
      </p>
      <div className="mx-auto max-w-lg mb-0 mt-6 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 ">
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-center text-red-400 text-lg font-medium">
            Sign in to your account
          </p>
          {err && <p className="text-center text-red-500">{err}</p>}
          <div>
            <label className="sr-only" htmlFor="email">
              Email:
            </label>
            <div className="relative">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email.."
                className="w-full border outline-none rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              />
              <span className="absolute inset-y-0 mr-2 end-0 grid place-content-center">
                <MdOutlineAlternateEmail className="h-4 w-4 text-gray-400" />
              </span>
            </div>
            <label className="sr-only" htmlFor="password">
              Password:
            </label>
            <div className="relative mt-4">
              <input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password.."
                className="w-full border outline-none rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 mr-2 end-0 grid place-content-center cursor-pointer"
              >
                <MdOutlineRemoveRedEye className="h-4 w-4 text-gray-400" />
              </span>
            </div>
          </div>
          <button
            className="block w-full rounded-lg bg-secondary px-5 py-3 text-sm font-medium text-white"
            type="submit"
          >
            Sign In
          </button>
          <p className="text-center">
            No account?{" "}
            <Link to="/register" className="underline">
              Sign up
            </Link>
          </p>
        </form>
        <GoogleAuth />
      </div>
    </div>
  );
};

export default Login;
