import React from "react";
import Header from "../Header/Header";
import { useLocation } from "react-router-dom";
import "./ProductView.css";
import car from "./car.png";
import motor from "./motor (1).png";

const ProductView = () => {
  const location = useLocation();
  const product = location.state;

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
            style={{ display: "flex", justifyContent: "center" }}
          >
            <img src={product.image.url} />
          </div>
          <div className="col-md-8 mt-5">
            <h4>{product.model}</h4>
            <h6>₹ {product.price}</h6>
            <div className="spec">
              <p
                style={{
                  margin: "15px 0 0 15px",
                  fontSize: "17px",
                  fontWeight: "700px",
                }}
              >
                Bike Specifications
              </p>
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
                      {product.motor}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <img src={motor} alt="Car" />
                  <div>
                    <p style={{ margin: "0", color: "#767f88" }}>Battery</p>
                    <p style={{ fontSize: "16px", fontWeight: "500" }}>
                      {product.battery}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <img src={motor} alt="Car" />
                  <div>
                    <p style={{ margin: "0", color: "#767f88" }}>Range</p>
                    <p style={{ fontSize: "16px", fontWeight: "500" }}>
                      {product.range}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <img src={motor} alt="Car" />
                  <div>
                    <p style={{ margin: "0", color: "#767f88" }}>Tyre</p>
                    <p style={{ fontSize: "16px", fontWeight: "500" }}>
                      {product.tyresize}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <img src={motor} alt="Car" />
                  <div>
                    <p style={{ margin: "0", color: "#767f88" }}>Brakes</p>
                    <p style={{ fontSize: "16px", fontWeight: "500" }}>
                      {product.brakes}
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
                      {product.ground}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <img src={motor} alt="Car" />
                  <div>
                    <p style={{ margin: "0", color: "#767f88" }}>Payload</p>
                    <p style={{ fontSize: "16px", fontWeight: "500" }}>
                      {product.payload}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <img src={motor} alt="Car" />
                  <div>
                    <p style={{ margin: "0", color: "#767f88" }}>
                      Charging Time
                    </p>
                    <p style={{ fontSize: "16px", fontWeight: "500" }}>
                      {product.motor}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <img src={motor} alt="Car" />
                  <div>
                    <p style={{ margin: "0", color: "#767f88" }}>Frame</p>
                    <p style={{ fontSize: "16px", fontWeight: "500" }}>
                      {product.frame}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="payingmethod mt-4">
              <p
                style={{
                  margin: "15px 0 0 15px",
                  fontSize: "17px",
                  fontWeight: "700px",
                }}
              >
                Buy bike in 2 simple steps
              </p>
              <hr />
              <div style={{display:'flex'}}>
                <div>
                  <img src="" />
                  <p style={{ margin: "0",fontSize:'14px',fontWeight:'600' }}>Find your perfect ride</p>
                  <p style={{ margin:"0",fontSize:'13px' }}>
                    Explore our diverse collection and select the bike that best
                    matches your needs
                  </p>
                </div>
                <div>
                  <img src="" />
                  <p style={{ margin: "0",fontSize:'14px',fontWeight:'600' }}>Find your perfect ride</p>
                  <p style={{ margin:"0",fontSize:'13px' }}>
                    Explore our diverse collection and select the bike that best
                    matches your needs
                  </p>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductView;
