import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const PrivateRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
