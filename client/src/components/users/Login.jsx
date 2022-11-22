import { useEffect } from "react";
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
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";

const Login = () => {
  const [state, setState] = React.useState("");

  const [state1, setState1] = React.useState("");
  const [errors, setErrors] = React.useState({userName: "", password: ""});

  const loggedIn = useSelector(state => state.users.loggedIn);
  const e = useSelector(state => state.users.errors);

  const textout = (e) => {
    setState(e.target.value);
  };

  const textout1 = (e) => {
    setState1(e.target.value);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [show, setShow] = React.useState(false);

  const handleClickOpen = async () => {
    setErrors({
      userName: "",
      password: "",
    });

    if (state === "") {
      setErrors(err => ({
        ...err,
        userName: "Required"
      }));
    }

    if (state1 === "") {
      setErrors(err => ({
        ...err,
        password: "Required",
      }));
    }

    if (state !== "" && state1 !== "") {
      setErrors({
        userName: "",
        password: ""
      });
      dispatcher(loginAction(state, state1));
    }
  };

  const dispatcher = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  useEffect(() => {
    if (e) {
      setErrors(err => ({
        ...err,
        userName: e.userName || "",
        password: e.password || ""
      }));

      setState1("");
    }
  }, [e]);

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
              <CCarousel interval={2000} controls transition="crossfade" >
                <CCarouselItem>
                  <CImage className="d-block w-100" src={img1} alt="slide 1" />
                </CCarouselItem>

                <CCarouselItem>
                  <CImage className="d-block w-100" src={img2} alt="slide 2" />
                </CCarouselItem>

                <CCarouselItem>
                  <CImage className="d-block w-100  " src={img3} alt="slide 3" />
                </CCarouselItem>
              </CCarousel>
            </Box>
            <Box
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
                  variant={'h4'}
                >
                  Login
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
                <TextField
                  value={state}
                  onChange={textout}
                  error={errors.userName !== ""}
                  helperText={errors.userName}
                  id="outlined-basic"
                  label={"User ID"}
                  variant="outlined"
                  sx={{ width: "220px" }}
                />
              </Box>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <FormControl
                  sx={{ mb: 3, width: "220px" }}
                  variant="outlined"
                  value={state1}
                  onChange={textout1}
                  error={errors.password !== ""}
                  label={"Email ID"}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    error={errors.password !== ""}
                    type={show ? "text" : "password"}
                    value={state1}
                    onChange={textout1}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShow(s => !s)}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {show ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                  <FormHelperText>{errors.password}</FormHelperText>
                </FormControl>
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
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Login;