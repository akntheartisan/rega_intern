import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../../Client/Client";
import { UserContext } from "../../../App";
import EmptyCart from "./EmptyCart";

const CartDetails = ({ id }) => {
  // const { userData, setUserData } = useContext(UserContext);

  const [bucket, setBucket] = useState([]);
  const cartItemsQuantity = bucket.length;
  console.log(bucket);

  useEffect(() => {
    getBucketList();
  }, [id]);

  const getBucketList = async () => {
    try {
      const getBucketList = await client.get("/bucket/getBucket", {
        params: { id: id },
      });
      console.log(getBucketList);
      setBucket(getBucketList.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuantity = (e, id) => {
    const updatedQuantity = e.target.value;
    const updatedBucket = bucket.map((item) => {
      if (item.subModelDetails._id === id) {
        return { ...item, quantity: updatedQuantity };
      }
      return item;
    });

    setBucket(updatedBucket);
  };

  const calculateTotal = () => {
    return bucket.reduce((total, item) => {
      return total + item.quantity * item.subModelDetails.price;
    }, 0);
  };

  // let total = quantity * props.price;
  // console.log(total);

  const navigate = useNavigate();

  return (
    <>
      <div>
       { bucket.length === 0 ? <EmptyCart/> : <div className="cart-section mt-5 mb-5">
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
                      {bucket &&
                        bucket.map((each) => (
                          <tr
                            className="table-body-row"
                            key={each.subModelDetails._id}
                          >
                            <td>
                              <img
                                src={each.image}
                                alt="model"
                                style={{ width: "150px" }}
                              />
                            </td>
                            <td className="product-name">
                              {each.model}
                              <br />
                              {each.subModelDetails.battery}
                            </td>

                            <td className="product-price">
                              {each.subModelDetails.price}
                            </td>
                            <td className="product-quantity">
                              <input
                                type="number"
                                value={each.quantity}
                                onChange={(e) =>
                                  handleQuantity(e, each.subModelDetails._id)
                                }
                              />
                            </td>
                            <td className="product-total">
                              {each.quantity * each.subModelDetails.price
                                ? each.quantity * each.subModelDetails.price
                                : 0}
                            </td>
                          </tr>
                        ))}
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
                        <td>₹ {calculateTotal() ? calculateTotal() : 0}</td>
                      </tr>
                      <tr className="total-data">
                        <td>
                          <strong>Total: </strong>
                        </td>
                        <td>₹ {calculateTotal() ? calculateTotal() : 0}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="cart-buttons">
                    <button
                      style={{
                        backgroundColor: "rgb(242, 129, 35)",
                        color: "white",
                        borderColor: "rgb(242, 129, 35)",
                        padding: "10px 20px",
                        borderRadius: "60px",
                        marginTop: "15px",
                      }}
                      onClick={() =>
                        navigate("/checkout", {
                          state: {
                            cartDetails: bucket,
                            cartItemsQuantity: cartItemsQuantity,
                            total: calculateTotal(),
                          },
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
        </div>}
       
      </div>
    </>
  );
};

export default CartDetails;
