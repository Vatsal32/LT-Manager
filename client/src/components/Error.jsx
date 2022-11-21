import { Box, Link, Typography } from "@mui/material";
import React from "react";

const Error = () => {
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
      <Typography variant={"h1"}>
        Error
      </Typography>
      <Typography variant={"subtitle1"} color={'#00000070'}>
        Cannot find the page. Maybe removed.
      </Typography>
      <Typography sx={{
        opacity: 0.7
      }}>
        Go <Link href={'/'}>Home</Link>
      </Typography>
    </Box>
  );
};

export default Error;
