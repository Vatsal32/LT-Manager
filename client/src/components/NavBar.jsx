import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Link,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../store/actions/users";

const NavBar = () => {
  const [anchor, setAnchor] = useState(null);
  const dispatcher = useDispatch();
  const loggedIn = useSelector((state) => state.users.loggedIn);

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <AppBar position="sticky">
      <Toolbar sx={{marginY: 1}}>
        <Typography variant="h4" color={'white'}>
          <Link underline="none" sx={{
            ":hover": {
              textDecoration: 'none',
              color: 'white',
            },
            color: 'white'
          }} href={'/'}>
            LT-Manager
          </Link>
        </Typography>
        <Box sx={{ flex: 1 }} />
        {loggedIn && (
          <IconButton onClick={(e) => setAnchor(e.currentTarget)}>
            <Avatar />
          </IconButton>
        )}
        <Menu
          id="menu-appbar"
          anchorEl={anchor}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchor)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              dispatcher(logoutAction());
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
