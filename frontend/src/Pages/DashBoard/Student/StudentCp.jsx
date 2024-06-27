import React from "react";
import useUser from "../../../hooks/useUser";
import welcomeImg from "../../../assets/dashboard/urban-welcome.svg";
import { Link } from "react-router-dom";
const StudentCp = () => {
  const { currentUser } = useUser();

  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <div>
          <div className="items-center justify-center mx-10 px-15" >
          <img
            src={welcomeImg}
            alt=""
            className="h-[200px] "
            placeholder="blur"
          />
          </div>

        
          <h1 className="font-bold text-4xl capitalize">
            Hi ! <span className="text-secondary "> {currentUser.name}</span>{" "}
            Welcome to the DashBoard
          </h1>
          <p className="capitalize text-base ">
            Hey Dear ,This is a simple dashboard home.Our develper is trying to
            update Dashboard
          </p>
          <div className="text-center">
            <h1 className="font-bold mt-4">You jump any page want from here</h1>
            <div className="flex items-center justify-center my-4 gap-3">
              <div className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1">
                <Link to="/dashboard/enrolled-class"> My Enroll</Link>
              </div>
              <div className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1">
                <Link to="/dashboard/my-selected"> My Selected</Link>
              </div>
              <div className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1">
                <Link to="/dashboard/my-payments"> Payment Histroy</Link>
              </div>
              <div className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1">
                <Link to="/dashboard/apply-instructor">
                  {" "}
                  join as a Instructorl
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCp;
