import React, { useState, createContext } from "react";

export const StoreContext = createContext({});
export const StoreContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [refresh, setRefersh] = useState(false);
  const [userProjects, setUserProjects] = useState({});
  return (
    <StoreContext.Provider
      value={{
        userData,
        setUserData,
        openModal,
        setOpenModal,
        userProjects,
        setUserProjects,
        activeStep,
        setActiveStep,
        refresh,
        setRefersh,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
