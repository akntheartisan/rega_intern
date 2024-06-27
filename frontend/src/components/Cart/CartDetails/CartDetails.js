import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CartDetails = ({ props }) => {
  const [quantity, setQuantity] = useState(0);

  let total = quantity * props.price;
  console.log(total);

  const navigate = useNavigate();

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
        <div className="cart-section mt-150 mb-150">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-12">
                <div className="cart-table-wrap">
                  <table className="cart-table">
                    <thead className="cart-table-head">
                      <tr className="table-head-row">
                        <th className="product-image">Product Image</th>
                        <th className="product-name">Model</th>
                        <th className="product-price">Price(₹)</th>
                        <th className="product-quantity">Quantity</th>
                        <th className="product-total">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="table-body-row">
                        <td className="product-image">
                          <img src={props.image.url} alt />
                        </td>
                        <td className="product-name">{props.model}</td>
                        <td className="product-price">{props.price}</td>
                        <td className="product-quantity">
                          <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                          />
                        </td>
                        <td className="product-total">{quantity}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="total-section">
                  <table className="total-table">
                    <thead className="total-table-head">
                      <tr className="table-total-row">
                        <th>Total</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="total-data">
                        <td>
                          <strong>Subtotal: </strong>
                        </td>
                        <td>₹ {total}</td>
                      </tr>
                      {/* <tr className="total-data">
                        <td>
                          <strong>Shipping: </strong>
                        </td>
                        <td>$45</td>
                      </tr> */}
                      <tr className="total-data">
                        <td>
                          <strong>Total: </strong>
                        </td>
                        <td>₹ {total}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="cart-buttons">
                    <button
                      onClick={() =>
                        navigate("/checkout", {
                          state: { props, total: total, quantity:quantity },
                        })
                      }
                    >
                      Check Out
                    </button>
                  </div>
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
