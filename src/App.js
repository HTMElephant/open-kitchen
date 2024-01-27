import { Routes, Route } from "react-router-dom";
import "./App.css";
import { AppProvider } from "./context/AppContext";
import Login from "./components/Login";
import Register from "./components/Register";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Home from "./components/Home";
import OpenKitchenThemeProvider from "./themes/OpenKitchenThemeProvider";

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <div style={{ marginTop: "60px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
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
      <OpenKitchenThemeProvider>
        <App />
      </OpenKitchenThemeProvider>
    </AppProvider>
  );
};

export default AppWrapper;
