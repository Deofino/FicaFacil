import React, { createContext, useState, useContext } from "react";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const [auth, setAuth] = useState(null);
  React.useEffect(() => {
    let auth = localStorage.getItem("auth") || null;
    setAuth(auth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem("auth")]);
  const [user, setUser] = useState(null);
  React.useEffect(() => {
    let user = localStorage.getItem("user") || null;
    setUser(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem("user")]);
  return (
    <authContext.Provider value={{ auth, user }}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};
