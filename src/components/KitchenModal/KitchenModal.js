import React from "react";
import Modal from "../Modal";
import UserTableRow from "../UserTableRow";
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
  closeModal,
  open,
  KitchenName,
  setKitchenName,
  saveKitchen,
}) => {
  const handleChange = (event) => {
    setKitchenName(event.target.value);
  };

  return (
    <Modal open={open} close={closeModal}>
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
        <Button onClick={closeModal}>Cancel</Button>
        <Button onClick={saveKitchen}>Save Kitchen</Button>
      </DialogActions>
    </Modal>
  );
};

export default KitchenModal;
