import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";
import { Box, Button, Grid, Typography, Paper } from "@mui/material";

const Recipe = () => {
  const [recipe, setRecipe] = useState({});
  const [isRecipeOpen, setIsRecipeOpen] = useState();
  const { id } = useParams();
  const { loggedInUser } = useContext(AppContext);
  useEffect(() => {
    const getRecipe = async (id) => {
      const response = await axios.get(`/v1/recipes/${id}`);
      console.log("Response.data", response.data);
      console.log("Logged in user", loggedInUser)
      setRecipe(response.data);
    };  
    getRecipe(id);
  }, [id])

  let recipe_user_id = recipe.user_id; 
  let isEditable = loggedInUser && recipe_user_id === loggedInUser.id ? true : false;
  let recipe_user = recipe.user;

  return (
    <Paper>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        padding="10px"
      >
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
            {`This is a Recipe with id: ${id}`}
          </Typography>
        </Grid>
        <Grid item>
          {isEditable ? <Button>Edit</Button> : null}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Recipe;