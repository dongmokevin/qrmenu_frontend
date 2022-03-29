import { useContext } from "react";
import { useLocation, Outlet, Navigate } from "react-router-dom";

import React from "react";

import AuthContext from "../contexts/AuthContex";

function PrivateRoute({ children, ...rest }) {
  const auth = useContext(AuthContext);
  const location = useLocation();

  //   return (
  //     <Route
  //       {...rest}
  //       render={({ location }) => {
  //         auth.token ? (
  //           children
  //         ) : (
  //           <Redirect
  //             to={{
  //               pathname: "/login",
  //               state: { location },
  //             }}
  //           />
  //         );
  //       }}
  //     />
  //   );/

  return auth.token ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} replace state={{ location }} />
  );
}

export default PrivateRoute;
