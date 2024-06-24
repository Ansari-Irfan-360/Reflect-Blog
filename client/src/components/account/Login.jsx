import React, { useState, useEffect, useContext } from "react";
import {
  TextField,
  Box,
  Button,
  Typography,
  styled,
  InputAdornment,
  IconButton,
} from "@mui/material";
import toast from "react-hot-toast";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import imageURL from "../../images/Logo.png";
import { useNavigate } from "react-router-dom";
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled("img")({
  width: 100,
  display: "flex",
  margin: "auto",
  padding: "50px 0 0",
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  overflow: auto;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #9d4ccc;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;

const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

const loginInitialValues = {
  username: "",
  password: "",
};

const signupInitialValues = {
  name: "",
  username: "",
  password: "",
};

const Login = ({ isUserAuthenticated }) => {
  const [login, setLogin] = useState(loginInitialValues);
  const [signup, setSignup] = useState(signupInitialValues);
  const [error, showError] = useState("");
  const [account, toggleAccount] = useState("login");

  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  const navigate = useNavigate();
  const { setAccount } = useContext(DataContext);

  useEffect(() => {
    let intervalId;
    let loadingToastId;
    const startServer = async () => {
      try {
        await API.check();
      } catch {
        loadingToastId = toast.loading("Starting the Server");
        intervalId = setInterval(async () => {
          try {
            await API.check();
            toast.success("Server Started", {
              id: loadingToastId,
            });
            clearInterval(intervalId);
          } catch (error) {
            console.log("Server not started yet, retrying...");
          }
        }, 5000);
      }

      // Stop polling after 30 seconds
      setTimeout(() => {
        clearInterval(intervalId);
        toast.error("Failed to start server",{
          id: loadingToastId,
        });
        navigate("/");
      }, 100000);
    };

    startServer();

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    showError("");
  }, [login, signup]);

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    let response;
    try {
      response = await API.userLogin(login);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    if (response?.isSuccess) {
      showError("");

      sessionStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      );
      sessionStorage.setItem(
        "refreshToken",
        `Bearer ${response.data.refreshToken}`
      );
      setAccount({
        name: response.data.name,
        username: response.data.username,
      });

      isUserAuthenticated(true);
      setLogin(loginInitialValues);
      navigate("/");
    } else {
      showError("Something went wrong! please try again later");
    }
  };

  const signupUser = async () => {
    let response;
    try {
      response = await API.userSignup(signup);
    } catch (error) {
      console.log(error);
    }
    if (response?.isSuccess) {
      showError("");
      setSignup(signupInitialValues);
      toggleAccount("login");
    } else {
      showError("Something went wrong! please try again later");
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowSignupPassword = () =>
    setShowSignupPassword(!showSignupPassword);

  const toggleSignup = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
    showError("");
  };

  return (
    <Component>
      <Box>
        <Image
          src={imageURL}
          alt="blog"
          style={{ height: "9em", width: "9em" }}
        />
        {account === "login" ? (
          <Wrapper>
            <TextField
              variant="standard"
              value={login.username}
              onChange={(e) => onValueChange(e)}
              name="username"
              label="Enter Username"
            />
            <TextField
              variant="standard"
              type={showPassword ? "text" : "password"}
              value={login.password}
              onChange={(e) => onValueChange(e)}
              name="password"
              label="Enter Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {error && <Error>{error}</Error>}

            <LoginButton variant="contained" onClick={() => loginUser()}>
              Login
            </LoginButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <SignupButton
              onClick={() => toggleSignup()}
              style={{ marginBottom: 50 }}
            >
              Create an account
            </SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              variant="standard"
              value={signup.name}
              onChange={(e) => onInputChange(e)}
              name="name"
              label="Enter Name"
            />
            <TextField
              variant="standard"
              value={signup.username}
              onChange={(e) => onInputChange(e)}
              name="username"
              label="Enter Username"
            />
            <TextField
              variant="standard"
              type={showSignupPassword ? "text" : "password"}
              value={signup.password}
              onChange={(e) => onInputChange(e)}
              name="password"
              label="Enter Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowSignupPassword}
                    >
                      {showSignupPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {error && <Error>{error}</Error>}
            <SignupButton onClick={() => signupUser()}>Signup</SignupButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <LoginButton variant="contained" onClick={() => toggleSignup()}>
              Already have an account
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;
