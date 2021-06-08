import React, { useState, createContext } from "react";

export const StoreContext = createContext({});
export const StoreContextProvider = ({ children }) => {
  const [userData, setUserData] = useState("");

  return (
    <StoreContext.Provider
      value={{
        userData,
        setUserData,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
