import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contactsSlice";
import { TextField, Button, Box } from "@mui/material";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [errors, setErrors] = useState({});
  const contacts = useSelector((state) => state.contacts.contacts);
  const dispatch = useDispatch();

  const validateName = (name) => {
    const nameParts = name.trim().split(" ");
    return (
      nameParts.length >= 2 &&
      nameParts.every((part) => /^[A-Za-z]+$/.test(part))
    );
  };

  const validateNumber = (number) => {
    return /^[0-9-]+$/.test(number);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "number") {
      setNumber(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!validateName(name)) {
      newErrors.name =
        "Name must contain first and last name, only letters are allowed.";
    }
    if (!validateNumber(number)) {
      newErrors.number = "Number can only contain digits and hyphens.";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    if (contacts.some((contact) => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }

    dispatch(addContact({ name, number }));
    setName("");
    setNumber("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Name"
        name="name"
        value={name}
        onChange={handleChange}
        margin="normal"
        error={Boolean(errors.name)}
        helperText={errors.name}
        required
      />
      <TextField
        fullWidth
        label="Number"
        name="number"
        value={number}
        onChange={handleChange}
        margin="normal"
        error={Boolean(errors.number)}
        helperText={errors.number}
        required
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Add contact
      </Button>
    </Box>
  );
};

export default ContactForm;