import logo from './logo.svg';
import { Routes, Route} from "react-router-dom";
import './App.css';
import { AppProvider } from "./context/AppContext";
import { useContext } from "react";
import AppContext from "./context/AppContext";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" />
      </Routes>
      <p>
        Open Kitchen
      </p>
    </div>
  );
}

const AppWrapper = () => {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  )
}


export default AppWrapper;
