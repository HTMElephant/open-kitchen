import { createContext, useState, useEffect } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";



const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate()

  // useEffect(() => {
  //   const cachedUser = localStorage.getItem("user");
  //   if (cachedUser) {
  //     setUser(JSON.parse(cachedUser));
  //   }
  // }, []);

  const login = async (email, password) => {
    try{

      const response = await axios.post("/v1/login", {
        email,
        password,
      });
      console.log(response);
      if (response.data) {
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        setLoginError(false)
        navigate("/")
      } else {
        console.error("Login failed.");
        setLoginError(true)
      }
    } catch (err) {
      setLoginError(true)
      console.log(err)
    }
  };

  return (
  <AppContext.Provider 
  value={{
    user,
    login,
    loginError
  }}>
    {children}
    </AppContext.Provider>);
};

export default AppContext;
