import { Box } from '@mui/material';
import './App.css';
import Login from './components/users/Login';
import NavBar from './components/NavBar';
import Home from "./components/Home/Home";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: '/',
    element: <Home />,
  },
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
