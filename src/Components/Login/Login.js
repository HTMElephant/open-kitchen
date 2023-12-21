import { useState, useContext } from "react";
import AppContext from "../../context/AppContext";
import { Typography, Button, TextField, Grid, Link } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const { login, loginError } = useContext(AppContext);

  const handleLoginError = () => {
    if (loginError === true) {
      return "Invalid credentials, Please try again.";
    }
  };

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
    >
      <Grid item xs={6}>
        <Typography>Login</Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          error={loginError}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          error={loginError}
          helperText={handleLoginError()}
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
    </Grid>
  );
};

export default Login;
