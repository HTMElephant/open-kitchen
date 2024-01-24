import { Typography, Grid, Button, Paper } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipesDisplay from "../RecipesDisplay/RecipesDisplay";

const Kitchen = () => {
  const [kitchenRecipes, setKitchenRecipes] = useState();
  const { id } = useParams();

  const getKitchenRecipes = async (id) => {
    const response = await axios.get(`/v1/kitchen/${id}/recipes`);
    const recipes = response.data;
    setKitchenRecipes(recipes);
  };

  // invokes getKitchenREcipes only when there are no kitchenRecipes to begin with
  !kitchenRecipes ? getKitchenRecipes(id) : <></>;

  //   This useEffect will recall 'recipes' any time the 'id' changes in the routes parameters
  useEffect(() => {
    getKitchenRecipes(id);
  }, [id]);

  return (
    // This container will hold the Welcome header, the recipe list, the users in the kitchen, and the add recipe button;
    <Grid container direction="column">
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
            alignContent="center"
            padding="10px"
          >
            {/*  1 of 2 items in CHILD container*/}
            {/* Recipe Display */}
            <Grid item>
              {/* Put this in for the first typography 
                <RecipesDisplay  recipeList={kitchenRecipes}/> 
            */}
              {kitchenRecipes ? (
                // Replace with RecipesDisplay
                <Typography
                  variant="h6"
                  border="solid 3px black"
                >{`<RecipeDisplay recipeList={kitchenRecipes} />`}</Typography>
              ) : (
                <Typography variant="h6">Fetching Recipes!</Typography>
              )}
            </Grid>
            {/*  2 of 2 items in CHILD container*/}
            <Grid item>
              {/* UsersDisplay Component needs to be created and put here */}
              <Typography
                variant="h6"
                border="solid 3px black"
              >{`<UserDisplay />`}</Typography>
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
