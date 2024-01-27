import { Typography, Grid, Button, Paper } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";
import RecipesDisplay from "../RecipesDisplay/RecipesDisplay";
import UsersDisplay from "../UsersDisplay";

const Kitchen = () => {
  const [kitchenRecipes, setKitchenRecipes] = useState([]);

  const { id } = useParams();

  const getKitchenRecipes = async () => {
    const response = await axios.get(`/v1/kitchen/${id}/recipes`);
    const { recipes } = response.data;
    setKitchenRecipes(recipes);
  };
  //   This useEffect will recall 'recipes' any time the 'id' changes in the routes parameters
  useEffect(() => {
    getKitchenRecipes(id);
  }, [id]);

  return (
    // This container will hold the Welcome header, the recipe list, the users in the kitchen, and the add recipe button;
    <Grid container direction="column"
    justifyContent="space-around">
      {/* 1 of 3 items in PARENT container */}
      {/* Kitchen Header */}
      <Grid item>
        <Paper>
          <Typography variant="h6" fontWeight="bold">
            Welcome to the Kitchen!
          </Typography>
        </Paper>
      </Grid>

      {/* 2 of 3 items in PARENT container */}
      {/* Child Container to hold Recipe list and Users */}
      <Grid item>
        <Paper>
          <Grid
            container
            justifyContent="space-evenly"
            alignItems="center"
          >
            {/*  1 of 2 items in CHILD container*/}
            {/* Recipe Display */}
            <Grid item xs={9}>
              {kitchenRecipes ? (
                <RecipesDisplay recipeList={kitchenRecipes} />
              ) : (
                <Typography variant="h6">Fetching Recipes!</Typography>
              )}
            </Grid>
            {/*  2 of 2 items in CHILD container*/}
            {/* UsersDisplay */}
            <Grid item width="20%">
              <Paper>
                <UsersDisplay kitchenId={id}/>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {/* 3 of 3 items in PARENT container */}
      <Grid item>
        {/* Add Recipes to Kitchen */}
        <Button variant="contained">ADD RECIPES TO THIS KITCHEN</Button>
      </Grid>
    </Grid>
  );
};

export default Kitchen;
