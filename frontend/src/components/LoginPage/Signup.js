import React, { useState, useContext } from "react";
import "./Signin.css";
import { useNavigate } from "react-router-dom";
import { Stack, TextField, InputAdornment, Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BusinessIcon from "@mui/icons-material/Business";
import Button from "@mui/material/Button";
import axios from "axios";
import { toast } from "react-hot-toast";
import PasswordIcon from "@mui/icons-material/Password";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { client } from "../Client/Client";
import { UserContext } from "../../App";
import PinIcon from '@mui/icons-material/Pin';

const intial = { name: "", username: "", password: "", confirmpassword: "" };

const Signup = () => {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(intial);
  const [errors, setErrors] = useState({
    passwordCheck: "",
    confirmPasswordCheck: "",
  });
  const [mailOTP, setMailOTP] = useState({ ogotp: "", tyotp: "" });
  const [typeOTP, setTypeOTP] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      name === "name" ||
      name === "username" ||
      name === "password" ||
      name === "confirmpassword"
    ) {
      if (value.charCodeAt(0) === 32) {
        return false;
      }
    }

    if (name === "name") {
      if (/\d/.test(value) || /[!@#$%^&*()_-]/.test(value)) {
        return false;
      }
    }

    if (e.target.name === "password") {
      console.log(e.target.value);
      const typedPassword = e.target.value;
      const UpperCase = /[A-Z]/.test(typedPassword);
      const LowerCase = /[a-z]/.test(typedPassword);
      const Digit = /\d/.test(typedPassword);
      const SpecialChar = /[!@#$%^&*()_-]/.test(typedPassword);
      const passwordLength = typedPassword.length;

      if (
        !UpperCase ||
        !LowerCase ||
        !Digit ||
        !SpecialChar ||
        passwordLength < 8
      ) {
        setErrors({ passwordCheck: "must contain 8 characters" });
      } else {
        setErrors({ passwordCheck: "" });
      }
    }

    if (e.target.name === "confirmpassword") {
      const typedConfirmPassword = e.target.value;
      if (typedConfirmPassword !== user.password) {
        setErrors({ confirmPasswordCheck: "Password must be same" });
      } else {
        setErrors({ confirmPasswordCheck: "" });
      }
    }

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeOtp = (e)=>{
    const {name,value} = e.target.value;

    setMailOTP((prev)=>({
      ...prev,[name]:value
    }))
  }

  console.log(user);

  const submit = async () => {
    try {
      const response = await client.post("/user/usersignup", user, {
        withCredentials: true,
      });

      console.log(response.data.otp);

      setMailOTP((prevState) => ({
        ...prevState,   
        ogotp: response.data.otp 
      }));

      // const {ogotp,tyotp} = mailOTP;

      // console.log(mailOTP.ogotp,mailOTP.tyotp);

      setTypeOTP(true);
      
      

      if (mailOTP.ogotp === mailOTP.tyotp) {
        toast.success("Successfully Created");
        getUserData();
      }
      setUser(intial);
    } catch (error) {
      console.log(error);
      if (error.response.data.error) {
        toast.error(error.response.data.error);
      }
    }
  };

  const getUserData = async (req, res, next) => {
    try {
      const response = await client.get("/user/protect", {
        withCredentials: true,
      });
      const user = response.data.user;
      if (response.status === 200) {
        setUserData(user);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* {typeOTP ? } */}

      {!typeOTP ? (
        <Stack direction="column" spacing={4}>
          {" "}
          <TextField
            label="name"
            name="name"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white", // Default border color
                },
                "&:hover fieldset": {
                  borderColor: "white", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white", // Border color when focused
                },
              },
            }}
            // helperText={errors.name}
            // error={!!errors.name}
            value={user.name}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AccountCircleIcon sx={{ color: "white" }} />
                </InputAdornment>
              ),
              sx: { color: "white" },
            }}
            InputLabelProps={{
              style: { color: "#fff" },
            }}
          />
          <TextField
            label="username"
            name="username"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white", // Default border color
                },
                "&:hover fieldset": {
                  borderColor: "white", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white", // Border color when focused
                },
              },
            }}
            // helperText={errors.companyname}
            // error={!!errors.companyname}
            value={user.username}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AlternateEmailIcon sx={{ color: "white" }} />
                </InputAdornment>
              ),
              sx: { color: "white" },
            }}
            InputLabelProps={{
              style: { color: "#fff" },
            }}
          />
          <TextField
            label="Password"
            name="password"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white", // Default border color
                },
                "&:hover fieldset": {
                  borderColor: "white", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white", // Border color when focused
                },
              },
            }}
            helperText={errors.passwordCheck}
            error={!!errors.passwordCheck}
            value={user.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PasswordIcon sx={{ color: "white" }} />
                </InputAdornment>
              ),
              sx: { color: "white" },
            }}
            InputLabelProps={{
              style: { color: "#fff" },
            }}
          />
          <TextField
            label="confirmpassword"
            name="confirmpassword"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white", // Default border color
                },
                "&:hover fieldset": {
                  borderColor: "white", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white", // Border color when focused
                },
              },
            }}
            helperText={errors.confirmPasswordCheck}
            error={!!errors.confirmPasswordCheck}
            value={user.confirmpassword}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PasswordIcon sx={{ color: "white" }} />
                </InputAdornment>
              ),
              sx: { color: "white" },
            }}
            InputLabelProps={{
              style: { color: "#fff", borderColor: "white" },
            }}
          />
          <button
            type="button"
            class="btn"
            style={{ color: "white", backgroundColor: "#f28123" }}
            onClick={submit}
          >
            Register
          </button>{" "}
        </Stack>
      ) : (
        <Stack>
            <TextField
            label="OTP"
            name="tyotp"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white", // Default border color
                },
                "&:hover fieldset": {
                  borderColor: "white", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white", // Border color when focused
                },
              },
            }}
            value={mailOTP.tyotp}
            onChange={handleChangeOtp}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PinIcon sx={{ color: "white" }} />
                </InputAdornment>
              ),
              sx: { color: "white" },
            }}
            InputLabelProps={{
              style: { color: "#fff" },
            }}
          />
      
        </Stack>
      )}
    </>
  );
};

export default Signup;
