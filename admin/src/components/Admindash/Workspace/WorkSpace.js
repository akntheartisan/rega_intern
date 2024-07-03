import React from "react";
import { Routes, Route } from "react-router-dom";
import Product from "../Product/Product";
import Header from "../Header/Header";
import Order from "../Order/Order";
import PrimaryProduct from "../Product/PrimaryProduct";

const WorkSpace = () => {
  return (
    <>
      <Header/>
      <Routes>
      <Route path="/primary" element={<PrimaryProduct />} />
        <Route path="/project" element={<Product />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </>
  );
};

export default WorkSpace;
