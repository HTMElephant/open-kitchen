import { useState, useContext } from "react";
import AppContext from "../../context/AppContext";
import { Typography, Button, TextField, Grid, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loginError } = useContext(AppContext);

  const navigate = useNavigate();

  const handleClick = () => {
    login(email, password);
  };


  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      direction="column"
      justifyContent="center"
      alignItems="center"
      marginTop="60px !important"
    >
      <Grid item xs={6}>
        <Typography>Login</Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          error={loginError}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          error={loginError}
          helperText={loginError && "Invalid credentials, Please try again."}
        />
      </Grid>
      <Grid item xs={6}>
        <Link>
          <Button
            variant="contained"
            disabled={!email || !password}
            onClick={handleClick}
          >
            Log In
          </Button>
        </Link>
      </Grid>
      <Grid item xs={6}>
        <Link underline="hover" style={{cursor: "pointer"}} onClick={() => navigate("/register")}>
          {"Don't have an account? Register Here"}
        </Link>
      </Grid>
    </Grid>
  );
};

export default Login;
