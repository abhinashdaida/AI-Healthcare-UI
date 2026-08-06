import { createContext, useState, useEffect } from "react";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [activeStep, setActiveStep] = useState(() => {
    return Number(sessionStorage.getItem("activeStep")) || 0;
  });

  useEffect(() => {
    sessionStorage.setItem("activeStep", activeStep);
  }, [activeStep]);

  return (
    <ProfileContext.Provider
      value={{
        activeStep,
        setActiveStep,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
