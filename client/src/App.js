import React from 'react';
import { Box } from '@mui/material';
import './App.css';
import Login from './components/users/Login';
import NavBar from './components/NavBar';
import Home from "./components/Home/Home";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MakeBooking from './components/bookings/MakeBooking';
import Register from './components/users/Register';
import DeleteUser from './components/users/DeleteUser';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/book/:y',
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
    element: <MakeBooking />
  },
  {
    path: '/register/',
    element: <Register />
  },
  {
    path: '/deleteUser',
    element: <DeleteUser />
  }
]);

function App() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
    }}>
      <NavBar />
      <RouterProvider router={router} />
    </Box>
  );
}

export default App;
