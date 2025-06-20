import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../redux/authSlice";
import { TextField, Button, Box, Typography } from "@mui/material";

const Register = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup({ name, email, password }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h5">Register</Typography>
      <TextField
        fullWidth
        label="Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
        required
      />
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
        Register
      </Button>
    </Box>
  );
};

export default Register;