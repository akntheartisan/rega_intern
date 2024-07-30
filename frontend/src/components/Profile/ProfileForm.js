import React, { useContext, useEffect, useState, useCallback } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import { client } from "../../../Client/Clientaxios";
import toast from "react-hot-toast";
import { UserContext } from "../../App";
import { client } from "../Client/Client";


const ProfileForm = () => {
  const { userData, setUserData } = useContext(UserContext);

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

    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
      const response = await client.get("/user/getprofiledata", { params: { id } });
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

  return (
      <>
            <div className="container">
              <div className="row">
                <div className="col-md-12 mt-1 mb-1">
                  <h5>Basic Details</h5>
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
                    />
                  </div>
                </div>
              </div>
            </div>
        
     
    </>
  );
};

export default ProfileForm;
