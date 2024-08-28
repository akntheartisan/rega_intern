import React from "react";
import Header from "../Header/Header";
import CartDetails from "./CartDetails/CartDetails";
import Footer from "../Footer/Footer";
import { useLocation } from "react-router-dom";
import CheckoutHeader from "../Checkout/CheckoutHeader";
import ProductViewHeader from "../ProductView/ProductViewHeader";

const Cart = () => {
    const location = useLocation();
    const {id} = location.state;
    
  return (
    <>
      <CheckoutHeader/>
      <CartDetails id={id}/>
      <p>harish</p>
    
    </>
  );
};

export default Cart;
