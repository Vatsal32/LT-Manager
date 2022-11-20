import React from "react";
import { Box } from "@mui/material";
import "./App.css";
import Login from "./components/users/Login";
import NavBar from "./components/NavBar";
import Home from "./components/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MakeBooking from "./components/bookings/MakeBooking";
import Register from "./components/users/Register";
import DeleteUser from "./components/users/DeleteUser";
import AddRooms from "./components/rooms/AddRooms";
import Details from "./components/bookings/Details";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/book/:x/:y",
    loader: async () => {
      const result = await fetch("http://localhost:5001/api/rooms/", {
        method: "GET",
      });
      const ans = await result.json();
      if (ans.errors) {
        return ans.errors;
      }
      return ans.data;
    },
    element: <MakeBooking />,
  },
  {
    path: "/register/",
    element: <Register />,
  },
  {
    path: "/deleteUser",
    element: <DeleteUser />,
  },
  {
    path: "/addRooms",
    element: <AddRooms />,
  },
  {
    path: "/details/:id",
    loader: async ({ params }) => {
      console.log(params);
      const result = await fetch("http://localhost:5001/api/bookings/details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("JWT_TOKEN")}`,
        },
        body: JSON.stringify({ bookId: params.id }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return { errors: res.status };
          }
        })
        .catch((err) => {
          console.log(err);
          return { errors: err };
        });

      if (result.errors) {
        return result;
      } else {
        return result.data;
      }
    },
    element: <Details />,
  },
]);

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <NavBar />
      <RouterProvider router={router} />
    </Box>
  );
}

export default App;
