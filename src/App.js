import logo from "./logo.svg";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { AppProvider } from "./context/AppContext";
import { useContext } from "react";
import Login from "./components/Login";
import AppContext from "./context/AppContext";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Home from "./Home";

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <p>Open Kitchen</p>
    </div>
  );
}

const AppWrapper = () => {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
};

export default AppWrapper;
