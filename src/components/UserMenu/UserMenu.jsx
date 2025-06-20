import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import { Button, Typography } from "@mui/material";

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {user ? (
        <Typography>{user.email}</Typography>
      ) : (
        <Typography>Loading...</Typography>
      )}
      <Button onClick={handleLogout} variant="contained" color="secondary">
        Logout
      </Button>
    </div>
  );
};

export default UserMenu;