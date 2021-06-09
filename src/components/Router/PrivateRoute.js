import React from "react";
import { Redirect, Route } from "react-router-dom";
import decode from "jwt-decode";

const checkAuth = () => {
  const token = sessionStorage.getItem("access_token");
  const refreshToken = sessionStorage.getItem("refresh_token");
  if (!token || !refreshToken) {
    return false;
  }

  try {
    // { exp: 12903819203 }
    const { exp } = decode(refreshToken);
    // console.log(exp);
    if (exp < new Date().getTime() / 1000) {
      return false;
    }
  } catch (e) {
    return false;
  }

  return true;
};

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      checkAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);
