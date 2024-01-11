import { createContext, useState, useEffect } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";



const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [registerError, setRegisterError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const cachedUser = localStorage.getItem("user");
    if (cachedUser) {
      setLoggedInUser(JSON.parse(cachedUser));
    }
  }, []);

  const login = async (email, password) => {
    try{

      const response = await axios.post("/v1/login", {
        email,
        password,
      });
      if (response.data) {
        setLoggedInUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        setLoginError(false)
        navigate("/")
      } else {
        console.error("Login failed.");
        setLoginError(true)
      }
    } catch (err) {
      setLoginError(true)
      console.error(err)
    }
  };

  const logout = () => {
    setLoggedInUser({});
    localStorage.removeItem("user");
  };

  const register = async ({first_name, last_name, username, email, password}) => {
    try{
      const response = await axios.post("/v1/register", {
        first_name,
        last_name,
        username,
        email,
        password
      });
      if(response.data) {
        setLoggedInUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/")
      } else {
        console.error("Register failed.")
        setRegisterError(true)
      }
    } catch (err) {
      setRegisterError(true)
      console.error(err)
    }
  };

  return (
  <AppContext.Provider 
  value={{
    loggedInUser,
    login,
    loginError,
    logout,
    register,
    registerError
  }}>
    {children}
    </AppContext.Provider>);
};

export default AppContext;
