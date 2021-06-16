import React, { useState, createContext, useReducer } from "react";
import reducer from "../components/reducer/reducer";
export const StoreContext = createContext({});
export const StoreContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [activeTeamStep, setActiveTeamStep] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [toolType, setToolType] = useState(null);
  const [AuthState, AuthDispatch] = useReducer(reducer, null);

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
        activeTeamStep,
        setActiveTeamStep,
        toolType,
        setToolType,
        AuthState,
        AuthDispatch,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
