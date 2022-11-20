import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { MuiTelInput } from "mui-tel-input";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useDispatch, useSelector } from "react-redux";
import { addUserAction } from "../../store/actions/users";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChange1 = (prop) => (event) => {
    setValues1({ ...values1, [prop]: event.target.value });
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

  const handleClickShowPassword1 = () => {
    setValues1({
      ...values1,
      showPassword: !values1.showPassword,
    });
  };

  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };

  //error button
  const [state, setState] = React.useState("");
  const [err, seterr] = React.useState(false);

  const textout = (e) => {
    setState(e.target.value);
  };

  const [state1, setState1] = React.useState("");
  const [err1, seterr1] = React.useState(false);

  const textout1 = (e) => {
    setState1(e.target.value);
  };
  const [state2, setState2] = React.useState("");
  const [err2, seterr2] = React.useState(false);

  const textout2 = (e) => {
    setState2(e.target.value);
  };
  const [state3, setState3] = React.useState("");
  const [err3, seterr3] = React.useState(false);

  const textout3 = (e) => {
    setState3(e.target.value);
  };
  const [state4, setState4] = React.useState("");
  const [err4, seterr4] = React.useState(false);

  const textout4 = (e) => {
    setState4(e.target.value);
  };
  //password

  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const [values1, setValues1] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const [errors, setErrors] = useState({});

  const e = useSelector((state) => state.users.addErrors);
  const added = useSelector((state) => state.users.added);

  useEffect(() => {
    setErrors(e);
  }, [e]);

  useEffect(() => {
    if (added) {
      navigate('/');
    }
  }, [added]);

  const checkErrors = () => {
    let err = false;

    if (state === "") {
      seterr(true);
      err = true;
    } else {
      seterr(false);
    }
    if (state1 === "") {
      seterr1(true);
      err = true;
    } else {
      seterr1(false);
    }
    if (state2 === "") {
      seterr2(true);
      err = true;
    } else {
      seterr2(false);
    }
    if (state3 === "") {
      seterr3(true);
      err = true;
    } else {
      seterr3(false);
    }
    if (state4 === "") {
      seterr4(true);
      err = true;
    } else {
      seterr4(false);
    }

    return err;
  };

  const handleClickOpen = () => {
    if (!checkErrors()) {
      let p = phone;
      let i = 0;
      while (p[i] != ' ') {
        i++;
      }
      p = p.substring(i + 1, p.length);
      let q = '';
      for (i = 0; i < p.length; i++) {
        if (p[i] !== ' ') {
          q += p[i];
        }
      }

      const data = {
        name: state,
        userName: state1,
        email: state2,
        password: state3,
        confirmPassword: state4,
        phoneNum: q,
      };

      dispatcher(addUserAction(data));
    }
  };

  //phone number

  const [phone, setPhone] = React.useState("");

  const phoneNumber = (newPhone) => {
    setPhone(newPhone);
  };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
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
          sx={{
            borderRadius: "5%",
            boxShadow: "0 0 20px 5px   lightgrey",
            m: "25px",
          }}
          style={{}}
        >
          <CardContent
            style={{
              display: "flex",
              flexDirection: "column",
              // alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              height: "95%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              {errors && <Typography>{errors.user}</Typography>}
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography style={{ marginBottom: "20px" }}>Name:</Typography>
                <TextField
                  value={state}
                  onChange={textout}
                  error={err}
                  helperText={err ? "Empty field!" : " "}
                  id="outlined-basic-1"
                  label={!err ? "Name*" : " Error! "}
                  variant="outlined"
                  style={{ marginLeft: "10px" }}
                />
              </Box>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography style={{ marginBottom: "20px" }}>
                  User Name:
                </Typography>
                <TextField
                  value={state1}
                  onChange={textout1}
                  error={err1}
                  helperText={err1 ? "Empty field!" : " "}
                  id="outlined-basic-2"
                  label={!err1 ? "User Name*" : " Error! "}
                  variant="outlined"
                  style={{ marginLeft: "10px" }}
                />
              </Box>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography style={{ marginBottom: "20px" }}>Email:</Typography>
                <TextField
                  value={state2}
                  onChange={textout2}
                  error={err2}
                  helperText={err2 ? "Empty field!" : " "}
                  id="outlined-basic-3"
                  label={!err2 ? "Mail Id*" : " Error! "}
                  variant="outlined"
                  style={{ marginLeft: "10px" }}
                />
              </Box>

              <Box
                style={{
                  display: "flex",
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
                  value={state3}
                  onChange={textout3}
                  error={err3}
                  label={!err3 ? "Mail Id*" : " Error! "}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password*
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password-1"
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

              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  style={{ marginBottom: "20px", marginRight: "10px" }}
                >
                  Confirm Password:
                </Typography>
                <FormControl
                  sx={{ mb: 3, width: "25ch" }}
                  variant="outlined"
                  value={state4}
                  onChange={textout4}
                  error={err4}
                  label={!err4 ? "Mail Id*" : " Error! "}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password*
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={values1.showPassword ? "text" : "password"}
                    value={values1.password}
                    onChange={handleChange1("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword1}
                          onMouseDown={handleMouseDownPassword1}
                          edge="end"
                        >
                          {values1.showPassword ? (
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
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  marginBottom: "10px",
                }}
              >
                <Typography style={{ marginRight: "10px" }}>
                  Phone Number:
                </Typography>
                <MuiTelInput value={phone} onChange={phoneNumber} />
              </Box>

              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "30px",
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleClickOpen}
                  endIcon={<SendIcon />}
                >
                  Add
                </Button>
              </Box>
            </div>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Register;
