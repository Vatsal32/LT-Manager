import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { CCarousel, CCarouselItem, CImage } from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../store/actions/users";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import img1 from "./images/1.jpg";
import img2 from "./images/2.jpg";
import img3 from "./images/3.jpg";
import TextField from "@mui/material/TextField";
import { Card, CardContent, Typography } from "@mui/material";
import { CCarousel, CCarouselItem, CImage } from "@coreui/react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";

const Login = () => {
  const [state, setState] = React.useState("");
  const [err, seterr] = React.useState(false);

  const [state1, setState1] = React.useState("");
  const [err1, seterr1] = React.useState(false);

  const textout = (e) => {
    setState(e.target.value);
    setUserID(e.target.value);
  };
  const textout1 = (e) => {
    setState1(e.target.value);
    setPassword(e.target.value);
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleClickOpen = async () => {
    dispatcher(loginAction(userid, password));
    if (state === "") {
      seterr(true);
    } else {
      seterr(false);
    }
    if (state1 === "") {
      seterr1(true);
    } else {
      seterr1(false);
    }
  };

  const [userid, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const dispatcher = useDispatch();
  const navigate = useNavigate();

  const loggedIn = useSelector((state) => state.users.loggedIn);

  const [state, setState] = React.useState("");
  const [err, seterr] = React.useState(false);

  const [state1, setState1] = React.useState("");
  const [err1, seterr1] = React.useState(false);

  const textout = (e) => {
    setState(e.target.value);
  };
  const textout1 = (e) => {
    setState1(e.target.value);
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleClickOpen = () => {
    if (state === "") {
      seterr(true);
    } else if (state1 === "") {
      seterr1(true);
    } else {
      seterr(false);
      seterr1(false);

      dispatcher(loginAction(state, state1));
    }
  };

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  useEffect(() => {
    setErrors((err) => ({
      ...err,
      userName: e.userName ? e.userName : "",
      password: e.password ? e.password : "",
    }));
  }, [e, err]);

  // const login = async () => {
  //   dispatcher(loginAction(userid, password));
  // };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
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
