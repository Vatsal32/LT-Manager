import React, {useState, useEffect} from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from "@mui/material/Checkbox";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import { TabPanel } from "@mui/lab";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useLoaderData, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bookingAction } from "../../store/actions/booking";

const MakeBooking = () => {
  const data = useLoaderData();
  const tm = useParams();
  const dispatcher = useDispatch();
  const e = useSelector((state) => state.booking.errors);
  const d = useSelector((state) => state.booking.booked);
  const [errors, setErrors] = useState({
    ltId: "",
    purpose: "",
    batch: "",
    it_req: ""
  });
  const [page, setPage] = useState(tm.x);
  const [batch, setBatch] = useState("");
  const [purpose, setPurpose] = useState("");

  useEffect(() => {
    setErrors((err) => ({
      ...err,
      ltId: e.ltId || "",
      purpose: e.purpose || "",
      startDate: e.startDate || "",
      endDate: e.endDate || "",
      batch: e.batch || "",
      it_req: e.it_req || "",
    }));
  }, [e]);

  console.log(d);

  const displayPage = (event) => {
    setPage(event.target.value);
  };

  const [value, setValue] = useState(dayjs(tm.y));

  const handleChange = (newValue) => {
    setValue(newValue);
    settime1S('');
    settime1E('');
    settime2S('');
    settime2E('');
    settime3S('');
    settime3E('');
    settime4S('');
    settime4E('');
    settime5S('');
    settime5E('');
    settime6S('');
    settime6E('');
    settime7S('');
    settime7E('');
    setValue(tm.y);
    setV('1');
    setPage('');
    setBatch('');
    setPurpose('');
  };

  const [value1, setValue1] = useState(dayjs(tm.y));

  const handleChange1 = (newValue) => {
    setValue1(newValue);
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const [v, setV] = useState("1");

  const MON_SUN = (event, newValue) => {
    setV(newValue);
  };

  const [time1S, settime1S] = useState('');
  const [time1E, settime1E] = useState('');

  const [time2S, settime2S] = useState('');
  const [time2E, settime2E] = useState('');

  const [time3S, settime3S] = useState('');
  const [time3E, settime3E] = useState('');

  const [time4S, settime4S] = useState('');
  const [time4E, settime4E] = useState('');

  const [time5S, settime5S] = useState('');
  const [time5E, settime5E] = useState('');

  const [time6S, settime6S] = useState('');
  const [time6E, settime6E] = useState('');

  const [time7S, settime7S] = useState('');
  const [time7E, settime7E] = useState('');

  const [checked, setChecked] = React.useState(true);

  const handleChange2 = (event) => {
    setChecked(event.target.checked);
  };

  const handleBatch = (event) => {
    setBatch(event.target.value);
  };

  const handlePurpose = (event) => {
    setPurpose(event.target.value);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: 20 }}>Lecture Hall: </Typography>
          <FormControl
            sx={{
              m: 1,
              minWidth: 100,
              maxWidth: { xs: 100, sm: 150 },
              width: 150,
            }}
            error={errors.ltId !== ""}
          >
            <InputLabel id="demo-simple-select-label">LT No.</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="LT No."
              value={page}
              onChange={displayPage}
            >
              {Object.keys(data).map((val, key) => (
                <MenuItem key={key} value={key + 1}>
                  {data[val][0]}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.ltId}</FormHelperText>
          </FormControl>
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Typography sx={{ display: "flex", fontSize: 20 }}>
            Purpose:
          </Typography>
          <TextField
            value={purpose}
            onChange={handlePurpose}
            aria-label="minimum height"
            minRows={4}
            placeholder="Enter your purpose"
            style={{ margin: "10px", minWidth: 200, fontSize: 15, }}
            error={errors.purpose !== ""}
            helperText={errors.purpose}
            InputProps={{
              inputComponent: TextareaAutosize
            }}
          />
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Typography sx={{ display: "flex", fontSize: 20 }}>
            Start Date:
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3} style={{ margin: "10px" }}>
              <DesktopDatePicker
                label="Start Date"
                inputFormat="MM/DD/YYYY"
                value={value}
                onChange={handleChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{
                      width: {
                        xs: 220,
                        sm: 250,
                        md: 280,
                      },
                    }}
                  />
                )}
              />
            </Stack>
          </LocalizationProvider>
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Typography sx={{ display: "flex", fontSize: 20 }}>
            End Date:
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3} style={{ margin: "10px" }}>
              <DesktopDatePicker
                label="End Date"
                inputFormat="MM/DD/YYYY"
                value={value1}
                onChange={handleChange1}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{
                      width: {
                        xs: 220,
                        sm: 250,
                        md: 280,
                      },
                    }}
                  />
                )}
              />
            </Stack>
          </LocalizationProvider>
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Typography sx={{ display: "flex", fontSize: 20 }}>Batch:</Typography>
          <TextField
            id="outlined-basic"
            label="Enter Batch"
            variant="outlined"
            value={batch}
            onChange={handleBatch}
            style={{ margin: "10px" }}
            sx={{
              width: {
                xs: 180,
                sm: 220,
                md: 260,
              },
            }}
            error={errors.batch !== ""}
            helperText={errors.batch}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row", sm: "row" },
            alignItems: "center",
          }}
        >
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Typography sx={{ display: "flex", fontSize: 20 }}>
              IT Requirements:
            </Typography>
            <Checkbox checked={checked} onChange={handleChange2} {...label} />
          </Box>

          <Typography sx={{ display: "flex", fontSize: 15 }}>
            (Mic ,camera , projector ,etc...)
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            typography: "body1",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TabContext value={v}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                flexGrow: 1,
                maxWidth: { xs: 380, md: 800, sm: 600 },
                bgcolor: "background.paper",
                display: "flex",
                flexDirection: "row",
              }}
              style={{ margin: "10px" }}
            >
              <Tabs
                value={v}
                onChange={MON_SUN}
                variant="scrollable"
                // scrollButtons="auto"
                scrollButtons={true}
                allowScrollButtonsMobile
                aria-label="scrollable auto tabs example"
              >
                {/* <TabList onChange={MON_SUN} aria-label="lab API tabs example"> */}
                <Tab label="Monday" value="1" />
                <Tab label="Tuesday" value="2" />
                <Tab label="Wednesday" value="3" />
                <Tab label="Thursday" value="4" />
                <Tab label="Friday" value="5" />
                <Tab label="Saturday" value="6" />
                <Tab label="Sunday" value="7" />
                {/* </TabList> */}
              </Tabs>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TabPanel value="1">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Typography>Start Time:</Typography>
                      <Box style={{ marginLeft: "10px" }}>
                        <TimePicker
                          label="Time"
                          value={time1S}
                          onChange={(value) => settime1S(value)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              sx={{
                                width: {
                                  xs: 180,
                                  sm: 240,
                                  md: 260,
                                },
                              }}
                            />
                          )}
                        />
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Typography>End Time:</Typography>
                      <Box style={{ marginLeft: "10px" }}>
                        <TimePicker
                          label="Time"
                          value={time1E}
                          onChange={(value) => settime1E(value)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              sx={{
                                width: {
                                  xs: 180,
                                  sm: 240,
                                  md: 260,
                                },
                              }}
                            />
                          )}
                        />
                      </Box>
                    </Box>
                  </Stack>
                </LocalizationProvider>
              </TabPanel>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TabPanel value="2">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Typography>Start Time:</Typography>
                      <Box style={{ marginLeft: "10px" }}>
                        <TimePicker
                          label="Time"
                          value={time2S}
                          onChange={(value) => settime2S(value)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              sx={{
                                width: {
                                  xs: 180,
                                  sm: 240,
                                  md: 260,
                                },
                              }}
                            />
                          )}
                        />
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Typography>End Time:</Typography>
                      <Box style={{ marginLeft: "10px" }}>
                        <TimePicker
                          label="Time"
                          value={time2E}
                          onChange={(value) => settime2E(value)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              sx={{
                                width: {
                                  xs: 180,
                                  sm: 240,
                                  md: 260,
                                },
                              }}
                            />
                          )}
                        />
                      </Box>
                    </Box>
                  </Stack>
                </LocalizationProvider>
              </TabPanel>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TabPanel value="3">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Typography>Start Time:</Typography>
                      <Box style={{ marginLeft: "10px" }}>
                        <TimePicker
                          label="Time"
                          value={time3S}
                          onChange={(value) => settime3S(value)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              sx={{
                                width: {
                                  xs: 180,
                                  sm: 240,
                                  md: 260,
                                },
                              }}
                            />
                          )}
                        />
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Typography>End Time:</Typography>
                      <Box style={{ marginLeft: "10px" }}>
                        <TimePicker
                          label="Time"
                          value={time3E}
                          onChange={(value) => settime3E(value)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              sx={{
                                width: {
                                  xs: 180,
                                  sm: 240,
                                  md: 260,
                                },
                              }}
                            />
                          )}
                        />
                      </Box>
                    </Box>
                  </Stack>
                </LocalizationProvider>
              </TabPanel>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TabPanel value="4">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Typography>Start Time:</Typography>
                      <Box style={{ marginLeft: "10px" }}>
                        <TimePicker
                          label="Time"
                          value={time4S}
                          onChange={(value) => settime4S(value)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              sx={{
                                width: {
                                  xs: 180,
                                  sm: 240,
                                  md: 260,
                                },
                              }}
                            />
                          )}
                        />
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Typography>End Time:</Typography>
                      <Box style={{ marginLeft: "10px" }}>
                        <TimePicker
                          label="Time"
                          value={time4E}
                          onChange={(value) => settime4E(value)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              sx={{
                                width: {
                                  xs: 180,
                                  sm: 240,
                                  md: 260,
                                },
                              }}
                            />
                          )}
                        />
                      </Box>
                    </Box>
                  </Stack>
                </LocalizationProvider>
              </TabPanel>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TabPanel value="5">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Typography>Start Time:</Typography>
                      <Box style={{ marginLeft: "10px" }}>
                        <TimePicker
                          label="Time"
                          value={time5S}
                          onChange={(value) => settime5S(value)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              sx={{
                                width: {
                                  xs: 180,
                                  sm: 240,
                                  md: 260,
                                },
                              }}
                            />
                          )}
                        />
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Typography>End Time:</Typography>
                      <Box style={{ marginLeft: "10px" }}>
                        <TimePicker
                          label="Time"
                          value={time5E}
                          onChange={(value) => settime5E(value)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              sx={{
                                width: {
                                  xs: 180,
                                  sm: 240,
                                  md: 260,
                                },
                              }}
                            />
                          )}
                        />
                      </Box>
                    </Box>
                  </Stack>
                </LocalizationProvider>
              </TabPanel>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TabPanel value="6">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Typography>Start Time:</Typography>
                      <Box style={{ marginLeft: "10px" }}>
                        <TimePicker
                          label="Time"
                          value={time6S}
                          onChange={(value) => settime6S(value)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              sx={{
                                width: {
                                  xs: 180,
                                  sm: 240,
                                  md: 260,
                                },
                              }}
                            />
                          )}
                        />
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Typography>End Time:</Typography>
                      <Box style={{ marginLeft: "10px" }}>
                        <TimePicker
                          label="Time"
                          value={time6E}
                          onChange={(value) => settime6E(value)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              sx={{
                                width: {
                                  xs: 180,
                                  sm: 240,
                                  md: 260,
                                },
                              }}
                            />
                          )}
                        />
                      </Box>
                    </Box>
                  </Stack>
                </LocalizationProvider>
              </TabPanel>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TabPanel value="7">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Typography>Start Time:</Typography>
                      <Box style={{ marginLeft: "10px" }}>
                        <TimePicker
                          label="Time"
                          value={time7S}
                          onChange={(value) => settime7S(value)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              sx={{
                                width: {
                                  xs: 180,
                                  sm: 240,
                                  md: 260,
                                },
                              }}
                            />
                          )}
                        />
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Typography>End Time:</Typography>
                      <Box style={{ marginLeft: "10px" }}>
                        <TimePicker
                          label="Time"
                          value={time7E}
                          onChange={(value) => settime7E(value)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              sx={{
                                width: {
                                  xs: 180,
                                  sm: 240,
                                  md: 260,
                                },
                              }}
                            />
                          )}
                        />
                      </Box>
                    </Box>
                  </Stack>
                </LocalizationProvider>
              </TabPanel>
            </Box>
          </TabContext>
        </Box>
        <Box>
          <Button variant="contained" endIcon={<SendIcon />} onClick={() => {
            dispatcher(bookingAction({
              ltId: Object.keys(data)[page - 1],
              purpose,
              startDate: value.format('YYYY-MM-DD'),
              endDate: value1.format('YYYY-MM-DD'),
              batch,
              it_req: checked,
              monST: time1S !== "" ? time1S.get('hour') * 100 + (time1S.get('minute') > 0 ? 50 : 0) : -1,
              monET: time1E !== "" ? time1E.get('hour') * 100 + (time1E.get('minute') > 0 ? 50 : 0) : -1,
              
              tueST: time2S !== "" ? time2S.get('hour') * 100 + (time2S.get('minute') > 0 ? 50 : 0) : -1,
              tueET: time2E !== "" ? time2E.get('hour') * 100 + (time2E.get('minute') > 0 ? 50 : 0) : -1,
              
              wedST: time3S !== "" ? time3S.get('hour') * 100 + (time3S.get('minutes') > 0 ? 50 : 0) : -1,
              wedET: time3E !== "" ? time3E.get('hour') * 100 + (time3E.get('minutes') > 0 ? 50 : 0) : -1,
              
              thuST: time4S !== "" ? time4S.get('hour') * 100 + (time4S.get('minutes') > 0 ? 50 : 0) : -1,
              thuET: time4E !== "" ? time4E.get('hour') * 100 + (time4E.get('minutes') > 0 ? 50 : 0) : -1,
              
              friST: time5S !== "" ? time5S.get('hour') * 100 + (time5S.get('minutes') > 0 ? 50 : 0) : -1,
              friET: time5E !== "" ? time5E.get('hour') * 100 + (time5E.get('minutes') > 0 ? 50 : 0) : -1,
              
              satST: time6S !== "" ? time6S.get('hour') * 100 + (time6S.get('minutes') > 0 ? 50 : 0) : -1,
              satET: time6E !== "" ? time6E.get('hour') * 100 + (time6E.get('minutes') > 0 ? 50 : 0) : -1,
              
              sunST: time7S !== "" ? time7S.get('hour') * 100 + (time7S.get('minutes') > 0 ? 50 : 0) : -1,
              sunET: time7E !== "" ? time7E.get('hour') * 100 + (time7E.get('minutes') > 0 ? 50 : 0) : -1,
            }));
          }}>
            Submit
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default MakeBooking;
