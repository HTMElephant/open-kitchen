import React from "react";
import UserTableRow from "../UserTableRow";
import Dialog from '@mui/material/Dialog';
import {
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Table,
  TableHead,
  Typography,
  Button,
} from "@mui/material";

const KitchenModal = ({
  newKitchenUsers,
  setNewKitchenUsers,
  addNewUser,
  KitchenName,
  setKitchenName,
  saveKitchen,
  open, 
  close
}) => {
  const handleChange = (event) => {
    setKitchenName(event.target.value);
  };

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle align="center">Create Kitchen</DialogTitle>
      <DialogContent>
        <TextField
          onChange={handleChange}
          label="Kitchen Name"
          variant="outlined"
          value={KitchenName}
        ></TextField>
        <Typography sx={{ marginTop: 3 }} variant="h6" align="center">
          Users
        </Typography>
        <Table>
          <TableHead>
            {newKitchenUsers.map((kitchenUser, index) => (
              <UserTableRow
                key={index}
                email={kitchenUser.email}
                role={kitchenUser.role}
                index={index}
                setNewKitchenUsers={setNewKitchenUsers}
              />
            ))}
          </TableHead>
        </Table>
        <Button onClick={addNewUser}>Add User</Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button onClick={saveKitchen}>Save Kitchen</Button>
      </DialogActions>
    </Dialog>
  );
};

export default KitchenModal;
