import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import contactsReducer from "./contactsSlice";
import filterReducer from "./filterSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    contacts: contactsReducer,
    filter: filterReducer,
  },
});

export default store;