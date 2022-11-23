// import { Box, Link, Typography } from "@mui/material";
// import React from "react";

// const Error = () => {
//   return (
//     <Box
//       flex={1}
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         flexDirection: "column",
//       }}
//     >
//       <Typography variant={"h1"}>
//         Error
//       </Typography>
//       <Typography variant={"subtitle1"} color={'#00000070'}>
//         Cannot find the page. Maybe removed.
//       </Typography>
//       <Typography sx={{
//         opacity: 0.7
//       }}>
//         Go <Link href={'/'}>Home</Link>
//       </Typography>
//     </Box>
//   );
// };

// export default Error;
import { Link} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotAuthorized.css";

const NotAuthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="errorbg">
      <h1 className="errorcode404">Oops!</h1>
      <h2 className="errormsg">404 Page Not Found</h2>
      <p className="errordesc">The page you are looking for might have been removed, </p><p className="errordesc">had its name changed or is temporarily unavailable</p>
      <Link className="errordesc errordescret" style={{textDecoration:'none'}}
          onClick={() =>
            navigate("/", { replace: true, state: { pg: null } })
          }
      >
        Go to Homepage 
      </Link>{" "}
    </div>
  );
};

export default NotAuthorized;
