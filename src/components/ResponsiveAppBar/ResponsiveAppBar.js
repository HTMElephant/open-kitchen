import * as React from "react";
import Grid from "@mui/system/Unstable_Grid/Grid";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { concat, isEmpty } from "lodash";
import AppContext from "../../context/AppContext";
import { useContext } from "react";
import { Avatar, Menu, MenuItem, Fade } from "@mui/material";
import "./ResponsiveAppBar.css";
const ResponsiveAppBar = () => {
  const { loggedInUser, logout } = useContext(AppContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };
  const handleNavigate = (route) => {
    navigate(`${route}`);
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
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
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
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
            onClick={() => handleNavigate("/kitchens")}
          >
            My Kitchens
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );

  const getUserInitials = (user) => {
    let firstNameLetter = user.first_name.charAt(0);
    let lastNameLetter = user.last_name.charAt(0);
    let initials = concat(firstNameLetter, lastNameLetter);
    return initials;
  };

  if (!loggedInUser || isEmpty(loggedInUser)) {
    buttonDisplay = (
      <Button
        variant="contained"
        className="login_button"
        onClick={() => handleClick()}
      >
        Login
      </Button>
    );
  } else {
    let initials = getUserInitials(loggedInUser);
    buttonDisplay = <Avatar onClick={(e) => handleOpen(e)}>{initials}</Avatar>;
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
        <MenuItem onClick={handleClose}>Create Kitchen</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default ResponsiveAppBar;
