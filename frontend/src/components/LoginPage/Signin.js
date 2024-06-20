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

const Signin = () => {
  // const {setUser} = useContext(FormContext);
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  async function verify() {
    const credential = { username, password };
    // if (name == "ak" && auth == "ak") {
    //   setUser(true);
    //   navigate("/admin");
    // } else {
    //   alert("wrong credentials");
    // }

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
      }else{
        navigate("/")
      }

      // if(token){
      //   navigate("/admin")
      // }else{
      //   navigate("/")
      // }

      // alert("Form Submitted Successfully");
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
        <Stack direction="column" spacing={4} sx={{color:'white'}}>
          <TextField
            label="Username"
            name="username"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white', // Default border color
                },
                '&:hover fieldset': {
                  borderColor: 'white', // Border color on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white', // Border color when focused
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
                  <AccountCircleIcon sx={{color:'white'}}/>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              style: { color: '#fff' },
            }}
          />

          <TextField
            label="Password"
            name="password"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white', // Default border color
                },
                '&:hover fieldset': {
                  borderColor: 'white', // Border color on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white', // Border color when focused
                },
              },
            }}
            // helperText={errors.companyname}
            // error={!!errors.companyname}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <BusinessIcon sx={{color:'white'}}/>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              style: { color: '#fff' },
            }}
          />
        </Stack>
        <Stack>
          <Button sx={{margin:'25px 0 25px 0',display:'flex',justifyContent:'flex-end'}}>Forget Password?</Button>
        </Stack>
        <Stack sx={{backgroundColor:'blue',borderRadius:'15px'}}>
          <Button autoFocus onClick={verify} sx={{color:'white'}}>
            Submit
          </Button>
        </Stack>
        {/* <div className="signin">
          <h3>Sign In</h3>
          <form>
            <div>
              <label htmlFor="email">Email: </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <br />

            <div>
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                value={auth}
                onChange={(e) => setAuth(e.target.value)}
              />
            </div>

            <div>
              <button onClick={verify}>Submit</button>
            </div>
          </form>
        </div> */}
      </>
    </div>
  );
};

export default Signin;
