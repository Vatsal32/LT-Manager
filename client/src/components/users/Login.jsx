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
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [errors, setErrors] = useState({ userName: "", password: "" });
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  const getData = useLocation();

  const loggedIn = useSelector((state) => state.users.loggedIn);
  const e = useSelector((state) => state.users.errors);

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
      if (getData.state && getData.state.pg) {
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
  }, [e, err]);

  // const login = async () => {
  //   dispatcher(loginAction(userid, password));
  // };

  return (
    // <Box
    //   sx={{
    //     flexGrow: "1",
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    // >
    //   <CssBaseline />
    //   <Container
    //     maxWidth={"xs"}
    //     sx={{
    //       height: "70%",
    //       border: "2px solid gray",
    //       borderRadius: 5,
    //       display: "flex",
    //       flexDirection: "column",
    //       alignItems: "center",
    //       justifyContent: "center",
    //     }}
    //   >
    //     <Typography variant="h3" textAlign={"center"} mb={5}>
    //       Login
    //     </Typography>

    //     <TextField
    //       error={errors.userName !== ""}
    //       helperText={errors.userName}
    //       label="User ID"
    //       sx={{
    //         width: "90%",
    //         marginX: "5%",
    //         marginY: "5%",
    //       }}
    //       onChange={(e) => setUserID(e.target.value)}
    //     />

    //     <TextField
    //       error={errors.password !== ""}
    //       helperText={errors.password}
    //       label="Password"
    //       sx={{
    //         width: "90%",
    //         marginX: "5%",
    //         marginY: "5%",
    //       }}
    //       type={"password"}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />

    //     <Button
    //       variant={"contained"}
    //       sx={{
    //         marginY: "5%",
    //       }}
    //       onClick={login}
    //     >
    //       Login
    //     </Button>
    //   </Container>
    // </Box>


    <div
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
          sx={{ width: { md: "850px", sm: "425px", xs: "425px" } ,m:2}}
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
                  <CImage className="d-block w-100" src={'/images/1.jpg'} alt="slide 1" />
                </CCarouselItem>

                <CCarouselItem>
                  <CImage className="d-block w-100" src={'/images/2.jpg'} alt="slide 2" />
                </CCarouselItem>

                <CCarouselItem>
                  <CImage className="d-block w-100" src={'/images/3.jpg'} alt="slide 3" />
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
                  error={errors.userName !== ""}
                  helperText={errors.userName}
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
                    error={errors.password !== ""}
                  />
                  <FormHelperText>{errors.password}</FormHelperText>
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
    </div>
  );
};

export default Login;
