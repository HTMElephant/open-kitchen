import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableRow,
  TableCell,
  TextField,
  Button,
} from "@mui/material";

const UserTableRow = ({ role, email, setNewKitchenUsers, index }) => {
  const handleUpdate = (key, event) => {
    setNewKitchenUsers((previousKitchenUsers) => {
      previousKitchenUsers[index][key] = event.target.value;
      return [...previousKitchenUsers];
    });
  };

  const removeUser = () => {
    setNewKitchenUsers((previousKitchenUsers) => {
      previousKitchenUsers.splice(index, 1);
      return [...previousKitchenUsers];
    });
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <TextField
            onChange={(event) => handleUpdate("email", event)}
            value={email}
            label="user email"
          ></TextField>
        </TableCell>

        <TableCell>
          <FormControl>
            <InputLabel>Role</InputLabel>
            <Select
              sx={{ width: "15ch" }}
              label="Role"
              value={role}
              onChange={(event) => handleUpdate("role", event)}
            >
              <MenuItem value={"Chef"}>Chef</MenuItem>
              <MenuItem value={"View-Only"}>View Only</MenuItem>
            </Select>
          </FormControl>
        </TableCell>

        <TableCell>
          <Button onClick={removeUser}>Delete</Button>
        </TableCell>
      </TableRow>
    </>
  );
};

export default UserTableRow;
