import { Grid, Paper, Typography, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const UsersDisplay = ({kitchenId}) => {
    const [users, setUsers] = useState();
    const fetchUserList = async () => {
        const usersList = await axios.get(`/v1/kitchen/${kitchenId}/users`)
        setUsers(usersList);
    }
    // Fetches users on intial startup.
    useEffect(() => {
        fetchUserList();
        console.log("Users", users)
    }, [])
  return (
    // One Parent Element
    <Grid>
      {/* Making the container to hold User information */}
      <Grid item>
        <Grid container direction={"column"}>
          {/* 1 of 3 items in PARENT container */}
          <Grid item>
            <Typography variant="h6">Kitchen Users</Typography>
          </Grid>
          {/* 2 of 3 items in PARENT container */}
          {/* Container for user photo and name */}
          <Grid item>
            <Grid container>
              {/* 1 of 2 items in CHILD container */}
              {/* user photo */}
              <Grid item>{/* <img></img> */}</Grid>
              {/* 2 of 2 items in child container */}
              {/* user's name */}
              <Grid item>{/* user.name */}</Grid>
            </Grid>
          </Grid>
          {/* 3 of 3 items PARENT container */}
          {/* Button conditionally rendered based on user's 'role' */}
          <Grid item>
            <Button variant="contained">Edit</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UsersDisplay;
