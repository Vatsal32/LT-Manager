import * as React from "react";
import Box from "@mui/material/Box";
import "./PendingRequestPage.css";
import Pend from "./Pend";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect } from "react";

export default function PendingRequestPage() {
  const [data, setData] = React.useState(null);
  const navigate = useNavigate();
  const [pending, setPending] = React.useState(null);
  const loc = useLocation();

  const getData = async () => {
    return fetch("http://localhost:5001/api/bookings/pending", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("JWT_TOKEN")}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          if (res.status === 440) {
            navigate('/sessionExpired');
          } else if (res.status === 401) {
            navigate('/notAuthorized');
          } else {
            navigate('/error');
          }
  
          return {errors: res.status};
        }
      })
      .then((ans) => {
        if (ans.errors) {
          return {
            errors: ans.errors,
          };
        } else {
          console.log("RET", ans.data);
          return ans.data;
        }
      });
  };

  useEffect(() => {
    getData().then((data) => setData(data));
  }, []);

  React.useEffect(() => {
    if (data !== null) {
      if (data.errors === 403) {
        navigate("/login", { replace: true, state: { pg: loc.pathname } });
      } else if (data.errors === 440) {
        navigate("/sessionExpired", { replace: true });
      }

      console.log(data);

      if (data.errors) {
        navigate("/error");
      } else {
        setPending(data);
      }
    }
  }, [data]);

  const elements = React.useMemo(() => {
    let ele = [];
    if (pending !== null) {
      ele = pending.map((item, key) => {
        return (
          <Pend
            key={key}
            userName={item.userName}
            LtNumber={item.lt}
            date={dayjs(item.startDate).format("DD-MM-YYYY")}
            id={item.id}
          />
        );
      });
      return ele;
    }
  }, [pending]);

  if (elements === undefined || elements.length === 0) {
    return (
      <Box
        style={{
          marginTop: "-9px",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LinearProgress />
      </Box>
    );
  }

  return (
    <div className="pendingdiv">
      <Box className="pendingbox" sx={{ boxShadow: "10" }}>
        {elements}
      </Box>
    </div>
  );
}
