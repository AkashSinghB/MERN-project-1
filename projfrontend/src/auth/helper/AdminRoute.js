import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";

const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && isAuthenticated().user.role === 1 ? (
          <Component {...props} /> ///if true
        ) : (
          <Redirect
            to={{
              pathname: "/signin", ///if false
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default AdminRoute;
