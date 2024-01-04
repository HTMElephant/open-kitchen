import * as React from "react";
import Grid from "@mui/system/Unstable_Grid/Grid";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { concat, isEmpty } from "lodash";
import AppContext from "../../context/AppContext";
import { useContext } from "react";
import { Avatar, Menu, MenuItem } from "@mui/material";

const ResponsiveAppBar = () => {
  const { loggedInUser } = useContext(AppContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };

  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  let buttonDisplay;

  const getUserInitials = (user) => {
    console.log(user);
    let firstNameLetter = user.first_name.charAt(0);
    let lastNameLetter = user.last_name.charAt(0);
    let initials = concat(firstNameLetter, lastNameLetter)
    return initials
  }

  if (!loggedInUser || loggedInUser.isEmpty) {
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
    buttonDisplay = (
      <Avatar onClick={(e) => handleOpen(e)}>{initials}</Avatar>
    )
  }
  return (
    <AppBar sx={{ bgcolor: "gray" }}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        padding={"10px"}
      >
        <Grid item xs={4}>
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
        <Grid item>{buttonDisplay}</Grid>
      </Grid>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
        }}
        transformOrigin={{
          vertical: 'bottom',
        }}
      >
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default ResponsiveAppBar;
