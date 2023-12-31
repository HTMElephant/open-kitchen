import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cachedUser = localStorage.getItem("user");
    if (cachedUser) {
      setLoggedInUser(JSON.parse(cachedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post("/v1/login", {
        email,
        password,
      });
      if (response.data) {
        setLoggedInUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data));
        setLoginError(false);
        navigate("/");
      } else {
        console.error("Login failed.");
        setLoginError(true);
      }
    } catch (err) {
      setLoginError(true);
      console.error(err);
    }
  };

  const logout = () => {
    setLoggedInUser({});
    localStorage.removeItem("user");
  };

  return (
  <AppContext.Provider 
  value={{
    loggedInUser,
    login,
    loginError,
    logout
  }}>
    {children}
    </AppContext.Provider>);
};

export default AppContext;
