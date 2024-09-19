import React from "react";
import { Routes, Route } from "react-router-dom";
import Product from "../Product/Product";
import Header from "../Header/Header";
import Order from "../Order/Order";
import PrimaryProduct from "../Product/PrimaryProduct";
import AdminContact from "../Contact/AdminContact";

const WorkSpace = () => {
  return (
    <>
      <Header/>
      <Routes>
      <Route path="/primary" element={<PrimaryProduct />} />
        <Route path="/project" element={<Product />} />
        <Route path="/order" element={<Order />} />
        <Route path="/contact" element={<AdminContact />} />
      </Routes>
    </>
  );
};

export default WorkSpace;
