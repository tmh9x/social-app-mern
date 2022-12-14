import React, { createContext, useEffect, useState } from "react";

import { getToken } from "../utils/getToken";
import { useNavigate } from "react-router-dom";

export const authContext = createContext();

export function AuthContextProvider(props) {
  const [user, setUser] = useState(false);
  const [newUser, setNewUser] = useState({});
  const [error, setError] = useState(null);

  let navigate = useNavigate();

  const isUserLoggedIn = () => {
    const token = getToken();
    console.log("token", token);
    if (token) {
      setUser(true);
      getProfile();
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

  const getProfile = async () => {
    const token = getToken();
    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      try {
        const response = await fetch(
          "https://social-app-mern-backend-tmh9x.vercel.app/api/users/profile",
          requestOptions
        );
        const result = await response.json();
        setNewUser(result);
      } catch (error) {
        console.log("error getting profile", error);
        setError(error);
      }
    }
  };

  useEffect(() => {
    isUserLoggedIn();
  }, [user]);

  return (
    <authContext.Provider
      value={{
        isUserLoggedIn,
        user,
        setUser,
        logout,
        getProfile,
        error,
        newUser,
        setNewUser,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
}
