import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { fetchCurrentUser } from "../../redux/authSlice";
import { fetchContacts } from "../../redux/contactsSlice";
import { Container, Box } from "@mui/material";
import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu";
import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import Filter from "../Filter/Filter";
import Login from "../Login/Login";
import Register from "../Register/Register";

const App = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchContacts());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <Container>
      <Box>
        <Navigation />
        {isLoggedIn && <UserMenu />}
        <Routes>
          <Route
            path="/"
            element={<Navigate to={isLoggedIn ? "/contacts" : "/login"} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/contacts"
            element={
              isLoggedIn ? (
                <>
                  <ContactForm />
                  <Filter />
                  <ContactList />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Box>
    </Container>
  );
};

export default App;