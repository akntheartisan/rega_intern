import React from "react";
import { Routes, Route } from "react-router-dom";
import Product from "../Product/Product";
import Header from "../Header/Header";

const WorkSpace = () => {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/project" element={<Product />} />
      </Routes>
    </>
  );
};

export default WorkSpace;
