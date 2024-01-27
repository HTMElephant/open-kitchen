import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { isEmpty } from "lodash";
import AppContext from "../../context/AppContext";
import Modal from "../Modal";
import {
  Menu,
  MenuItem,
  Fade,
  Grid,
  AppBar,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Gravatar from "react-gravatar";
import "./ResponsiveAppBar.css";

const ResponsiveAppBar = () => {
  const { loggedInUser, logout, kitchenUsers } = useContext(AppContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [role, setRole] = useState("");
  const [newkitchenUsers, setNewKitchenUsers] = useState([]);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();
  const handleNavigate = (route) => {
    navigate(route);
  };

  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const addNewUser = (user) => {
    setNewKitchenUsers([...newkitchenUsers, user]);
  };

  const removeUser = (user) => {
    const newUserList = [...newkitchenUsers]
    console.log(kitchenUsers)
    const indexToRemove = newUserList.findIndex((user) => user.id === kitchenUsers.id)
    newUserList.splice(indexToRemove, 1)
    setNewKitchenUsers(newUserList) 
  }

  const handleChange = (e) => {
    setRole(e.target.value);
    console.log(role);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  const closeModal = () => {
    setIsCreateModalOpen(false);
  };

  const openModal = () => {
    setIsCreateModalOpen(true);
  };

  console.log(loggedInUser)

  let buttonDisplay;
  let routes = (
    <Grid item>
      <Grid container>
        <Grid item>
          {/* My Recipes */}
          <Typography
            className="navBarRoute"
            variant="h6"
            noWrap
            component="a"
            onClick={() => handleNavigate("/user/recipes")}
          >
            My Recipes
          </Typography>
        </Grid>
        <Grid item>
          {/* My Kitchens */}
          <Typography
            className="navBarRoute"
            variant="h6"
            noWrap
            component="a"
            onClick={() => handleNavigate("/kitchens")}
          >
            My Kitchens
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );

  if (!loggedInUser || isEmpty(loggedInUser)) {
    buttonDisplay = (
      <Button
        variant="contained"
        className="login_button"
        onClick={() => handleNavigate("/login")}
      >
        Login
      </Button>
    );
  } else {
    buttonDisplay = (
      <Gravatar email={loggedInUser.email} onClick={(e) => handleOpen(e)} />
      
    );
  }
  return (
    <AppBar sx={{ bgcolor: "gray" }}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        padding="10px"
      >
        {/* Open Kitchen Logo */}
        <Grid item>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
            onClick={() => handleNavigate("/")}
          >
            OpenKitchen
          </Typography>
        </Grid>
        {!loggedInUser || isEmpty(loggedInUser) ? <></> : routes}
        <Grid item>{buttonDisplay}</Grid>
      </Grid>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Create Recipe</MenuItem>
        <MenuItem onClick={openModal}>Create Kitchen</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      <Modal open={isCreateModalOpen} close={closeModal}>
        <DialogTitle align="center">Create Kitchen</DialogTitle>
        <DialogContent>
          <TextField label="Kitchen Name" variant="outlined"></TextField>
          <Typography sx={{ marginTop: 3 }} variant="h6" align="center">
            Users
          </Typography>
          <Table>

            <TableHead>

              {newkitchenUsers.map((kitchenUser) => (
                <TableRow>
                  <TableCell>
                    <TextField label="user email"></TextField>
                  </TableCell>

                  <TableCell>
                    <FormControl>
                      <InputLabel>Role</InputLabel>
                      <Select
                        sx={{ width: "15ch" }}
                        label="Role"
                        value={role}
                        onChange={handleChange}
                      >
                        <MenuItem value={"Chef"}>Chef</MenuItem>
                        <MenuItem value={"View Only"}>View Only</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>

                  <TableCell>
                    <Button onClick={removeUser}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}

            </TableHead>
          </Table>
          <Button onClick={addNewUser}>Add User</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button>Save Kitchen</Button>
        </DialogActions>
      </Modal>
    </AppBar>
  );
};

export default ResponsiveAppBar;
