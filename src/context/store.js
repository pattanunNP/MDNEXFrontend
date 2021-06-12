import React, { useState, createContext } from "react";

export const StoreContext = createContext({});
export const StoreContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [toolType, setToolType] = useState(null);

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
        openSidebar,
        setOpenSidebar,
        toolType,
        setToolType,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
