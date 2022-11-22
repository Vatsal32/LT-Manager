import "./Details.css";
import { Box } from "@mui/system";
import {
  FormControlLabel,
  Grid,
  Checkbox,
  TextareaAutosize,
  TextField,
  Tab,
  Tabs,
  Card,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import DoneOutlineSharpIcon from "@mui/icons-material/DoneOutlineSharp";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DesktopDatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { TabContext } from "@mui/lab";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useDispatch, useSelector } from "react-redux";
import { approveBookingAction, bookingResetAction } from "../../store/actions/booking";

dayjs.extend(customParseFormat);

function makeArray(w, h, val) {
  var arr = [];
  for (let i = 0; i < h; i++) {
    arr[i] = [];
    for (let j = 0; j < w; j++) {
      arr[i][j] = val;
    }
  }
  return arr;
}

const Details = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const loc = useLocation();
  const [v, setV] = useState("1");
  const [errors, setErrors] = useState("");
  const [page, setPage] = useState("");
  const [ltData, setLTData] = useState({});
  const [bookingData, setBooking] = useState({});
  const [purpose, setPupose] = useState("");
  const [batch, setBatch] = useState("");
  const [startDate, setSTDate] = useState(null);
  const [endDate, setEDate] = useState(null);
  const [it_req, setIT] = useState(false);
  const [times, setTimes] = useState(makeArray(2, 7, null));
  const [approved, setApproved] = useState(true);
  const d = useSelector((state) => state.booking.approved);
  const e = useSelector((state) => state.booking.approveErrors);
  const isAdmin1 = useSelector((state) => state.users.isAdmin1);
  const isAdmin2 = useSelector((state) => state.users.isAdmin2);
  const isAdmin3 = useSelector((state) => state.users.isAdmin3);
  const approveReject = useSelector(
    (state) =>
      state.users.isAdmin1 ||
      state.users.isAdmin2 ||
      state.users.isAdmin3 ||
      state.users.isSuperAdmin
  );

  const MON_SUN = (event, newValue) => {
    setV(newValue);
  };

  const displayPage = (event) => {
    setPage(event.target.value);
  };

  useEffect(() => {
    if (data.errors === 403) {
      navigate("/login", { replace: true, state: { pg: loc.pathname } });
    } else if (data.errors === 440) {
      navigate("/sessionExpired", { replace: true });
    }

    if (data.errors) {
      setErrors(data.errors);
    } else {
      setLTData(data.ltData);
      setBooking(data.data);
    }
  }, [data]);

  useEffect(() => {
    dispatcher(bookingResetAction());
  }, []);

  useEffect(() => {
    if (bookingData._id && ltData[bookingData.ltId]) {
      setPage(ltData[bookingData.ltId][1] + 1);
    }
    if (bookingData.purpose) {
      setPupose(bookingData.purpose);
    }
    if (bookingData.batch) {
      setBatch(bookingData.batch);
    }
    if (bookingData.startDate) {
      setSTDate(dayjs(bookingData.startDate));
    }
    if (bookingData.endDate) {
      setEDate(dayjs(bookingData.endDate));
    }
    if (bookingData.it_req) {
      setIT(bookingData.it_req);
    }

    let arr = times;

    if (bookingData.monST && bookingData.monST !== -1) {
      const hr = bookingData.monST / 100;
      const mn = bookingData.monST % 100;
      arr[0][0] = dayjs(
        `${hr < 10 ? 0 : ""}${hr}:${mn === 0 ? "00" : "30"}`,
        "HH:MM"
      );
    }

    if (bookingData.monET && bookingData.monET !== -1) {
      const hr = bookingData.monET / 100;
      const mn = bookingData.monET % 100;
      arr[0][1] = dayjs(
        `${hr < 10 ? 0 : ""}${hr}:${mn === 0 ? "00" : "30"}`,
        "HH:MM"
      );
    }

    if (bookingData.tueST && bookingData.tueST !== -1) {
      const hr = bookingData.tueST / 100;
      const mn = bookingData.tueST % 100;
      arr[1][0] = dayjs(
        `${hr < 10 ? 0 : ""}${hr}:${mn === 0 ? "00" : "30"}`,
        "HH:MM"
      );
    }

    if (bookingData.tueET && bookingData.tueET !== -1) {
      const hr = bookingData.tueET / 100;
      const mn = bookingData.tueET % 100;
      arr[1][1] = dayjs(
        `${hr < 10 ? 0 : ""}${hr}:${mn === 0 ? "00" : "30"}`,
        "HH:MM"
      );
    }

    if (bookingData.wedST && bookingData.wedST !== -1) {
      const hr = bookingData.wedST / 100;
      const mn = bookingData.wedST % 100;
      arr[2][0] = dayjs(
        `${hr < 10 ? 0 : ""}${hr}:${mn === 0 ? "00" : "30"}`,
        "HH:MM"
      );
    }

    if (bookingData.wedET && bookingData.wedET !== -1) {
      const hr = bookingData.wedET / 100;
      const mn = bookingData.wedET % 100;
      arr[2][1] = dayjs(
        `${hr < 10 ? 0 : ""}${hr}:${mn === 0 ? "00" : "30"}`,
        "HH:MM"
      );
    }

    if (bookingData.thuST && bookingData.thuST !== -1) {
      const hr = bookingData.thuST / 100;
      const mn = bookingData.thuST % 100;
      arr[3][0] = dayjs(
        `${hr < 10 ? 0 : ""}${hr}:${mn === 0 ? "00" : "30"}`,
        "HH:MM"
      );
    }

    if (bookingData.thuET && bookingData.thuET !== -1) {
      const hr = bookingData.thuET / 100;
      const mn = bookingData.thuET % 100;
      arr[3][1] = dayjs(
        `${hr < 10 ? 0 : ""}${hr}:${mn === 0 ? "00" : "30"}`,
        "HH:MM"
      );
    }

    if (bookingData.friST && bookingData.friST !== -1) {
      const hr = bookingData.friST / 100;
      const mn = bookingData.friST % 100;
      arr[4][0] = dayjs(
        `${hr < 10 ? 0 : ""}${hr}:${mn === 0 ? "00" : "30"}`,
        "HH:MM"
      );
    }

    if (bookingData.friET && bookingData.friET !== -1) {
      const hr = bookingData.friET / 100;
      const mn = bookingData.friET % 100;
      arr[4][1] = dayjs(
        `${hr < 10 ? 0 : ""}${hr}:${mn === 0 ? "00" : "30"}`,
        "HH:MM"
      );
    }

    if (bookingData.satST && bookingData.satST !== -1) {
      const hr = bookingData.satST / 100;
      const mn = bookingData.satST % 100;
      arr[5][0] = dayjs(
        `${hr < 10 ? 0 : ""}${hr}:${mn === 0 ? "00" : "30"}`,
        "HH:MM"
      );
    }

    if (bookingData.satET && bookingData.satET !== -1) {
      const hr = bookingData.satET / 100;
      const mn = bookingData.satET % 100;
      arr[5][1] = dayjs(
        `${hr < 10 ? 0 : ""}${hr}:${mn === 0 ? "00" : "30"}`,
        "HH:MM"
      );
    }

    if (bookingData.sunST && bookingData.sunST !== -1) {
      const hr = bookingData.sunST / 100;
      const mn = bookingData.sunST % 100;
      arr[6][0] = dayjs(
        `${hr < 10 ? 0 : ""}${hr}:${mn === 0 ? "00" : "30"}`,
        "HH:MM"
      );
    }

    if (bookingData.sunET && bookingData.sunET !== -1) {
      const hr = bookingData.sunET / 100;
      const mn = bookingData.sunET % 100;
      arr[6][1] = dayjs(
        `${hr < 10 ? 0 : ""}${hr}:${mn === 0 ? "00" : "30"}`,
        "HH:MM"
      );
    }

    if (
      (bookingData.admin1 && bookingData.admin2 && bookingData.admin3) ||
      bookingData.superAdmin ||
      (bookingData.admin1 && isAdmin1) ||
      (bookingData.admin2 && isAdmin2) ||
      (bookingData.admin3 && isAdmin3) || 
      d
    ) {
      setApproved(true);
    } else {
      setApproved(false);
    }

    setTimes(arr);
  }, [ltData, bookingData, d]);

  const handleIT = (event) => {
    setIT(event.target.checked);
  };

  if (errors !== "") {
    return <Box className="container">{errors}</Box>;
  }

  const dispatcher = useDispatch();

  return (
    <Box className="container">
      {typeof e === "string" && (
        <Typography
          variant="body1"
          color={typeof e === "string" ? "red" : "black"}
        >
          {typeof e === "object" ? "" : e}
        </Typography>
      )}

      {d && (
        <Typography variant={"body1"} color={"green"}>
          Booking Accepted Successfully
        </Typography>
      )}
      <Card
        className="mainContainer"
        variant="outlined"
        sx={{
          boxShadow: 10,
          borderRadius: 3,
        }}
      >
        <form className="formContainer">
          <Grid container direction="column" spacing="20" alignItems="center">
            <Grid item className="gridItem">
              <FormControl
                sx={{
                  fontSize: 15,
                  width: {
                    xs: 250,
                    sm: 250,
                    md: 280,
                  },
                }}
              >
                <InputLabel id="demo-simple-select-label">LT No.</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="LT No."
                  value={page}
                  onChange={displayPage}
                >
                  {Object.keys(ltData).map((val, key) => (
                    <MenuItem key={key} value={key + 1}>
                      {ltData[val][0]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item className="gridItem">
              <TextField
                className="new1"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputComponent: TextareaAutosize,
                }}
                id="purposeFi"
                value={purpose}
                label="Purpose"
                placeholder=""
                disabled
              />
            </Grid>
            <Grid item className="gridItem">
              <TextField
                className="new1"
                InputLabelProps={{
                  shrink: true,
                }}
                label="Batch"
                placeholder="Batch"
                value={batch}
                disabled
              />
            </Grid>
            <Grid item className="gridItem">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  className="new1"
                  label="Start Date"
                  inputFormat="MM/DD/YYYY"
                  value={startDate}
                  disabled
                  onChange={() => {}}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item className="gridItem">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  className="new1"
                  label="End Date"
                  value={endDate}
                  inputFormat="MM/DD/YYYY"
                  disabled
                  onChange={() => {}}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item>
              <FormControlLabel
                control={<Checkbox onChange={handleIT} checked={it_req} />}
                label="IT Requirements"
              />
            </Grid>
          </Grid>
        </form>
        <Box className="sideBox">
          <TabContext value={v}>
            <Tabs
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              value={v}
              onChange={MON_SUN}
            >
              <Tab label="Mon" value="1" />
              <Tab label="Tue" value="2" />
              <Tab label="Wed" value="3" />
              <Tab label="Thu" value="4" />
              <Tab label="Fri" value="5" />
              <Tab label="Sat" value="6" />
              <Tab label="Sun" value="7" />
            </Tabs>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid
                container
                alignItems="center"
                spacing="20"
                justifyContent="center"
                sx={{
                  marginTop: 0,
                  flexDirection: {
                    xs: "column",
                    md: "column",
                  },
                  flex: 1,
                }}
              >
                <Grid item sx={{ width: "200px" }}>
                  <TimePicker
                    className="new1"
                    disabled
                    label="Start"
                    value={times[v - 1][0]}
                    onChange={() => {}}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
                <Grid item sx={{ width: "200px" }}>
                  <TimePicker
                    className="new1"
                    disabled
                    label="End"
                    value={times[v - 1][1]}
                    onChange={() => {}}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
              </Grid>
            </LocalizationProvider>
          </TabContext>
          {approveReject && !approved && (
            <>
              <Box className="buttonBox">
                <Button
                  variant="contained"
                  endIcon={<DoneOutlineSharpIcon />}
                  onClick={() => {
                    dispatcher(
                      approveBookingAction({ data: bookingData._id, navigate })
                    );
                  }}
                >
                  Accept
                </Button>
                <Button variant="contained" endIcon={<ClearSharpIcon />}>
                  Reject
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default Details;
