import { useContext, useState, useMemo } from "react";
import UserTableRow from "../UserTableRow";
import axios from "axios";
import AppContext from "../../context/AppContext";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Table,
  TableHead,
  Typography,
  Button,
} from "@mui/material";

const KitchenModal = ({ open, close }) => {
  const { loggedInUser } = useContext(AppContext);
  const [kitchenName, setKitchenName] = useState();
  const [newKitchenUsers, setNewKitchenUsers] = useState([]);

  const isFormValid = useMemo(() => {
    return (
      kitchenName !== undefined &&
      newKitchenUsers.every((user) => user.email !== "")
    );
  }, [
    kitchenName,
    newKitchenUsers
  ]);

  const handleChange = (event) => {
    setKitchenName(event.target.value);
  };

  const addNewUser = () => {
    setNewKitchenUsers((previousKitchenUsers) => {
      return [...previousKitchenUsers, { email: "", role: "View-Only" }];
    });
  };

  const saveKitchen = async () => {
    await axios.post(`http://localhost:4001/v1/kitchen`, {
      name: kitchenName,
      kitchenUsers: [
        ...newKitchenUsers,
        { email: loggedInUser.email, role: "Super Admin" },
      ],
    });

    close();
    setKitchenName("");
    setNewKitchenUsers([]);
  };

  const handleClose = () => {
    setKitchenName()
    setNewKitchenUsers([])
    close();
  };

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle align="center">Create Kitchen</DialogTitle>
      <DialogContent>
        <TextField
          onChange={handleChange}
          label="Kitchen Name"
          variant="outlined"
          value={kitchenName}
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
        <Button onClick={handleClose}>Cancel</Button>
        <Button disabled={!isFormValid} onClick={saveKitchen}>Save Kitchen</Button>
      </DialogActions>
    </Dialog>
  );
};

export default KitchenModal;
