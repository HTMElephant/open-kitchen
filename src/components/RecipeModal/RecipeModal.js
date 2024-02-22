import React from "react";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Dialog
} from "@mui/material";

const RecipeModal = ({ recipeName, setRecipeName, open, closeModal }) => {
  const handleChange = (event) => {
    setRecipeName(event.target.value);
  };
  return (
    <Dialog open={open} close={closeModal}>
      <DialogTitle align="center">Create Recipe</DialogTitle>
      <DialogContent>
        <TextField
          onChange={handleChange}
          variant="outlined"
          label="Recipe"
        ></TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Cancel</Button>
        <Button>Save Recipe</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RecipeModal;
