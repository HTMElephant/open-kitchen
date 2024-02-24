import { useState } from "react";
import axios from "axios";
import AppContext from "../../context/AppContext";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Typography,
  Table,
  TableHead,
  Grid,
  Button,
} from "@mui/material";
import IngredientTableRow from "../IngredientTableRow/IngredientTableRow";

const RecipeModal = ({ open, close }) => {
  const [recipeName, setRecipeName] = useState();
  const [recipeImageUrl, setRecipeImageUrl] = useState();
  const [recipeDescription, setRecipeDescription] = useState();
  const [recipeDirections, setDirections] = useState();
  const [newIngredients, setNewIngredients] = useState([{}]);

  const saveRecipe = async () => {
    await axios.post(`http://localhost:4001/v1/recipes`, {
      title: recipeName,
      ingredients: [...newIngredients],
      image_url: recipeImageUrl,
      directions: recipeDirections,
      description: recipeDescription,
      is_private: false,
      category_id: 1,
    });

    close();
    setRecipeName("");
    setNewIngredients([]);
  };

  const addNewIngredient = () => {
    setNewIngredients((previousIngredients) => {
      return [...previousIngredients, { name: "", unit: "", measurement: "" }];
    });
  };

  const handleName = (event) => {
    setRecipeName(event.target.value);
  };

  const handleImageUrl = (event) => {
    setRecipeImageUrl(event.target.value);
  };

  const handleDescription = (event) => {
    setRecipeDescription(event.target.value);
  };

  const handleDirections = (event) => {
    setDirections(event.target.value);
  };

  return (
    <Dialog open={open} onClose={close}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <DialogTitle align="center">Create Recipe</DialogTitle>
        </Grid>
        <Grid item>
          <DialogContent>
            <Grid item margin="10px">
              <TextField
                sx={{ width: "35ch" }}
                onChange={handleName}
                label="Recipe Name"
                variant="outlined"
                value={recipeName}
              />
            </Grid>
            <Grid item margin="10px">
              <TextField
                sx={{ width: "35ch" }}
                onChange={handleImageUrl}
                label="Recipe Image Url"
                variant="outlined"
                value={recipeImageUrl}
              />
            </Grid>
            <Grid item margin="10px">
              <TextField
                sx={{ width: "35ch" }}
                onChange={handleDescription}
                label="Description"
                multiline
                rows={4}
                value={recipeDescription}
              />
            </Grid>
            <Grid item margin="10px">
              <TextField
                sx={{ width: "35ch" }}
                onChange={handleDirections}
                label="Directions"
                multiline
                rows={4}
                value={recipeDirections}
              />
            </Grid>
            <Grid item>
              <Typography sx={{ marginTop: 3 }} variant="h6" align="center">
                Ingredients
              </Typography>
            </Grid>
            <Grid item>
              <Table>
                <TableHead>
                  {newIngredients.map((ingredient, index) => (
                    <IngredientTableRow
                      key={index}
                      name={ingredient.name}
                      unit={ingredient.unit}
                      measurement={ingredient.measurement}
                      setNewIngredients={setNewIngredients}
                      index={index}
                    />
                  ))}
                </TableHead>
              </Table>
            </Grid>
            <Grid item>
              <Button onClick={addNewIngredient}>Add Ingredient</Button>
            </Grid>
          </DialogContent>
        </Grid>
        <Grid item>
          <DialogActions>
            <Button onClick={close}>Cancel</Button>
            <Button onClick={saveRecipe}>Save Recipe</Button>
          </DialogActions>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default RecipeModal;
