import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { client } from "../Client/Client";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CheckoutHeader from "./CheckoutHeader";

const intial = {
  name: "",
  username: "",
  address: "",
  district: "",
  state: "",
  pincode: "",
  mobile: "",
};
const Checkout = () => {
  const navigate = useNavigate();

  const { userData, setUserData } = useContext(UserContext);
  const [checked, setChecked] = useState(false);
  const [shipAddress, setShipAddress] = useState(intial);
  const [pod, setPod] = useState(false);
  const [online, setOnline] = useState(false);
  const [model, setModel] = useState(true);
  const [totalShow, setTotalShow] = useState(true);

  console.log(userData);

  const location = useLocation();
  const cartData = location.state.props || location.state;
  console.log(cartData);
  const actualTotal = location.state.total;
  const total = actualTotal ? actualTotal : cartData.price;
  const quantity = location.state.quantity;

  const handleBillChange = (e) => {
    const { name, value } = e.target;

    setShipAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentDelivery = (e) => {
    setPod(e.target.checked);
    setOnline(false);
  };

  const handlePaymentOnline = (e) => {
    setOnline(e.target.checked);
    setPod(false);
  };

  const placeorder = () => {
    if (pod) {
      console.log("payment on delivery");
      addSelectedProduct("offline");
    }

    if (online) {
      console.log("online payment");
      addSelectedProduct("online");
    }
  };

  const addSelectedProduct = async (paymentMode) => {
    let userDetails;
    const productId = cartData.modelId;
    const userId = userData._id;
    const battery = cartData.battery;
    const model = cartData.model;

    if (checked) {
      userDetails = { ...userData, userId };
      console.log(userDetails);
    } else {
      userDetails = { ...shipAddress, userId };
      console.log(userDetails);
    }

    try {
      const response = await client.post("/cart/addCart", {
        userDetails,
        productId,
        total,
        quantity,
        battery,
        model,
        paymentMode,
      });

      console.log(response.data.error);

      if (paymentMode === "online" && response.data.error === "Amount exceed") {
        toast.error("Amount exceed");
      } else {
        initPayment(response.data.transaction);
      }

      if (response.data.success === "offline order success") {
        toast.success("your order has been placed");
        setChecked(false);
        setPod(false);
        setModel(false);
        setTotalShow(false);
        // navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const initPayment = (data) => {
    let verify;

    const options = {
      key: "rzp_test_ooBBvuCJO2yhPh",
      amount: 200,
      currency: data.currency,
      name: "REGA SCOOTER",
      description: "Test Transaction",
      order_id: data.id,
      handler: async (response) => {
        console.log("Test Transaction:");
        console.log(response);

        response.razorpay_order_id = data.id;
        response.razorpay_signature = response.razorpay_signature;
        try {
          verify = await client.post("/cart/verify", response);
          console.log(verify);

          if (verify.data.message === "Payment Verified Sucessfully") {
            addCartOnlinePayment(
              response.razorpay_order_id,
              response.razorpay_payment_id
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const addCartOnlinePayment = async (order, payment) => {
    let userDetails;
    const productId = cartData.modelId;
    const userId = userData._id;
    const battery = cartData.battery;
    const model = cartData.model;
    const order_id = order;
    const payment_id = payment;

    if (checked) {
      userDetails = { ...userData, userId };
      console.log(userDetails);
    } else {
      userDetails = { ...shipAddress, userId };
      console.log(userDetails);
    }

    try {
      const response = await client.post("/cart/addCartOnline", {
        userDetails,
        productId,
        total,
        quantity,
        battery,
        model,
        order_id,
        payment_id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <Header /> */}
      <CheckoutHeader />
      <div>
        {/* <div className="breadcrumb-section breadcrumb-bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 text-center">
                <div className="breadcrumb-text">
                  <h1>Check Out Product</h1>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className="checkout-section mt-5 mb-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="checkout-accordion-wrap">
                  <div className="accordion" id="accordionExample">
                    <div className="card single-accordion">
                      <div className="card-header" id="headingOne">
                        <h5 className="mb-0">
                          <button
                            className="btn btn-link"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            Billing Address
                          </button>
                        </h5>
                      </div>
                      <div
                        id="collapseOne"
                        className="collapse show"
                        aria-labelledby="headingOne"
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">
                          <div className="billing-address-form">
                            <form>
                              <p>
                                <input
                                  type="text"
                                  value={userData.name}
                                  placeholder="Name"
                                />
                              </p>
                              <p>
                                <input
                                  type="text"
                                  value={userData.username}
                                  placeholder="Email"
                                />
                              </p>
                              <p>
                                <input
                                  type="text"
                                  value={userData.address}
                                  placeholder="Address"
                                />
                              </p>
                              <p style={{ display: "flex", gap: "10px" }}>
                                <input
                                  type="text"
                                  value={userData.district}
                                  placeholder="district"
                                />
                                <input
                                  type="text"
                                  value={userData.state}
                                  placeholder="state"
                                />
                                <input
                                  type="text"
                                  value={userData.pincode}
                                  placeholder="pincode"
                                />
                              </p>
                              <p>
                                <input
                                  type="text"
                                  value={userData.mobile}
                                  placeholder="Phone"
                                />
                              </p>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card single-accordion">
                      <div className="card-header" id="headingTwo">
                        <h5 className="mb-0">
                          <button
                            className="btn btn-link collapsed"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                          >
                            Shipping Address
                          </button>
                        </h5>
                      </div>
                      <div
                        id="collapseTwo"
                        className="collapse"
                        aria-labelledby="headingTwo"
                        data-parent="#accordionExample"
                      >
                        <div
                          className="form-check"
                          style={{
                            width: "40%",
                            marginTop: "30px",
                            marginLeft: "37px",
                          }}
                        >
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={checked}
                            onChange={(e) => setChecked(e.target.checked)}
                            id="flexCheckDefault"
                            {...(checked ? { checked } : {})}
                          />
                          <h6
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
                            Same as Billing Address
                          </h6>
                        </div>

                        <div
                          className="card-body"
                          style={{ marginTop: "-10px" }}
                        >
                          <div className="billing-address-form">
                            <form>
                              <p>
                                <input
                                  type="text"
                                  name="name"
                                  value={
                                    checked ? userData.name : shipAddress.name
                                  }
                                  placeholder="Name"
                                  onChange={handleBillChange}
                                  {...(checked ? { readOnly: true } : {})}
                                />
                              </p>
                              <p>
                                <input
                                  type="text"
                                  name="username"
                                  value={
                                    checked
                                      ? userData.username
                                      : shipAddress.username
                                  }
                                  placeholder="Email"
                                  onChange={handleBillChange}
                                  {...(checked ? { readOnly: true } : {})}
                                />
                              </p>
                              <p>
                                <input
                                  type="text"
                                  name="address"
                                  value={
                                    checked
                                      ? userData.address
                                      : shipAddress.address
                                  }
                                  placeholder="Address"
                                  onChange={handleBillChange}
                                  {...(checked ? { readOnly: true } : {})}
                                />
                              </p>
                              <p style={{ display: "flex", gap: "10px" }}>
                                <input
                                  type="text"
                                  name="district"
                                  value={
                                    checked
                                      ? userData.district
                                      : shipAddress.district
                                  }
                                  placeholder="district"
                                  onChange={handleBillChange}
                                  {...(checked ? { readOnly: true } : {})}
                                />
                                <input
                                  type="text"
                                  name="state"
                                  value={
                                    checked ? userData.state : shipAddress.state
                                  }
                                  placeholder="state"
                                  onChange={handleBillChange}
                                  {...(checked ? { readOnly: true } : {})}
                                />
                                <input
                                  type="text"
                                  name="pincode"
                                  value={
                                    checked
                                      ? userData.pincode
                                      : shipAddress.pincode
                                  }
                                  placeholder="pincode"
                                  onChange={handleBillChange}
                                  {...(checked ? { readOnly: true } : {})}
                                />
                              </p>
                              <p>
                                <input
                                  type="text"
                                  name="mobile"
                                  value={
                                    checked
                                      ? userData.mobile
                                      : shipAddress.mobile
                                  }
                                  placeholder="Phone"
                                  onChange={handleBillChange}
                                  {...(checked ? { readOnly: true } : {})}
                                />
                              </p>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card single-accordion">
                      <div className="card-header" id="headingThree">
                        <h5 className="mb-0">
                          <button
                            className="btn btn-link collapsed"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                          >
                            Payment Details
                          </button>
                        </h5>
                      </div>
                      <div
                        id="collapseThree"
                        className="collapse"
                        aria-labelledby="headingThree"
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">
                          <div className="card-details">
                            <p style={{ fontSize: "14px" }}>
                              Choose Your Mode of Payment
                            </p>

                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-around",
                                marginTop: "15px",
                              }}
                            >
                              <div className="form-check">
                                <div>
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="flexRadioDefault1"
                                    value={pod}
                                    onChange={handlePaymentDelivery}
                                    {...(pod ? { checked } : {})}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="flexRadioDefault1"
                                  >
                                    Pay on Delivery
                                  </label>
                                </div>
                              </div>
                              <div className="form-check">
                                <div>
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="flexRadioDefault2"
                                    value={online}
                                    onChange={handlePaymentOnline}
                                    {...(pod ? { checked } : {})}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="flexRadioDefault2"
                                  >
                                    Online Payment
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="order-details-wrap">
                  <table className="order-details">
                    <thead>
                      <tr>
                        <th>Your order Details</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody className="order-details-body">
                      <tr>
                        <td style={{ fontSize: "17px", fontWeight: "500" }}>
                          Product
                        </td>
                        <td style={{ fontSize: "17px", fontWeight: "500" }}>
                          Total
                        </td>
                      </tr>
                      <tr>
                        <td>{model ? cartData.model : ""}</td>
                        <td>{total ? total : cartData.price}</td>
                      </tr>
                    </tbody>
                    <tbody className="checkout-details">
                      <tr>
                        <td style={{ fontSize: "14px", fontWeight: "500" }}>
                          Total
                        </td>
                        <td style={{ fontSize: "14px", fontWeight: "500" }}>
                          {total ? total : cartData.price}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {(pod || online) && (
                    <button
                      onClick={placeorder}
                      style={{
                        backgroundColor: "#F28123",
                        color: "white",
                        borderColor: "#F28123",
                        padding: "10px 20px",
                        borderRadius: "60px",
                        marginTop: "15px",
                      }}
                    >
                      Place Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
