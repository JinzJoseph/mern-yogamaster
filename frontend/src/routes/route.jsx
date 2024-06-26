import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import Instructors from "../Pages/Instructor/Instructors";
import Classess from "../Pages/Classes/Classess";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import ClassesDetails from "../Pages/Classes/ClassesDetails";
import axios from "axios";
import DashBoardLatout from "../Layout/DashBoardLatout";
import DashBoard from "../Pages/DashBoard/DashBoard";
import StudentCp from "../Pages/DashBoard/Student/StudentCp";
import EnrolledClass from "../Pages/DashBoard/EnrolledClass/EnrolledClass";
import SelectedClass from "../Pages/DashBoard/Student/SelectedClass";
import PaymentHostroy from "../Pages/DashBoard/Payment/PaymentHostroy";
import ApplyInstructor from "../Pages/DashBoard/Apply/ApplyInstructor";
import MyPayment from "../Pages/DashBoard/Payment/MyPayment";
import CourseDetails from "../Pages/DashBoard/Course/CourseDetails";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "instructors",
        element: <Instructors />,
      },
      {
        path: "classes",
        element: <Classess />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "class/id/:id",
        element: <ClassesDetails />,
        loader: async ({ params }) => {
          try {
            const response = await axios.get(
              `http://localhost:3000/classes/id/${params.id}`
            );
            return response.data;
          } catch (error) {
            console.error("Error fetching class details:", error);
            throw error;
          }
        },
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashBoardLatout />,
    children: [
      {
        index: true,
        element: <DashBoard />,
      },
      //student route
      {
        path: "student-cp",
        element: <StudentCp />,
      },
      {
        path: "enrolled-classes",
        element: <EnrolledClass />,
      },
      {
        path: "my-selected",
        element: <SelectedClass />,
      },
      {
        path: "my-payments",
        element: <PaymentHostroy />,
      },
      {
        path: "apply-instructor",
        element: <ApplyInstructor />,
      },
      {
        path: "payment",
        element: <MyPayment />,
      },
      {
        path: "course-details",
        element: <CourseDetails />,
      },
    ],
  },
]);
