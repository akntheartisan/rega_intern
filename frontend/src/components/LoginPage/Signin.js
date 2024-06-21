import React, { useState, useContext } from "react";
import "./Signin.css";
import { useNavigate } from "react-router-dom";
import { Stack, TextField, InputAdornment, Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BusinessIcon from "@mui/icons-material/Business";
import Button from "@mui/material/Button";
import axios from "axios";
// import { FormContext } from "../../App";
import { toast } from "react-hot-toast";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import PasswordIcon from "@mui/icons-material/Password";

const Signin = () => {
  // const {setUser} = useContext(FormContext);
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);

  async function verify() {
    const credential = { username, password };
    try {
      const response = await axios.post(
        "http://localhost:4000/api/project/signin",
        credential,
        { withCredentials: true }
      );
      console.log(response.status);
      setUserName("");
      setPassword("");

      if (response.status === 200) {
        const userData = await getUserData();
        console.log(userData);
        // setUser(userData);
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.error) {
        toast.error(error.response.data.error);
      }
    }
  }

  async function getUserData() {
    try {
      const userData = await axios.get(
        "http://localhost:4000/api/project/authuser",
        { withCredentials: true }
      );
      const user = userData.data.user;
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <>
        <Stack direction="column" spacing={4} sx={{ color: "white" }}>
          <TextField
            label="Username"
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
            // helperText={errors.name}
            // error={!!errors.name}
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AccountCircleIcon sx={{ color: "white" }} />
                </InputAdornment>
              ),
              style: { color: "white" },
            }}
            InputLabelProps={{
              style: { color: "#fff" },
            }}
          />

          <TextField
            label="Password"
            name="password"
            size="small"
            type={checked ? "text" : "password"}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PasswordIcon sx={{ color: "white" }} />
                </InputAdornment>
              ),
              style: { color: "white" },
            }}
            InputLabelProps={{
              style: { color: "#fff" },
            }}
          />
        </Stack>

        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              size="small"
              sx={{
                color: "white",
                "&.Mui-checked": {
                  color: "white",
                },
              }}
            />
          }
          label="Show Password"
          sx={{ color: "white", marginTop: "20px" }}
        />

        <Stack>
          <button
            type="button"
            class="btn"
            style={{ color: "white", backgroundColor: "#f28123" }}
          >
            LogIn
          </button>
        </Stack>
        <Stack>
          <Button
            sx={{
              margin: "20px 0 0px 0",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            Forget Password?
          </Button>
        </Stack>
      </>
    </div>
  );
};

export default Signin;
