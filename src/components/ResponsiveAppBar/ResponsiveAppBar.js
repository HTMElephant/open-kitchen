import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { isEmpty } from "lodash";
import AppContext from "../../context/AppContext";
import KitchenModal from "../KitchenModal";
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
  const { loggedInUser, logout } = useContext(AppContext);
  const [isCreateKitchenModalOpen, setIsCreateKitchenModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

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

  const openKitchenModal = () => {
    setIsCreateKitchenModalOpen(true);
  };

  const closeKitchenModal = () => {
    setIsCreateKitchenModalOpen(false);
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
        <MenuItem >Create Recipe</MenuItem>
        <MenuItem onClick={openKitchenModal}>Create Kitchen</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      <KitchenModal
        open={isCreateKitchenModalOpen}
        close={closeKitchenModal}
      />
    </AppBar>
  );
};

export default ResponsiveAppBar;
