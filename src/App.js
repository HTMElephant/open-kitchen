import { Routes, Route } from "react-router-dom";
import "./App.css";
import { AppProvider } from "./context/AppContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Recipe from "./components/Recipe";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Home from "./components/Home";
import OpenKitchenThemeProvider from "./themes/OpenKitchenThemeProvider";
import Kitchen from "./components/Kitchen";

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
          <Route path ="/kitchens/:id/recipes" element={<Kitchen />} />

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