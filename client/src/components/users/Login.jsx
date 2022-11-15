import  {useEffect, useState} from "react";
// import {
// 	Box,
// 	Button,
// 	Container,
// 	CssBaseline,
// 	TextField,
// 	Typography,
// } from "@mui/material";
import {useDispatch, useSelector} from 'react-redux';
import {loginAction} from "../../store/actions/users";
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

  const handleClickOpen = async() => {
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

//   vatsal
  const [userid, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const dispatcher = useDispatch();
  const navigate = useNavigate();

  const loggedIn = useSelector((state) => state.users.loggedIn);
//   const e = useSelector((state) => state.users.errors);

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

	//   useEffect(() => {
		
	//   }, [e]);



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
        <Card
          sx={{ width: { md: "850px", sm: "425px", xs: "425px" }, m: 2 }}
          style={{
            height: "425px",
            borderRadius: "25px",
            boxShadow: "0 0 25px 15px lightgrey",
            padding: "0px",
            margin: "40px",
          }}
        >
          <CardContent
            sx={{ width: { md: "850px", sm: "425px" } }}
            style={{ display: "flex", padding: "0px", height: "425px" }}
          >
            <Box
              sx={{ display: { md: "block", sm: "none", xs: "none" } }}
              style={{ flex: 1 }}
            >
              <CCarousel interval={2000} controls transition="crossfade">
                <CCarouselItem>
                  <CImage className="d-block w-100" src={img1} alt="slide 1" />
                </CCarouselItem>

                <CCarouselItem>
                  <CImage className="d-block w-100" src={img2} alt="slide 2" />
                </CCarouselItem>

                <CCarouselItem>
                  <CImage className="d-block w-100" src={img3} alt="slide 3" />
                </CCarouselItem>
              </CCarousel>
            </Box>
            <div
              style={{
                flex: 1,
                height: "425px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Box style={{ marginBottom: "40px" }}>
                <Typography
                  style={{
                    fontSize: "35px",
                    fontFamily: "inherit",
                    fontWeight: "bold",
                    color: "#1875d1",
                  }}
                >
                  LOGIN
                </Typography>
              </Box>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: "25px",
                }}
              >
                <Typography>User ID:</Typography>
                <TextField
                  value={state}
                  onChange={textout}
                  error={err}
                  id="outlined-basic"
                  label={!err ? "User id*" : " Error! "}
                  variant="outlined"
                  style={{ marginLeft: "25px", width: "220px" }}
                />
              </Box>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Typography
                  style={{ marginBottom: "20px", marginRight: "10px" }}
                >
                  Password:
                </Typography>
                <FormControl
                  sx={{ mb: 3, width: "25ch" }}
                  variant="outlined"
                  value={state1}
                  onChange={textout1}
                  error={err1}
                  label={!err1 ? "Mail Id*" : " Error! "}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password*
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </Box>
              <Box>
                <Typography>forget password?</Typography>
              </Box>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "30px",
                }}
              >
                <Button variant="contained" onClick={handleClickOpen}>
                  Login
                </Button>
              </Box>
            </div>
          </CardContent>
        </Card>
      </Box>
    </Box>
    
  );
};

export default Login;
