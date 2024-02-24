import { createContext, useState, useEffect } from "react";
import api from "../services/API";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [registerError, setRegisterError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [kitchenUsers, setKitchenUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cachedUser = localStorage.getItem("user");
    if (cachedUser) {
      const token = Cookies.get("token");
      api.setHeaders(token);
      setLoggedInUser(JSON.parse(cachedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post("/v1/login", {
        email,
        password,
      });
      if (response.data) {
        Cookies.set("token", response.data.token);
        api.setHeaders(response.data.token);
        setLoggedInUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
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

  const register = async ({
    first_name,
    last_name,
    username,
    email,
    password,
  }) => {
    try {
      const response = await api.post("/v1/register", {
        first_name,
        last_name,
        username,
        email,
        password,
      });
      if (response.data) {
        Cookies.set("token", response.data.token);
        api.setHeaders(response.data.token);
        setLoggedInUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
      } else {
        console.error("Register failed.");
        setRegisterError(true);
      }
    } catch (err) {
      setRegisterError(true);
      console.error(err);
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
        registerError,
        kitchenUsers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
