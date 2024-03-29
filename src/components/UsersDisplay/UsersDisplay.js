import { Grid, Paper, Typography, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { useContext } from "react";
import AppContext from "../../context/AppContext";

const UsersDisplay = ({ kitchenId }) => {
  const [users, setUsers] = useState([]);
  const { loggedInUser } = useContext(AppContext);
  const fetchUserList = async () => {
    const usersList = await axios.get(`/v1/kitchen/${kitchenId}/users`);
    setUsers(usersList.data);
  };

  const matchingUser = users.find((user) => user.id === loggedInUser.id);

  // Fetches users on intial startup.
  useEffect(() => {
    fetchUserList();
  }, []);
  return (
    // One Parent Element
    <Grid container direction={"column"} spacing={4}>
      {/* 1 of 3 items in PARENT container */}
      <Grid item>
        <Typography variant="h6">Kitchen Users</Typography>
      </Grid>
      {/* 2 of 3 items in PARENT container */}
      {/* Container for user photo and name */}
      <Grid item>
        <Grid container direction="column" spacing={2}>
          {!users || isEmpty(users) ? (
            <Grid item>
              <Typography variant="h7">No users in the kitchen</Typography>
            </Grid>
          ) : (
            users.map((user) => {
              return (
                // User's first name and photo
                <Grid item>
                  {/* User info container */}
                  <Grid container>
                    {/* 1 of 2 items in CHILD container */}
                    {/* user photo */}
                    <Grid item>
                      <Typography variant="body1">
                        {user.profile_img ? (
                          <img
                            src={`${user.profile_img}`}
                            alt="user's profile"
                          />
                        ) : (
                          <AccountCircleIcon fontSize="small" />
                        )}
                      </Typography>
                    </Grid>
                    {/* 1 of 2 items in CHILD container */}
                    {/* user first name */}
                    <Grid item>
                      <Typography variant="body1">
                        {`${user.first_name} ${user.last_name}`}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })
          )}
          {/* 2 of 2 items in child container */}
          {/* user's name */}
        </Grid>
      </Grid>
      {/* 3 of 3 items PARENT container */}
      {/* Button conditionally rendered based on user's 'role' */}
      <Grid item>
        {matchingUser?.role === "Super Admin" ? (
          <Button variant="contained">Edit</Button>
        ) : (
          <></>
        )}
      </Grid>
    </Grid>
  );
};

export default UsersDisplay;
