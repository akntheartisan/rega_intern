import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { client } from "../../Client/Client";
import { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Link, useNavigate } from "react-router-dom";
import Cart from "../../Cart/Cart";

const Product = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  console.log(product.productData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.get("/project/getproduct");
        console.log(response.data.data);
        const productData = response.data.data;
        if (product) {
          setProduct((prev) => ({ ...prev, productData }));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="container" style={{ padding: "20px" }}>
        <div className="row">
          <div className="section-title col-md-12">
            <h3 style={{ textAlign: "center" }}>
              <span className="orange-text">Our</span> Products
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid,
              fuga quas itaque eveniet beatae option.
            </p>
          </div>

          {product.productData &&
            product.productData.map((each) => {
              console.log(each.model);
              return (
                <div className="col-md-4">
                  <Box
                    sx={{
                      "& > :not(style)": {
                        m: 1,
                        width: 300,
                        height: 400,
                      },
                    }}
                  >
                    <Paper
                      elevation={4}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "0 30px 30px 30px",
                      }}
                    >
                      <img
                        src={each.image.url}
                        style={{
                          width: "100%",
                          height: "250px",
                          objectFit: "cover",
                          marginTop: "-25px",
                        }}
                      />
                      <h4 style={{ textAlign: "center" }}>{each.model}</h4>
                      <h5 style={{ textAlign: "center" }}>Price: Rs.{each.price}</h5>

                      <div style={{ display: "flex" }}>
                        <button
                          style={{
                            backgroundColor: "#f28123",
                            borderColor: "#f28123",
                            width: "100%",
                            borderRadius: "8px",
                            color: "white",
                            padding: "10px",
                            fontSize: "15px",
                          }}
                        >
                          <ShoppingCartIcon />
                          &nbsp; Add Cart
                        </button>
                        &nbsp;&nbsp;&nbsp;
                        <button
                          onClick={() => navigate(`/cart`, { state: each })}
                          style={{
                            backgroundColor: "#f28123",
                            borderColor: "#f28123",
                            width: "100%",
                            borderRadius: "8px",
                            color: "white",
                            padding: "10px",
                            fontSize: "15px",
                          }}
                        >
                          <ShoppingBagIcon />
                          &nbsp; Buy Now
                        </button>
                      </div>
                    </Paper>
                  </Box>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Product;
