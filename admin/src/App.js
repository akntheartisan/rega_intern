import { useState, createContext } from "react";
import LoginForm from "./components/Adminlogin/LoginForm";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminDash from "./components/Admindash/AdminDash";
import { Toaster } from "react-hot-toast";

export const AdminContext = createContext();
function App() {
  const [admin, setAdmin] = useState("");
  console.log(admin);

  return (
    <>
      <AdminContext.Provider value={{ admin, setAdmin }}>
        <Toaster
          toastOptions={{
            success: {
              style: {
                background: "green",
                color:'white'
              },
            },
            error: {
              style: {
                background: "red",
                color:'white'
              },
            },
          }}
        />
        <Routes>
          <Route
            path="/admin/*"
            element={
              admin ? (
                <AdminDash />
              ) : (
                <LoginForm setAdmin={setAdmin} admin={admin} />
              )
            }
          />
        </Routes>
      </AdminContext.Provider>
    </>
  );
}

export default App;
