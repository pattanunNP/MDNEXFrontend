import React, { useState, createContext } from "react";

export const StoreContext = createContext({});
export const StoreContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [openModal, setOpenModal] = useState(false);

  return (
    <StoreContext.Provider
      value={{
        userData,
        setUserData,
        openModal,
        setOpenModal,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
