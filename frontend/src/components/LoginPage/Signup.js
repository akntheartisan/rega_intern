import React, { useState, useContext, useEffect } from "react";
import "./Signin.css";
import { useNavigate } from "react-router-dom";
import { Stack, TextField, InputAdornment, Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import { toast } from "react-hot-toast";
import PasswordIcon from "@mui/icons-material/Password";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { client } from "../Client/Client";
import { UserContext } from "../../App";
import PinIcon from "@mui/icons-material/Pin";
import Alert from '@mui/material/Alert';

const intial = { name: "", username: "", password: "", confirmpassword: "" };

const Signup = () => {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(intial);
  const [errors, setErrors] = useState({
    mailCheck: "",
    passwordCheck: "",
    confirmPasswordCheck: "",
  });
  const [mailOTP, setMailOTP] = useState();
  const [userOTP, setUserOTP] = useState();
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

    if (e.target.name === "username") {
      const typedMail = e.target.value;
      console.log(typedMail);

      const checkMailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(typedMail);
      console.log(checkMailFormat);

      if (!checkMailFormat) {
        setErrors({ mailCheck: "Please provide valid emailId" });
      } else {
        setErrors({ mailCheck: "" });
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
        setErrors({ passwordCheck:  <>
        Password Must Contain:
        <ol>
          <li>One Capital Letter</li>
          <li>One Small Letter</li>
          <li>One Special character</li>
          <li>One Number</li>
          <li>Minimum 8 characters</li>
        </ol>          
        </> 
        });
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

  const handleChangeOtp = (e) => {
    setUserOTP(e.target.value);
  };

  console.log(user);

  const submit = async () => {
    if(!user.name || !user.username || !user.password || !user.confirmpassword){
      toast.error('Please fill all the fields');
    }
    try {
      const response = await client.post("/user/usersignup", user, {
        withCredentials: true,
      });

  
      
      setMailOTP(response.data.otp);
      setUser(intial);
      setTypeOTP(true);
      
    } catch (error) {
      console.log(error);
      if (error.response.data.error) {
        toast.error(error.response.data.error);
      }
    }
  };

  console.log(mailOTP, userOTP);

  const verifyOtp = async () => {
    if (mailOTP == userOTP) {
      toast.success("OTP verified successfully!");
      await getUserData();
    } else {
      toast.error("Invalid OTP. Please try again.");
    }
  };

  const getUserData = async () => {
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
              "& .MuiFormHelperText-root.Mui-error": {
                color: "#f28123",
                fontSize:'13px'
              },
            }}
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
            helperText={errors.mailCheck}
            error={!!errors.mailCheck}
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
              "& .MuiFormHelperText-root.Mui-error": {
                color: "#f28123",
                fontSize:'13px'
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
              "& .MuiFormHelperText-root.Mui-error": {
                color: "#f28123",
                fontSize:'13px'
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
        <>
        
        <Stack direction="column" spacing={4}>
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
            value={userOTP}
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

          <Button
            type="button"
            class="btn"
            style={{ color: "white", backgroundColor: "#f28123" }}
            onClick={verifyOtp}
          >
            Ok
          </Button>
        </Stack>
        </>
   
      )}
    </>
  );
};

export default Signup;
