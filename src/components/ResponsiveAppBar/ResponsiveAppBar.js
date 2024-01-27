import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { isEmpty } from "lodash";
import AppContext from "../../context/AppContext";
import KitchenModal from "../KitchenModal";
import axios from "axios";
import {
  Menu,
  MenuItem,
  Fade,
  Grid,
  AppBar,
  Typography,
  Button,
} from "@mui/material";
import Gravatar from "react-gravatar";
import "./ResponsiveAppBar.css";

const ResponsiveAppBar = () => {
  const { loggedInUser, logout, kitchenUsers } = useContext(AppContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [kitchenName, setKitchenName] = useState();
  const [newKitchenUsers, setNewKitchenUsers] = useState([]);
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

  const addNewUser = () => {
    setNewKitchenUsers((previousKitchenUsers) => {
      return [...previousKitchenUsers, { email: "", role: "View-Only" }];
    });
  };

  const saveKitchen = async () => {
    const { data: kitchen } = await axios.post(
      `http://localhost:4001/v1/kitchen`,
      {
        name: kitchenName,
        kitchenUsers: newKitchenUsers,
      }
    );
    closeModal()
    setKitchenName("")
    setNewKitchenUsers([])
  };

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

      <KitchenModal
        open={isCreateModalOpen}
        close={closeModal}
        newKitchenUsers={newKitchenUsers}
        setNewKitchenUsers={setNewKitchenUsers}
        addNewUser={addNewUser}
        KitchenName={kitchenName}
        setKitchenName={setKitchenName}
        saveKitchen={saveKitchen}
      />
    </AppBar>
  );
};

export default ResponsiveAppBar;
