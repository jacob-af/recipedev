import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { token } from "../../state/User";

function PrivateRoute({ children, ...rest }) {
  const userToken = token();
  const location = useLocation();

  if (!userToken) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
}

export default PrivateRoute;
