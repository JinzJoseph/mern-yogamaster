import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import { FaHome, FaUser } from "react-icons/fa";
import { BiHomeAlt, BiLogOutCircle, BiSelectMultiple } from "react-icons/bi";
import { TbBrandAppleArcade } from "react-icons/tb";
import { FcApprove } from "react-icons/fc";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { IoSchoolSharp } from "react-icons/io5";
import { BsFillPostcardFill } from "react-icons/bs";
import { RingLoader  } from "react-spinners";
import {
  MdExplore,
  MdOfflineBolt,
  MdPayments,
  MdPendingActions,
} from "react-icons/md";
import { SiGoogleclassroom, SiInstructure } from "react-icons/si";
import { GiFigurehead } from "react-icons/gi";
import Swal from "sweetalert2";
import Scroll from "../hooks/useScroll";
const adminNavItems = [
  {
    to: "/dashboard/admin-home",
    icons: <BiHomeAlt className="text-2xl" />,
    label: "DashBoard Home",
  },
  {
    to: "/dashboard/manage-users",
    icons: <FaUser className="text-2xl" />,
    label: "Manage User",
  },
  {
    to: "/dashboard/manage-class",
    icons: <BsFillPostcardFill className="text-2xl" />,
    label: "Manage Classes",
  },
  {
    to: "/dashboard/manage-application",
    icons: <TbBrandAppleArcade className="text-2xl" />,
    label: "Application",
  },
];

const lastMenuItem = [
  {
    to: "/",
    icons: <BiHomeAlt className="text-2xl" />,
    label: "DashBoard Home",
  },
  {
    to: "/trending",
    icons: <MdOfflineBolt className="text-2xl" />,
    label: "Trending",
  },
  {
    to: "/browse",
    icons: <GiFigurehead className="text-2xl" />,
    label: "Following",
  },
];

const instructorNavItems = [
  {
    to: "/dashboard/instructor-cp",
    icons: <FaHome className="text-2xl" />,
    label: "Home",
  },
  {
    to: "/dashboard/add-class",
    icons: <MdExplore className="text-2xl" />,
    label: "Add A Class",
  },
  {
    to: "/dashboard/my-classes",
    icons: <IoSchoolSharp className="text-2xl" />,
    label: "My Classes",
  },
  {
    to: "/dashboard/my-pending",
    icons: <MdPendingActions className="text-2xl" />,
    label: "Pending Courses",
  },
  {
    to: "/dashboard/my-approved",
    icons: <FcApprove className="text-2xl" />,
    label: "Approved Classes",
  },
];

const studentNavItems = [
  {
    to: "/dashboard/student-cp",
    icons: <BiHomeAlt className="text-2xl" />,
    label: "DashBoard",
  },
  {
    to: "/dashboard/enrolled-classes",
    icons: <SiGoogleclassroom className="text-2xl" />,
    label: "My Enroll",
  },
  {
    to: "/dashboard/my-selected",
    icons: <BiSelectMultiple className="text-2xl" />,
    label: "My Selected",
  },
  {
    to: "/dashboard/my-payments",
    icons: <MdPayments className="text-2xl" />,
    label: "My Payment",
  },
  {
    to: "/dashboard/apply-instructor",
    icons: <SiInstructure className="text-2xl" />,
    label: "Apply for Instructor",
  },
];

const DashBoardLayout = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const { loader, logout } = useAuth();
  const { currentUser } = useUser();
  console.log(currentUser);
  const role = currentUser.role; // Replace with appropriate role fetching logic
//  const role="user"
  if (loader) {
    return(
        <div className="flex justify-center items-center h-screen">
        <RingLoader  color="blue" margin="40" size="80" />;
      </div>
    )
   
  }

  const handleLogout = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout it!",
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
          .then(
            Swal.fire({
              title: "Logout!",
              text: "Logout Successful.",
              icon: "success",
            })
          )
          .catch((err) => console.log(err));
      }
      navigate("/");
    });
  };

  const renderNavItems = (items) => {
    return items.map((menuItem, index) => (
      <li key={index} className="mb-2">
        <NavLink
          to={menuItem.to}
          className={({ isActive }) => `
            flex ${
              isActive ? "bg-red-500 text-white" : "text-[#413F44]"
            } cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm duration-150 rounded-md p-2 items-center gap-x-2`}
        >
          {menuItem.icons}
          <span className={`${!open && "hidden"} origin-left duration-200`}>
            {menuItem.label}
          </span>
        </NavLink>
      </li>
    ));
  };

  return (
    <>
      <div className="flex ">
        <div
          className={`${
            open ? "w-72 overflow-y-auto" : "w-[90px] overflow-auto"
          } bg-white h-screen p-5 md:block hidden pt-8 relative duration-300`}
        >
          <div className="flex gap-x-4 items-center">
            <img
              src="/yoga-logo.png"
              alt=""
              className={`cursor-pointer h-[40px] duration-500 ${
                open && "rotate-[360deg]"
              }`}
              onClick={() => setOpen(!open)}
            />
            <Link
              to={"/"}
              onClick={() => setOpen(!open)}
              className={`text-dark-primary cursor-pointer font-bold origin-left text-xl duration-200 ${
                !open && "scale-0"
              }`}
            >
              Yoga Master
            </Link>
          </div>
          {/* navlinks */}
          <ul className="pt-6">
            <p className={`ml-3 text-gray-400 mb-3 ${!open && "hidden"}`}>
              Menu
            </p>
            {role === "admin" && renderNavItems(adminNavItems)}
            {role === "instructor" && renderNavItems(instructorNavItems)}
            {role === "user" && renderNavItems(studentNavItems)}
          </ul>
          <ul className="pt-6">
            <p className={`ml-3 mb-2 text-gray-500 ${!open && "hidden"}`}>
              Useful Links
            </p>
            {renderNavItems(lastMenuItem)}
          </ul>
          <li className="flex flex-row">
            <NavLink
              onClick={handleLogout}
              className="flex duration-150 w-full rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-2"
            >
              <BiLogOutCircle className="text-2xl" />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Logout
              </span>
            </NavLink>
          </li>
        </div>
        <div className=" h-screen overflow-y-auto px-8 flex-1 mt-8" >
        <Scroll />
        <Outlet />
      </div>
      </div>
      
    </>
  );
};

export default DashBoardLayout;
