import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";
import { Box, Button, Grid, Typography, Paper } from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";

const Recipe = () => {
  const [recipe, setRecipe] = useState({});
  const [isRecipeOpen, setIsRecipeOpen] = useState();
  const { id } = useParams();
  const { loggedInUser } = useContext(AppContext);
  useEffect(() => {
    const getRecipe = async (id) => {
      const response = await axios.get(`/v1/recipes/${id}`);
      console.log("Response.data", response.data);
      console.log("Logged in user", loggedInUser);
      setRecipe(response.data);
    };
    getRecipe(id);
  }, [id]);

  let recipe_user_id = recipe.user_id;
  let isEditable =
    loggedInUser && recipe_user_id === loggedInUser.id ? true : false;
  let recipe_user = recipe.user;

  return (
    <Paper>
      <Grid container direction="row" backgroundColor="red">
        <Grid
          container
          direction="column"
          padding="10px"
          justifyContent="center"
          alignItems="center"
          backgroundColor="blue"
          width="50%"
        >
          {/* Recipe title and description box. 1 of 2 items in grid container. */}

          {/* Recipe Title */}
          <Grid item>
            <Typography
              variant="h6"
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
              {`${recipe.title}`}
            </Typography>
          </Grid>
          {/* Recipe Description */}
          <Grid item>
            <Typography variant="subtitle1" component="a">
              {`This is currently 'recipe.description':  ${recipe.description}`}
            </Typography>
          </Grid>
        </Grid>

        {/* Recipe Image and recipe metadata. 2 of 2 items in grid container. */}
        <Grid
          container
          direction="column"
          padding="10px"
          backgroundColor="yellow"
          width="50%"
          justifyContent="center"
          alignItems="center"
        >
          {/* Recipe Img */}
          <Grid item>
            <img
              src={recipe.image_url}
              alt={`${recipe.title}`}
              id="recipe-image"
              height="75%"
              width="auto"
            ></img>
          </Grid>
          {/* Recipe Info */}
          <Grid
            container
            direction="row"
            backgroundColor="purple"
            justifyContent="center"
            alignItems="center"
            padding="10px"
          >
            <Grid item>
              <Typography variant="caption text" component="a">
                {`Created By UserID: ${recipe.user_id}`}
              </Typography>
            </Grid>
            <Grid
              container
              direction="row"
              backgroundColor="green"
              justifyContent="center"
              padding="10px"
              alignItems="center"
            >
              <RestaurantIcon fontSize="medium"></RestaurantIcon>
              <Typography variant="caption text" component="a">
                Fork This Recipe!
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* Edit Button */}
        <Grid item>{isEditable ? <Button>Edit</Button> : null}</Grid>
      </Grid>
      <Grid
        direction="column"
        padding="10px"
        backgroundColor="pink"
        width="100%"
      >
        <Grid item>
          <Typography variant="h6" component="a">
            Ingredients
          </Typography>
        </Grid>
        <Grid
          container
          direction="column"
          width="20%"
          justifyContent="space-evenly"
        >
          {recipe ? recipe.ingredients.map((ingredient) => {
            return (
              <Grid container
              direction="row"
              width="100%"
              justifyContent="space-evenly">
                {/* Some of the labels for each ingredient are capitalized. Check with kyle */}
                <Grid item>
                  <Typography variant="body1" component="a">
                    {`-${ingredient.name}`}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" component="a">
                    {ingredient.Quantity}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" component="a">
                    {ingredient.Measurement}
                  </Typography>
                </Grid>
              </Grid>
            );
          }) : (id)}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Recipe;
