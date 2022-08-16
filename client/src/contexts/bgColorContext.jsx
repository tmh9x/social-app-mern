import { createContext, useState } from "react";

export const bgColorContext = createContext();

export const BgColorContextProvider = (props) => {
  const [bgColor, setBgColor] = useState("white");

  return (
    <bgColorContext.Provider value={{ bgColor, setBgColor }}>
      {props.children}
    </bgColorContext.Provider>
  );
};
