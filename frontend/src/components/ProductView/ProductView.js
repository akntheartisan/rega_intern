import React, { useState, useContext, createContext, useEffect } from "react";
import Header from "../Header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import "./ProductView.css";
import motor from "./car-engine (2).png";
import accumulator from "./accumulator.png";
import battery from "./battery.png";
import tyre from "./tyre.png";
import frame from "./frame.png";
import hand from "./hand.png";
import mobilesurf from "./mobilesurf.png";
import bikereceive from "./bikereceive.png";
import CallIcon from "@mui/icons-material/Call";
import Footer from "../Footer/Footer";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { UserContext } from "../../App";
import { client } from "../Client/Client";
import ReactImageMagnify from "react-image-magnify";

const ProductView = () => {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state;
  const [selected, setSelected] = useState("");

  const getSelectModel = (battery) => {
    const selectedModel = product.SubModel.find(
      (each) => each.battery === battery
    );
    setSelected(selectedModel);
  };

  const buynow = () => {
    const image = product.image.url;
    const model = product.model;
    let battery;
    let price;
    let modelId;
    if (!selected) {
      battery = product.SubModel[0].battery;
      price = product.SubModel[0].price;
      modelId = product.SubModel[0]._id;
    } else {
      battery = selected.battery;
      price = selected.price;
      modelId = selected._id;
    }

    const details = { image, model, battery, price, modelId };

    navigate("/checkout", { state: details });
  };

  const addcart = () => {
    if (!userData) {
      navigate("/register");
    } else {
      const userId = userData._id;
      const image = product.image.url;
      const model = product.model;
      let battery;
      let price;
      let modelId;
      if (!selected) {
        battery = product.SubModel[0].battery;
        price = product.SubModel[0].price;
        modelId = product.SubModel[0]._id;
      } else {
        battery = selected.battery;
        price = selected.price;
        modelId = selected._id;
      }

      const details = { userId, model, modelId };
      addBucketList(details);
    }
  };

  const addBucketList = async (list) => {
    try {
      const addBucketList = await client.post("/bucket/addnew", list);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div className="breadcrumb-section breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="breadcrumb-text">
                <h1>Product View</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-md-4"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <img
              src={product.image.url}
              alt="img"
              style={{ objectFit: "cover", marginTop: "-160px" }}
            />
          {/* <div style={{ objectFit: "cover", marginTop: "-160px" }}>
          <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src: product.image.url,
                },
                largeImage: {
                  src: product.image.url,
                  width: 1200,
                  height: 750,
                },
              }}
            />
          </div> */}
        
            <div
              style={{
                marginTop: "-100px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                onClick={addcart}
                style={{
                  backgroundColor: "#ff9f00",
                  borderColor: "#ff9f00",
                  width: "50%",
                  borderRadius: "12px",
                  color: "white",
                  padding: "10px",
                  fontSize: "15px",
                  fontWeight: "650",
                }}
              >
                <ShoppingCartIcon />
                &nbsp; ADD TO CART
              </button>
              &nbsp;
              <button
                onClick={buynow}
                style={{
                  backgroundColor: "#f28123",
                  borderColor: "#f28123",
                  width: "50%",
                  borderRadius: "12px",
                  color: "white",
                  padding: "10px",
                  fontSize: "15px",
                  fontWeight: "650",
                }}
              >
                <FlashOnIcon />
                &nbsp; BUY NOW
              </button>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                border: "1px solid rgba(54, 53, 53, 0.2)",
                borderRadius: "10px",
                padding: "10px",
                marginTop: "15px",
              }}
            >
              <div>
                <p style={{ margin: "0px", fontWeight: "600" }}>
                  Any Questions regarding the bike?
                </p>
                <p style={{ margin: "0px" }}>Let us help you</p>
              </div>
              <div
                style={{
                  border: "1px solid rgba(54, 53, 53, 0.2)",
                  borderRadius: "35px",
                  padding: "10px",
                }}
              >
                <CallIcon />
                &nbsp;
                <span style={{ fontSize: "15px", fontWeight: "570" }}>
                  Talk to us
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-8 mt-5">
            <h4>{product.model}</h4>
            <h6>₹ {!selected ? product.SubModel[0].price : selected.price}</h6>

            <h5>Battery Variants</h5>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: "60%",
                margin: "0 0 15px 0",
              }}
            >
              {product.SubModel.map((each) => (
                <Button
                  variant="outlined"
                  key={each._id}
                  onClick={() => getSelectModel(each.battery)}
                >
                  {each.battery}
                </Button>
              ))}
            </div>

            <div className="spec">
              <h6
                style={{
                  margin: "15px 0 0 15px",
                }}
              >
                Bike Specifications
              </h6>
              <hr />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "20px",
                  padding: "15px",
                }}
              >
                <div style={{ display: "flex" }}>
                  <img src={motor} alt="Car" />
                  <div>
                    <p style={{ margin: "0", color: "#767f88" }}>Motor</p>
                    <p style={{ fontSize: "16px", fontWeight: "500" }}>
                      {!selected ? product.SubModel[0].motor : selected.motor}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <img src={accumulator} alt="Car" />
                  <div>
                    <p style={{ margin: "0", color: "#767f88" }}>Battery</p>
                    <p style={{ fontSize: "16px", fontWeight: "500" }}>
                      {!selected
                        ? product.SubModel[0].battery
                        : selected.battery}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <img src={motor} alt="Car" />
                  <div>
                    <p style={{ margin: "0", color: "#767f88" }}>Range</p>
                    <p style={{ fontSize: "16px", fontWeight: "500" }}>
                      {!selected ? product.SubModel[0].range : selected.range}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <img src={tyre} alt="Car" />
                  <div>
                    <p style={{ margin: "0", color: "#767f88" }}>Tyre</p>
                    <p style={{ fontSize: "16px", fontWeight: "500" }}>
                      {!selected
                        ? product.SubModel[0].tyresize
                        : selected.tyresize}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <img src={hand} alt="Car" />
                  <div>
                    <p style={{ margin: "0", color: "#767f88" }}>Brakes</p>
                    <p style={{ fontSize: "16px", fontWeight: "500" }}>
                      {!selected ? product.SubModel[0].brakes : selected.brakes}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <img src={motor} alt="Car" />
                  <div>
                    <p style={{ margin: "0", color: "#767f88" }}>
                      Ground Clearance
                    </p>
                    <p style={{ fontSize: "16px", fontWeight: "500" }}>
                      {!selected ? product.SubModel[0].ground : selected.ground}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <img src={motor} alt="Car" />
                  <div>
                    <p style={{ margin: "0", color: "#767f88" }}>Payload</p>
                    <p style={{ fontSize: "16px", fontWeight: "500" }}>
                      {!selected
                        ? product.SubModel[0].payload
                        : selected.payload}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <img src={battery} alt="Car" />
                  <div>
                    <p style={{ margin: "0", color: "#767f88" }}>
                      Charging Time
                    </p>
                    <p style={{ fontSize: "16px", fontWeight: "500" }}>
                      {!selected
                        ? product.SubModel[0].charging
                        : selected.charging}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <img src={frame} alt="Car" />
                  <div>
                    <p style={{ margin: "0", color: "#767f88" }}>Frame</p>
                    <p style={{ fontSize: "16px", fontWeight: "500" }}>
                      {!selected ? product.SubModel[0].frame : selected.frame}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="payingmethod mt-4 mb-5">
              <h6
                style={{
                  margin: "15px 0 0 15px",
                }}
              >
                Buy bike in 2 simple steps
              </h6>
              <hr />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignContent: "center",
                    padding: "15px",
                  }}
                >
                  <img
                    src={mobilesurf}
                    style={{ width: "80px", height: "103px", margin: "auto" }}
                  />
                  <p style={{ fontSize: "14px", fontWeight: "600" }}>
                    Find your perfect ride
                  </p>
                  <p style={{ fontSize: "13px" }}>
                    Explore our diverse collection and select the
                    <br /> bike that best matches your needs
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignContent: "center",
                    padding: "15px",
                  }}
                >
                  <img
                    src={bikereceive}
                    style={{ width: "80px", height: "103px", margin: "auto" }}
                  />
                  <p style={{ fontSize: "14px", fontWeight: "600" }}>
                    Complete purchase & get riding
                  </p>
                  <p style={{ fontSize: "13px" }}>
                    3-day money back guarantee & hassle free RC transfer
                  </p>
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

export default ProductView;
