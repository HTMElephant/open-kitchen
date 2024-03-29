import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";
import {
  Button,
  Grid,
  Typography,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";

const Recipe = () => {
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();
  const { loggedInUser } = useContext(AppContext);
  useEffect(() => {
    const getRecipe = async (id) => {
      const response = await axios.get(`/v1/recipes/${id}`);
      setRecipe(response.data);
      console.log(response.data);
    };
    getRecipe(id);
  }, [id]);

  const isEditable = loggedInUser && recipe.user_id === loggedInUser.id;

  return (
    <Paper>
        <Grid container>
          <Grid
            container
            direction="column"
            padding="10px"
            justifyContent="center"
            alignItems="center"
            width="50%"
          >
            {/* Recipe title and description box. 1 of 2 items in grid container. */}

            {/* Recipe Title */}
            <Grid item>
              <Typography
                variant="h6"
                sx={{
                  mr: 2,
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
              <Typography variant="subtitle1">{recipe.description}</Typography>
            </Grid>
          </Grid>

          {/* Recipe Image and recipe metadata. 2 of 2 items in grid container. */}
          <Grid
            container
            direction="column"
            padding="10px"
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
                max-height="300px"
                width="75%"
              />
            </Grid>
            {/* Recipe Info */}
            <Grid item>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                padding="10px"
              >
                <Grid item>
                  <Typography variant="caption text" fontWeight="550">
                    {`Created By: ${recipe.username}`}
                  </Typography>
                </Grid>
                <Grid item>
                  <Button>
                    <Grid
                      container
                      justifyContent="center"
                      padding="5px"
                      alignItems="center"
                    >
                      <RestaurantIcon fontSize="medium"></RestaurantIcon>
                      <Typography variant="caption text" fontWeight="bold">
                        Fork This Recipe!
                      </Typography>
                    </Grid>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* Edit Button */}
          <Grid item container justifyContent="center">
            {isEditable ? (
              <Grid item>
                <Button>Edit</Button>
              </Grid>
            ) : null}
          </Grid>
        </Grid>
        {/* Ingredients Section */}
        <Grid item>
          <Paper elevation={4}>
            <Grid container direction="column" padding="10px" width="100%">
              <Grid item>
                <Typography variant="h6">Ingredients</Typography>
              </Grid>
              {recipe.ingredients ? (
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 200 }} aria-label="ingredients work">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="center">Measurement</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recipe.ingredients.map((ingredient) => (
                        <TableRow
                          key={ingredient.name}
                        >
                          <TableCell align="center">
                            {ingredient.name}
                          </TableCell>
                          <TableCell align="center">
                            {ingredient.Quantity}
                          </TableCell>
                          <TableCell align="center">
                            {ingredient.Measurement}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : null}
            </Grid>
          </Paper>
        </Grid>
        <Grid item paddingTop="10px">
          <Paper elevation={4}>
            <Grid container direction="column" padding="10px" width="100%">
              <Grid item>
                <Typography variant="h6">Directions</Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">{recipe.directions}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
    </Paper>
  );
};

export default Recipe;
