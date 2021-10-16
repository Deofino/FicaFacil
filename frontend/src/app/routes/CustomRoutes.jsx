import React from "react";
import { useAuth } from "../components/Context/AuthContext";
import { Redirect, Route } from "react-router-dom";

import Header from "../components/Header/Header";
import HeaderUser from "../components/Header/NavBarUser";
import Footer from "../components/Footer/Footer";
import Main from "../components/Main/Main";

export function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.auth === null ? (
          <Redirect
            to={{
              pathname: "/entrar/administrador",
              state: { from: location },
            }}
          />
        ) : (
          <React.Fragment>
            <Header />
            <Main>{children}</Main>
            <Footer />
          </React.Fragment>
        )
      }
    />
  );
}
export function UserRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user === null ? (
          <Redirect
            to={{
              pathname: "/entrar",
              state: { from: location },
            }}
          />
        ) : (
          <React.Fragment>
            <HeaderUser />
            <Main>{children}</Main>
            <Footer />
          </React.Fragment>
        )
      }
    />
  );
}
export function GuestRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user === null && auth.auth === null ? (
          children
        ) : (
          <Redirect
            to={{
              pathname:
                location.state !== undefined
                  ? location.state.from.pathname
                  : "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
