import { Button, Paper } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { client } from "../Client/Client";
import CheckoutHeader from "../Checkout/CheckoutHeader";
import "./order.css";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CancelIcon from "@mui/icons-material/Cancel";
import search from "./search.png";
import { UserContext } from "../../App";

const intialCheckBox = {
  delivered: false,
  notdelivered: false,
  cancelled: false,
};

const Orders = () => {
  const location = useLocation();
  const { id } = location.state;

  const { userData, setUserData } = useContext(UserContext);

  const [ordered, setOrdered] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [orderCheckBox, setOrderCheckBox] = useState(intialCheckBox);

  console.log(filtered);
  console.log(ordered);
  console.log(search);

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
      setFiltered(finalProduct);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheck = (e) => {
    const { name, checked } = e.target;
    console.log(name, checked);

    setOrderCheckBox((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  useEffect(() => {
    filterOrder();
  }, [orderCheckBox]);

  const filterOrder = () => {
    let filteredOrder = [...ordered]; // Start with the original ordered data

    // If 'Delivered' checkbox is selected
    if (orderCheckBox.delivered) {
      filteredOrder = ordered.map((each) => ({
        ...each,
        cartData: each.cartData.filter((eachData) =>
          eachData.deliverystatus.includes("Delivered")
        ),
      }));
    }

    // If 'Not Delivered' checkbox is selected (only apply this if 'Delivered' is not selected)
    if (orderCheckBox.notdelivered) {
      filteredOrder = ordered.map((each) => ({
        ...each,
        cartData: each.cartData.filter((eachData) =>
          eachData.deliverystatus.includes("Not Delivered")
        ),
      }));
    }

    // If 'Cancelled' checkbox is selected (only apply this if the other two are not selected)
    if (orderCheckBox.cancelled) {
      filteredOrder = ordered.map((each) => ({
        ...each,
        cartData: each.cartData.filter((eachData) =>
          eachData.deliverystatus.includes("cancelled")
        ),
      }));
    }

    // Update the filtered state
    setFiltered(filteredOrder);
  };

  const cancelProduct = async (purchased_id, cartId) => {
    const id = userData._id;

    console.log(id, purchased_id, cartId);

    try {
      const cancelProduct = await client.post("/user/cancelProducts", {
        id,
        purchased_id,
        cartId,
      });

      if (cancelProduct.status === 200) {
        getOrderedProducts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const pdfDownload = async (purchased_id, cartId) => {
    const id = userData._id;
  
    console.log(id, purchased_id, cartId);
  
    try {
      // Make the request to the backend to get the PDF
      const response = await client.get("/pdfdown/downloads", {
        params: { id, purchased_id, cartId },
        responseType: 'blob'  // Important: Set responseType to 'blob' to handle binary data
      });
  
      // Create a Blob from the PDF response
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
  
      // Create a link to download the PDF
      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'invoice.pdf';  // Set the filename for the download
      document.body.appendChild(a);  // Append the link to the body
      a.click();  // Simulate a click to trigger the download
      a.remove();  // Clean up by removing the link from the DOM
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };
  
  return (
    <>
      <CheckoutHeader />
      <div className="container-fluid mt-5">
        <div className="row" style={{ display: "flex" }}>
          <div className="col-md-3 mt-3">
            <Paper elevation={3} sx={{ padding: "5px" }}>
              <h5>Filters</h5>
              <hr />
              <h6>Ordered Status</h6>

              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={orderCheckBox.delivered}
                      onChange={handleCheck}
                      name="delivered"
                      disabled={
                        orderCheckBox.notdelivered || orderCheckBox.cancelled
                      }
                    />
                  }
                  label="Delivered"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value={orderCheckBox.notdelivered}
                      onChange={handleCheck}
                      name="notdelivered"
                      disabled={
                        orderCheckBox.delivered || orderCheckBox.cancelled
                      }
                    />
                  }
                  label="Not Delivered"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value={orderCheckBox.cancelled}
                      onChange={handleCheck}
                      name="cancelled"
                      disabled={
                        orderCheckBox.delivered || orderCheckBox.notdelivered
                      }
                    />
                  }
                  label="Cancelled"
                />
              </FormGroup>
            </Paper>
          </div>
          <div className="col-md-9">
            {/* <div style={{display:'flex'}}>
              <input
                className="form-control"
                type="text"
                placeholder="Search your order"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
              />
              <button className="btn btn-danger" onClick={filterOrder}> Search </button>
            </div> */}
            {filtered &&
              filtered.map((eachOrder) => {
                return (
                  <div key={eachOrder.id}>
                    {eachOrder.cartData.map((order) => {
                      return (
                        <Paper
                          elevation={4}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "10px",
                            padding: "20px",
                          }}
                        >
                          <div>
                            <img src={order.image} className="order_image" />
                          </div>
                          <div>
                            <p>
                              {order.model} {order.subModelDetails.battery}
                            </p>
                            <p></p>
                            <p>{order.subModelDetails.range}</p>
                          </div>
                          <div>
                            <p>&#8377;{order.subModelDetails.price}</p>
                          </div>

                          <div>
                            {order.deliverystatus === "Delivered" ? (
                              <>
                                <div
                                  style={{
                                    height: "10px",
                                    width: "10px",
                                    backgroundColor: "green",
                                    borderRadius: "50%",
                                    display: "inline-block",
                                  }}
                                ></div>{" "}
                                {order.deliverystatus}
                                <div>
                                  <Button
                                    onClick={() =>
                                      pdfDownload(eachOrder._id, order.cartId)
                                    }
                                    variant="contained"
                                    startIcon={<PictureAsPdfIcon />}
                                    className="order_cancel"
                                  >
                                    Invoice
                                  </Button>
                                </div>
                              </>
                            ) : order.deliverystatus === "Not Delivered" ? (
                              <>
                                <div
                                  style={{
                                    height: "10px",
                                    width: "10px",
                                    backgroundColor: "#f28123",
                                    borderRadius: "50%",
                                    display: "inline-block",
                                  }}
                                ></div>{" "}
                                {order.deliverystatus}
                                <div>
                                  <Button
                                    onClick={() =>
                                      cancelProduct(eachOrder._id, order.cartId)
                                    }
                                    color="error"
                                    variant="contained"
                                    startIcon={<CancelIcon />}
                                    className="order_cancel"
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </>
                            ) : order.deliverystatus === "cancelled" ? (
                              <>
                                <div
                                  style={{
                                    height: "10px",
                                    width: "10px",
                                    backgroundColor: "red",
                                    borderRadius: "50%",
                                    display: "inline-block",
                                  }}
                                ></div>
                                {order.deliverystatus}
                                <div></div>
                              </>
                            ) : null}
                          </div>
                        </Paper>
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
