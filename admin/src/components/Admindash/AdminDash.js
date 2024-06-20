import React from "react";
import Navbar from "./Navbar/Navbar";
import WorkSpace from "./Workspace/WorkSpace";
import Header from "./Header/Header";

const AdminDash = () => {
  return (
    <>
      
      <div className="row">
        <div
          className="col-md-2"
          style={{
            minHeight: "100vh",
            background: "linear-gradient(to bottom, #1ecf73, #b7e56a)",
          }}
        >
          <Navbar />
        </div>

        <div className="col-md-10" style={{ minHeight: "100vh" }}>
          <WorkSpace />
        </div>
      </div>
    </>
  );
};

export default AdminDash;
