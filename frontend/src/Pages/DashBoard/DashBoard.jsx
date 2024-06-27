import React from "react";
import useUser from "../../hooks/useUser";
import { RingLoader   } from "react-spinners";
import DashBoardNavigate from "../../routes/DashBoardNavigate";
const DashBoard = () => {
  const { currentUser, isLoading } = useUser();
  const role = currentUser?.role;
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader   color="blue" margin="40" size="80" />;
      </div>
    );
  }

  return (
    <DashBoardNavigate/>
  );
};

export default DashBoard;
