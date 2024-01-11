import { useState, useContext } from "react";
import AppContext from "../../context/AppContext";
import { Typography, Button, TextField, Grid, Link } from "@mui/material";



function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");

    const { register, registerError } = useContext(AppContext);

    const handleClick = () => {
        register({first_name: firstName, last_name: lastName, password, email, username});
      };
    

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      sx={{
        '& .MuiTextField-root': { m: 1, width: '45ch' },
      }}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={6}>
        <Typography>Register</Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="First Name"
          variant="outlined"
          onChange={(e) => setFirstName(e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Last Name"
          variant="outlined"
          onChange={(e) => setLastName(e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Username"
          variant="outlined"
          onChange={(e) => setUsername(e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Email"
          variant="outlined"
          error={registerError}
          helperText={registerError && "This email is already in use. Please use a different email or login."}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <Link>
          <Button
            variant="contained"
            disabled={!firstName || !lastName || !username || !email || !password}
            onClick={handleClick}
          >
            Create Account
          </Button>
        </Link>
      </Grid>
    </Grid>
  )
}

export default Register