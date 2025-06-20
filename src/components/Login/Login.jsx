import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/authSlice";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Navigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  if (isLoggedIn) {
    return <Navigate to="/contacts" />;
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <TextField
        fullWidth
        label="Email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Password"
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        required
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Login
      </Button>
    </Box>
  );
};

export default Login;