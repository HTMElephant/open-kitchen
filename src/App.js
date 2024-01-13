import { Routes, Route } from "react-router-dom";
import "./App.css";
import { AppProvider } from "./context/AppContext";
import { useContext } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Recipe from "./components/Recipe";
import AppContext from "./context/AppContext";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Home from "./components/Home";
import OpenKitchenThemeProvider from "./themes/OpenKitchenThemeProvider";

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <div style={{ marginTop: "80px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path ="/recipes/:id" element={<Recipe />} />
        </Routes>
      </div>
    </div>
  );
}

const AppWrapper = () => {
  return (
    <AppProvider>
      <OpenKitchenThemeProvider>
        <App />
      </OpenKitchenThemeProvider>
    </AppProvider>
  );
};

export default AppWrapper;
