import { Box, Link, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotAuthorized = () => {
  const navigate = useNavigate();

  return (
    <Box
      flex={1}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant={"h1"}>Not Authorized</Typography>
      <Typography variant={"subtitle1"} color={"#00000070"}>
        You are not authorized to access this page.
      </Typography>
      <Typography
        sx={{
          opacity: 0.7,
        }}
        color={"#00000070"}
      >
        Please{" "}
        <Link
          onClick={() =>
            navigate("/login", { replace: true, state: { pg: null } })
          }
        >
          Login
        </Link>{" "}
        with proper credentials.
      </Typography>
    </Box>
  );
};

export default NotAuthorized;
