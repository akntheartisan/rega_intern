import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { client } from "../Client/Client";
import CheckoutHeader from "../Checkout/CheckoutHeader";

const Orders = () => {
  const location = useLocation();
  const { id } = location.state;

  const [ordered, setOrdered] = useState([]);
  console.log(ordered);

  useEffect(() => {
    getOrderedProducts();
  }, []);

  const getOrderedProducts = async () => {
    try {
      const getOrderedProducts = await client.get("/user/getOrderedProducts", {
        params: { id },
      });

      console.log(getOrderedProducts.data.purchased);
      const finalProduct = getOrderedProducts.data.purchased;

      setOrdered(finalProduct);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CheckoutHeader />
      <div className="container">
        <div className="row">
          {/* <div className='col-md-12'>

            </div> */}
      
            {ordered &&
              ordered.map((eachOrder) => {
                return (
                  <div key={eachOrder.id}>
                    {eachOrder.cartData.map((order) => {
                      return (
                        <div className="col-md-12 mt-3">
                           <Paper>
                                <div>
                                    
                                </div>
                           </Paper>
                        </div>
                      )
                    })}
                  </div>
                );
              })}
          
        </div>
      </div>
    </>
  );
};

export default Orders;
