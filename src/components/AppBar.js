import * as React from "react";
import Grid from "@mui/system/Unstable_Grid/Grid";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";

const ResponsiveAppBar = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };
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
        <Grid item>
          <Button
            variant="contained"
            className="login_button"
            onClick={() => handleClick()}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default ResponsiveAppBar;
