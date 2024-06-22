import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useContext } from "react";
import { Stack, TextField, InputAdornment, Box } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import { UserContext } from "../../App";
// import EditProfile from "./EditProfile";
// import PasswordEdit from "./PasswordEdit";

import { useNavigate } from "react-router-dom";
import ProfileForm from "../Profile/ProfileForm";

export default function UserProfile() {
  const navigate = useNavigate();

  const { userData, setUserData } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openProfile, setOpenProfile] = useState(false);


  const Profile = () => {
    console.log('profile opened');
    setOpenProfile(true);
  };

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    setUserData("");
    navigate("/");
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <AccountCircleIcon sx={{ color: "white" }} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {/* <MenuItem>Profile</MenuItem> */}
        <MenuItem onClick={Profile}>Profile</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
      <ProfileForm openProfile={openProfile} setOpenProfile={setOpenProfile} />
    </>
  );
}
