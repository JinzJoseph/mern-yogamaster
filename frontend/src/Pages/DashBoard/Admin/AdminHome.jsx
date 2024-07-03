import React, { useEffect, useState } from "react";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import useUser from "../../../hooks/useUser";
import AdminStats from "./AdminStats";
const AdminHome = () => {
  const { currentUser } = useUser();
  const axiosFetch = useAxiosFetch();
  const [  users, setusers]  = useState([]);
  useEffect(() => {
    axiosFetch
      .get("/getallusers")
      .then((res) => {
        console.log(res)
        setusers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <div>
        <h1 className="text-4xl font-bold my-7 text-center">
          Welcome Back,{" "}
          <span className="text-secondary">{currentUser.name}</span>
        </h1>
        <AdminStats users={users} />
      </div>
    </div>
  );
};

export default AdminHome;
