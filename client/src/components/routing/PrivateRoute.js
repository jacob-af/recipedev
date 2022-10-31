import React from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import { token } from "../../state/User";

function PrivateRoute({ children, ...rest }) {
  const userToken = token();
  const location = useLocation();

  console.log(userToken);

  if (!userToken) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;

  //   return (
  //     <Route
  //       {...rest}
  //       render={({ location }) =>
  //         userToken ? (
  //           children
  //         ) : (
  //           <Navigate to="/login" state={{ from: location }} />
  //         )
  //       }
  //     />
  //   );
}

export default PrivateRoute;
