import React from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navigation = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Phonebook
        </Typography>
        <Button color="inherit" component={NavLink} to="/register">
          Register
        </Button>
        <Button color="inherit" component={NavLink} to="/login">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;