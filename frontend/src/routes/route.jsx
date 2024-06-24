import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import Instructors from "../Pages/Instructor/Instructors";
import Classess from "../Pages/Classes/Classess";

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
        path:"instructors",
        element:<Instructors/>
      },{
        path:"classes",
        element:<Classess/>
      }
    ],
  },
]);
