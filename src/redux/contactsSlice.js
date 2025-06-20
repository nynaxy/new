/* eslint-disable no-useless-catch */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  contacts: [],
  status: "idle",
  error: null,
};

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (_, { getState }) => {
    const state = getState();
    const token = state.auth.token;
    try {
      const response = await axios.get(
        "https://connections-api.goit.global/contacts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (newContact, { getState }) => {
    const state = getState();
    const token = state.auth.token;
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.post(
        "https://connections-api.goit.global/contacts",
        newContact,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

export const removeContact = createAsyncThunk(
  "contacts/removeContact",
  async (contactId, { getState }) => {
    const state = getState();
    const token = state.auth.token;
    try {
      await axios.delete(
        `https://connections-api.goit.global/contacts/${contactId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return contactId;
    } catch (error) {
      throw error;
    }
  },
);

export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async ({ id, updatedContact }, { getState }) => {
    const state = getState();
    const token = state.auth.token;
    try {
      const response = await axios.patch(
        `https://connections-api.goit.global/contacts/${id}`,
        updatedContact,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
      })
      .addCase(removeContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== action.payload,
        );
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        const index = state.contacts.findIndex(
          (contact) => contact.id === action.payload.id,
        );
        if (index !== -1) {
          state.contacts[index] = action.payload;
        }
      });
  },
});

export default contactsSlice.reducer;