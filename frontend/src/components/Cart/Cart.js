import React from "react";
import Header from "../Header/Header";
import CartDetails from "./CartDetails/CartDetails";
import Footer from "../Footer/Footer";
import { useLocation } from "react-router-dom";

const Cart = () => {
    const location = useLocation();
    const {id} = location.state;
    
  return (
    <>
      <Header />
      <CartDetails id={id}/>
      <Footer />
    </>
  );
};

export default Cart;
