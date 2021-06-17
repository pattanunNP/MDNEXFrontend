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

  const [filter_brightness, setBrightness] = useState(100);
  const [filter_contrast, setContrast] = useState(100);
  const [opacity, setOpacity] = useState(100);
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
        filter_brightness,
        setBrightness,
        filter_contrast,
        setContrast,
        opacity,
        setOpacity,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
