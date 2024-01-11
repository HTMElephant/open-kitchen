import { Routes, Route } from "react-router-dom";
import "./App.css";
import { AppProvider } from "./context/AppContext";
import { useContext } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import AppContext from "./context/AppContext";
import ResponsiveAppBar from "./components/ResponsiveAppBar";

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <div style={{marginTop: "60px"}}>
        <Routes>
          <Route path="/" />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
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
