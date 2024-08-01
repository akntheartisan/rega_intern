import { Paper } from "@mui/material";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useNavigate } from "react-router-dom";
import { client } from "../Client/Client";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  console.log(mail);

  const submitMail = async () => {
    try {
      const forgotPasswordMail = await client.post("/user/forgotpassword", {
        mail: mail,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container">
        <div
          className="row"
          style={{ height: "100vh", display: "flex", alignItems: "center" }}
        >
          <div className="col-md-6 offset-md-3">
            <Paper elevation={5} sx={{ padding: "20px" }}>
              <h5>Forgot Password</h5>
              <p style={{ color: "#969191" }}>
                Enter your registered mail here
              </p>
              <TextField
                id="outlined-basic"
                label="MailId"
                variant="outlined"
                sx={{ width: "100%" }}
                value={mail}
                onChange={(e) => {
                  setMail(e.target.value);
                }}
              />
              <div
                style={{
                  marginTop: "15px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={submitMail}
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
                  submit
                </button>
              </div>

              <div
                style={{
                  marginTop: "15px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={() => {
                    navigate("/");
                  }}
                  style={{
                    border: "none",
                    background: "none",
                    color: "#ff9f00",
                  }}
                >
                  <NavigateBeforeIcon />
                  Back to Home
                </button>
              </div>
            </Paper>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
