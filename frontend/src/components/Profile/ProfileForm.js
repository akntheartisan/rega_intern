import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import { client } from "../../../Client/Clientaxios";
import toast from "react-hot-toast";

const ProfileForm = ({ openProfile, setOpenProfile }) => {

  const handleClose = () => {
    setOpenProfile(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={openProfile}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Edit Product"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
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
                      id="model"
                      name="name"
                      // value={updatedProduct.model}
                      // onChange={handleChange}
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
                      id="motor"
                      name="username"
                      // value={updatedProduct.motor}
                      // onChange={handleChange}
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
                      id="battery"
                      name="mobile"
                      // value={updatedProduct.battery}
                      // onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-12 mt-1 mb-1">
                <h5>Contact Details</h5>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label htmlFor="range" className="form-label">
                      Address Line 1
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="range"
                      name="address1"
                      // value={updatedProduct.range}
                      // onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label htmlFor="tyresize" className="form-label">
                    Address Line 1
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="tyresize"
                      name="address2"
                      // value={updatedProduct.tyresize}
                      // onChange={handleChange}
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
                      id="brakes"
                      name="landmark"
                      // value={updatedProduct.brakes}
                      // onChange={handleChange}
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
                      id="ground"
                      name="district"
                      // value={updatedProduct.ground}
                      // onChange={handleChange}
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
                      id="payload"
                      name="state"
                      // value={updatedProduct.payload}
                      // onChange={handleChange}
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
                      id="payload"
                      name="pincode"
                      // value={updatedProduct.payload}
                      // onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button autoFocus>Update</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ProfileForm;
