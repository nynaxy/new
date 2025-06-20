import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/filterSlice";
import { TextField, Box } from "@mui/material";

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);

  const handleChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <Box sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Find contacts by name"
        value={filter}
        onChange={handleChange}
      />
    </Box>
  );
};

export default Filter;