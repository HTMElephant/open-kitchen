import * as React from "react";
import Grid from "@mui/system/Unstable_Grid/Grid";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { concat, isEmpty } from "lodash";
import AppContext from "../../context/AppContext";
import { useContext } from "react";
import { Avatar } from "@mui/material";

const ResponsiveAppBar = () => {
  const { loggedInUser } = useContext(AppContext);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };
  let buttonDisplay;

  const getUserInitials = (user) => {
    let firstNameLetter = user.firstName.charAt(0);
    let lastNameLetter = user.lastName.charAt(0);
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
      <Avatar>{initials}</Avatar>
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
    </AppBar>
  );
};

export default ResponsiveAppBar;
