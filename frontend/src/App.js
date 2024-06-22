import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Contact from "./components/Contact/Contact";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import LoginPage from "./components/LoginPage/LoginPage";
import React, { useState, createContext } from "react";
import { Toaster } from "react-hot-toast";
// import LoginPage from "./components/LoginPage/LoginPage";

export const UserContext = createContext();
function App() {
  const [userData, setUserData] = useState("");
  return (
    <>
      <UserContext.Provider value={{userData,setUserData}}>
        <Toaster
          toastOptions={{
            success: {
              style: {
                background: "#809c13",
                color: "white",
              },
            },
            error: {
              style: {
                background: "#ff5252",
                color: "white",
              },
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<LoginPage />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
