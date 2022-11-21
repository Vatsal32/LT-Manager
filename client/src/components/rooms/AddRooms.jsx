import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Stack } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { addRoomAction } from "../../store/actions/rooms";
import { useNavigate } from "react-router-dom";

const AddRooms = () => {
  const navigate = useNavigate();
  const allowAdd = useSelector(
    (state) =>
      state.users.isAdmin1 ||
      state.users.isAdmin2 ||
      state.users.isAdmin3 ||
      state.users.isSuperAdmin
  );
  const [state, setState] = React.useState("");
  const [state1, setState1] = React.useState(0);
  const [err, seterr] = React.useState(false);
  const [error, setError] = React.useState({
    roomNo: "",
    capacity: "",
  });
  const [success, setSuccess] = React.useState("");
  const dispatcher = useDispatch();
  const errors = useSelector((state) => state.rooms.addErrors);
  const added = useSelector((state) => state.rooms.added);

  useEffect(() => {
    if (!allowAdd) {
      navigate('/notAuthorized');
    }
  }, [allowAdd]);

  const textout = (e) => {
    setState(e.target.value);
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      seterr(true);
      setError({ ...errors.errors });
      setSuccess("");
    } else {
      setError({
        roomNo: "",
        capacity: "",
      });
    }

    if (added) {
      setSuccess("Room added successfully!");
      setError({
        roomNo: "",
        capacity: "",
      });
    } else {
      setSuccess("");
    }
  }, [errors, added]);

  const handleClickOpen = () => {
    let e = true;
    if (state == "") {
      e = false;
      seterr(true);
      setError((state) => ({
        ...state,
        roomNo: "Empty field",
      }));
    }

    if (state1 <= 0) {
      e = false;
      seterr(true);
      setError((state) => ({
        ...state,
        capacity: "Should be numeric positive value",
      }));
    }

    if (e) {
      dispatcher(
        addRoomAction({
          data: {
            roomNo: state,
            capacity: state1,
          },
          navigate,
        })
      );
    }
  };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          height: "100%",
        }}
      >
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography style={{ marginBottom: "20px", color: "green" }}>
            {success}
          </Typography>
        </Box>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography style={{ marginBottom: "20px" }}>Room Number:</Typography>
          <TextField
            value={state}
            onChange={textout}
            error={err && Boolean(error.roomNo)}
            helperText={error.roomNo}
            id="outlined-basic"
            label={"Room Number"}
            variant="outlined"
            required
            style={{ marginLeft: "10px", marginBottom: "50px" }}
          />
        </Box>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography style={{ marginBottom: "20px" }}>Capacity:</Typography>
          <TextField
            value={state1}
            onChange={(e) => setState1(e.target.value)}
            error={err && Boolean(error.capacity)}
            helperText={error.capacity}
            id="outlined-basic"
            label={"Capacity"}
            variant="outlined"
            required
            style={{ marginLeft: "10px" }}
          />
        </Box>
        <Stack direction="row" spacing={5} margin="10px">
          <Button variant="contained" onClick={handleClickOpen}>
            Add Room
          </Button>
        </Stack>
      </div>
    </Box>
  );
};

export default AddRooms;
