import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ThemeProvider, THEME_ID, createTheme } from "@mui/material/styles";
import { Switch, duration } from "@mui/material";
import photoUrl from "../assets/home/girl.jpg";
import { FaBars } from "react-icons/fa";
import {motion} from "framer-motion"
const NavBar = () => {
  const navLinks = [
    {
      name: "Home",
      route: "/",
    },
    {
      name: "Instructor",
      route: "/instructors",
    },
    {
      name: "Classes",
      route: "/classes",
    },
  ];
  const mobileMenuItems=[
    {

    }
  ]
  const [navBg, setNavBg] = useState("bg-[#15151580]");

  const materialTheme = createTheme({
    palette: {
      primary: {
        main: "#ff0000",
      },
      secondary: {
        main: "#00ff00",
      },
    },
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const [scrollposition, setScrollposition] = useState(0);
  const [isFixed, SetIsFixed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(true);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(true);
  };
  useEffect(() => {
    const darkClass = "dark";
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add(darkClass);
    } else {
      root.classList.remove(darkClass);
    }
  }, [isDarkMode]);
  useEffect(() => {
    setIsHome(location.pathname === "/");
    setIsLogin(location.pathname === "/login");
    SetIsFixed(
      location.pathname === "/register" || location.pathname === "/login"
    );
  }, [location]);
  useEffect(() => {
    if (scrollposition > 100) {
      if (isHome) {
        setNavBg(
          "bg-white backdrop-filter backdrop-blur-xl bg-opacity-0 dark:text-white text-black"
        );
      } else {
        setNavBg("bg-white dark:bg-dark dark:text-white text-black ");
      }
    } else {
      setNavBg(
        `${
          isHome || location.pathname === "/"
            ? "bg-transparent"
            : "bg-white dark:bg-black"
        }dark:text-white text-white`
      );
    }
  }, [scrollposition]);
  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;
      setScrollposition(currentPosition);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleLogut = () => {};
  return (
    <motion 
    initial={{opacity:0}}
    animate={{opacity:1}}
    transition={{duration:0.5}}
    className={`${isHome ? navBg :"bg-white dark:bg-black backdrop-blur-2xl"} ${isFixed ? "static" :"fixed"} top-0 
    transition-colors duration-500 ease-in-out w-full z-10`}>
      <div className="lg:w-[95%] mx-auto sm:px-6 lg:px-6 ">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex-shrink-0 cursor-pointer pl-7 md:p-0 flex items-center dark:text-white" onClick={()=>navigate("/")}>
           <div>
           <h1 className="text-4xl inline-flex gap-3 items-center font-bold">
              yogaMaster{" "}
              <img
                src="../../../public/yoga-logo.png"
                alt=""
                className="w-8 h-8 dark:text-white"
              />
            </h1>
            <p className="font-bold text-[15px]  mt-2 tracking-[14px]">
              Quick Explore
            </p>
           </div>
          </div>
          {/* mobile menu items */}
          <div className="md:hidden flex items-center">
            <button type="button" onClick={toggleMobileMenu} className="text-gray-300 hover:text-white focus:outline-none items-center justify-center">
                <FaBars className="h-6 w-6 hover:text-primary text-black dark:text-white items-center" />
            </button>
          </div>
          {/* navigational links */}
          <div className="hidden md:block text-black dark:text-white">
            <div className="flex ">
              <ul className="ml-10 flex items-center space-x-4 pr-4">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <NavLink
                      to={link.route}
                      style={{whiteSpace:"nowrap"}}
                      className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : navBg.includes("bg-transparent")
                            ? "text-white"
                            : "text-black dark:text-white"
                        } hover:text-secondary duration-300 `
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
                {/* based on user    */}
                {user ? null : isLogin ? (
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : navBg.includes("bg-transparent")
                            ? "text-white"
                            : "text-black dark:text-white"
                        } hover:text-secondary duration-300 `
                      }
                      to="/register"
                    >
                      {" "}
                      Register
                    </NavLink>
                  </li>
                ) : (
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : navBg.includes("bg-transparent")
                            ? "text-white"
                            : "text-black dark:text-white"
                        } hover:text-secondary duration-300 `
                      }
                      to="/login"
                    >
                      {" "}
                      Login
                    </NavLink>
                  </li>
                )}
                {user && (
                  <li>
                    <NavLink
                      to={"/dashboard"}
                      className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : navBg.includes("bg-transparent")
                            ? "text-white"
                            : "text-black dark:text-white"
                        } hover:text-secondary duration-300 `
                      }
                    >
                      DashBoard
                    </NavLink>
                  </li>
                )}
                {user && (
                  <li>
                    <img
                      src={user?.photoUrl || photoUrl}
                      alt="profile img"
                      className="h-[40px] rounded-full w-[40px]"
                    />
                  </li>
                )}
                {user && (
                  <li>
                    <NavLink
                      className={
                        "font-bold px-3 py-2 bg-secondary text-white rounded-lg"
                      }
                      onClick={handleLogut}
                    >
                      Logout
                    </NavLink>
                  </li>
                )}

                <li>
                  <ThemeProvider theme={materialTheme}>
                    <div className="flex flex-col justify-center items-center">
                      <Switch onChange={() => setIsDarkMode(!isDarkMode)} />
                      <h1 className="text-[8px]">Light/Dark</h1>
                    </div>
                  </ThemeProvider>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion>
  );
};

export default NavBar;
