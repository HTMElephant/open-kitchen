import { createContext, useState, useEffect } from "react";
// import axios from "axios";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  useEffect(() => {
    console.log("I am context, hear me Rawr xD");
  }, []);

  return (
  <AppContext.Provider 
  value={{

  }}>
    {children}
    </AppContext.Provider>);
};

export default AppContext;
