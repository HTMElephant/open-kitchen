import { Grid, Paper, Typography, Button } from "@mui/material";
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
    <Grid width="100%">
      {/* Making the container to hold User information and header */}
      <Grid item>
        <Grid container direction={"column"} padding="10px">
          {/* 1 of 3 items in PARENT container */}
          <Grid item>
            <Typography variant="h6">Kitchen Users</Typography>
          </Grid>
          {/* 2 of 3 items in PARENT container */}
          {/* Container for user photo and name */}
          <Grid item>
            <Grid container direction="column">
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
                                alt="user's profile image"
                              />
                            ) : (
                              <img
                                src="https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
                                alt="default-profile-image"
                                height="25px"
                                width="25px"
                              />
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
      </Grid>
    </Grid>
  );
};

export default UsersDisplay;
