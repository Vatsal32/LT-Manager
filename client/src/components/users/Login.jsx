import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../store/actions/users";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [userid, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ userName: "", password: "" });
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  const getData = useLocation();

  const loggedIn = useSelector((state) => state.users.loggedIn);
  const e = useSelector((state) => state.users.errors);

  useEffect(() => {
    if (loggedIn) {
      if (getData.state.pg) {
        navigate(getData.state.pg);
      } else {
        navigate("/");
      }
    }
  }, [loggedIn, navigate]);

  useEffect(() => {
    setErrors((err) => ({
      ...err,
      userName: e.userName ? e.userName : "",
      password: e.password ? e.password : "",
    }));
  }, [e]);

  const login = async () => {
    dispatcher(loginAction(userid, password));
  };

  return (
    <Box
      sx={{
        flexGrow: "1",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CssBaseline />
      <Container
        maxWidth={"xs"}
        sx={{
          height: "70%",
          border: "2px solid gray",
          borderRadius: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3" textAlign={"center"} mb={5}>
          Login
        </Typography>

        <TextField
          error={errors.userName !== ""}
          helperText={errors.userName}
          label="User ID"
          sx={{
            width: "90%",
            marginX: "5%",
            marginY: "5%",
          }}
          onChange={(e) => setUserID(e.target.value)}
        />

        <TextField
          error={errors.password !== ""}
          helperText={errors.password}
          label="Password"
          sx={{
            width: "90%",
            marginX: "5%",
            marginY: "5%",
          }}
          type={"password"}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant={"contained"}
          sx={{
            marginY: "5%",
          }}
          onClick={login}
        >
          Login
        </Button>
      </Container>
    </Box>
  );
};

export default Login;
