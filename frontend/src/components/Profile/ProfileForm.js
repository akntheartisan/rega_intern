import React, { useContext, useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { client } from "../Client/Client";
import "./profiledesign.css";
import { Paper } from "@mui/material";

const ProfileForm = ({ userData }) => {
  console.log(userData);

  const [profileData, setProfileData] = useState({
    name: userData.name,
    username: userData.username,
    mobile: "",
    address: "",
    landmark: "",
    district: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

  if (["mobile", "pincode"].includes(name)) {
    if (/[^0-9]|\s/.test(value)) {
      return false;
    }
  }

  if (["landmark", "district", "state"].includes(name)) {
    if (/[^a-zA-Z\s]/.test(value) || value.charCodeAt(0) === 32) {
      return false;
    }
  }

    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log(profileData);

  const profileSubmit = async () => {
    const id = userData._id;
    console.log(id);
    try {
      const response = await client.post("/user/profileupdate", {
        id,
        ...profileData,
      });

      console.log(response.status);

      if (response.status === 200) {
        toast.success("Submitted Successfully");
        setProfileData({
          name: userData.name,
          username: userData.username,
          mobile: "",
          address: "",
          landmark: "",
          district: "",
          state: "",
          pincode: "",
        });

        getProfileData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProfileData = useCallback(async () => {
    const id = userData._id;
    try {
      const response = await client.get("/user/getprofiledata", {
        params: { id },
      });
      const user = response.data.profile;
      console.log(user);
      if (response.status === 200) {
        setProfileData(user);
      }
    } catch (error) {
      console.log(error);
    }
  }, [userData]);

  useEffect(() => {
    getProfileData();
  }, [getProfileData]);

  const deleteAccount = async () => {
    const id = userData._id;
    try {
      const deleteAccount = await client.post("/user/deleteAccount", {
        id: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <Paper
          elevation={5}
          sx={{ padding: "25px", marginTop: "15px", marginBottom: "15px" }}
        >
          <div className="row">
            <div className="col-md-12 mt-1 mb-1">
              <h5>Personal Information</h5>
            </div>

            <div className="col-md-4">
              <div className="mb-3">
                <label htmlFor="model" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <label htmlFor="motor" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={profileData.username}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <label htmlFor="battery" className="form-label">
                  Mobile
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="mobile"
                  name="mobile"
                  value={profileData.mobile}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-md-12 mt-1 mb-1">
              <h5>Contact Details</h5>
            </div>
            <div className="col-md-12">
              <div className="mb-3">
                <label htmlFor="range" className="form-label">
                  Address
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={profileData.address}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="brakes" className="form-label">
                  Landmark
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="landmark"
                  name="landmark"
                  value={profileData.landmark}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="ground" className="form-label">
                  District
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="district"
                  name="district"
                  value={profileData.district}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="payload" className="form-label">
                  State
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  name="state"
                  value={profileData.state}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="payload" className="form-label">
                  Pincode
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="pincode"
                  name="pincode"
                  value={profileData.pincode}
                  onChange={handleChange}
                  maxLength={6}
                />
              </div>
            </div>

            <div className="col-md-6">
              <button
                style={{
                  backgroundColor: "#878787",
                  borderColor: "#878787",
                  width: "20%",
                  borderRadius: "12px",
                  color: "white",
                  padding: "5px",
                  fontSize: "15px",
                  fontWeight: "650",
                }}
              >
                Cancel
              </button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button
                onClick={profileSubmit}
                style={{
                  backgroundColor: "#ff9f00",
                  borderColor: "#ff9f00",
                  width: "20%",
                  borderRadius: "12px",
                  color: "white",
                  padding: "5px",
                  fontSize: "15px",
                  fontWeight: "650",
                }}
              >
                Submit
              </button>
            </div>

            <div className="col-md-12 mt-5">
              <h6>FAQs</h6>
              <div style={{ marginBottom: "15px" }}>
                <p style={{ fontSize: "16px", fontWeight: "550" }}>
                  What happens when I update my email address (or mobile
                  number)?
                </p>
                <p>
                  Your login email id (or mobile number) changes, likewise.
                  You'll receive all your account related communication on your
                  updated email address (or mobile number).
                </p>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <p style={{ fontSize: "16px", fontWeight: "550" }}>
                  When will my Flipkart account be updated with the new email
                  address?
                </p>
                <p>
                  It happens as soon as you confirm the verification code sent
                  to your email and save the changes.
                </p>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <p style={{ fontSize: "16px", fontWeight: "550" }}>
                  What happens to my existing Flipkart account when I update my
                  email address?
                </p>
                <p>
                  Updating your email address doesn't invalidate your account.
                  Your account remains fully functional. You'll continue seeing
                  your Order history, saved information and personal details.
                </p>
              </div>
            </div>

            {/* <div>
              <button
                onClick={deleteAccount}
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                }}
              >
                <p style={{ color: "red", fontWeight: "550" }}>
                  Delete Account
                </p>
              </button>
            </div> */}
          </div>
        </Paper>
      </div>
    </>
  );
};

export default ProfileForm;
