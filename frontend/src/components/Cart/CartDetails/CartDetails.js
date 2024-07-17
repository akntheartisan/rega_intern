import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CartDetails = ({ props }) => {

  console.log(props);
  const [quantity, setQuantity] = useState(0);
  const [selectProduct, setSelectProduct] = useState(() => {
    const saved = localStorage.getItem('selectProduct');
    return saved ? JSON.parse(saved) : [];
  });


  console.log(selectProduct);

  // let total = quantity * props.price;
  // console.log(total);

  // const navigate = useNavigate();

  return (
    <>
      <div>
        <div className="breadcrumb-section breadcrumb-bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 text-center">
                <div className="breadcrumb-text">
                  <h1>Cart</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
       
      </div>
    </>
  );
};

export default CartDetails;
