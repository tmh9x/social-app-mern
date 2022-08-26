import React, { createContext, useEffect, useState } from "react";

import { getToken } from "../utils/getToken";
import { useNavigate } from "react-router-dom";

export const authContext = createContext();

export function AuthContextProvider(props) {
  const [user, setUser] = useState();

  let navigate = useNavigate();

  const isUserLoggedIn = () => {
    const token = getToken();
    if (token) {
      setUser(true);
      console.log("you are already logged in");
    } else {
      setUser(false);
      console.log("you are not logged in");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(false);
    navigate("/");
  };

  useEffect(() => {
    isUserLoggedIn();
  }, [user]);

  return (
    <authContext.Provider value={{ isUserLoggedIn, user, setUser, logout }}>
      {props.children}
    </authContext.Provider>
  );
}
