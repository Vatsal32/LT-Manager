import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const Details = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const loc = useLocation();

  const [errors, setErrors] = useState("");

  useEffect(() => {
    console.log(data);

    if (data.errors === 403) {
      navigate("/login", { replace: true, state: { pg: loc.pathname } });
    }

    if (data.errors) {
      setErrors(data.errors);
    }
  }, [data]);

  return (
    <Box>
      <Typography variant="h6" color={"red"}>
        {errors}
      </Typography>
    </Box>
  );
};

export default Details;
