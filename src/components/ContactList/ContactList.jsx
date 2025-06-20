import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeContact, updateContact } from "../../redux/contactsSlice";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ContactList = () => {
  const contacts = useSelector((state) => state.contacts.contacts);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const [editingId, setEditingId] = React.useState(null);
  const [editedName, setEditedName] = React.useState("");
  const [editedPhone, setEditedPhone] = React.useState("");

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
  );

  const handleEdit = (contact) => {
    setEditingId(contact.id);
    setEditedName(contact.name);
    setEditedPhone(contact.number);
  };

  const handleUpdate = (id) => {
    dispatch(
      updateContact({
        id,
        updatedContact: { name: editedName, number: editedPhone },
      }),
    );
    setEditingId(null);
  };

  return (
    <List>
      {filteredContacts.map(({ id, name, number }) => (
        <ListItem key={id}>
          {editingId === id ? (
            <>
              <TextField
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                label="Name"
                margin="normal"
              />
              <TextField
                value={editedPhone}
                onChange={(e) => setEditedPhone(e.target.value)}
                label="Phone"
                margin="normal"
              />
              <Button
                onClick={() => handleUpdate(id)}
                color="primary"
                variant="contained">
                Save
              </Button>
            </>
          ) : (
            <>
              <ListItemText primary={`${name}: ${number}`} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => dispatch(removeContact(id))}>
                  <DeleteIcon />
                </IconButton>
                <Button
                  onClick={() => handleEdit({ id, name, number })}
                  color="primary"
                  variant="contained">
                  Edit
                </Button>
              </ListItemSecondaryAction>
            </>
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default ContactList;