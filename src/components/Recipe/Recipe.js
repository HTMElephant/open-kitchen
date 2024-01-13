import axios from "axios";
import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";
import { Button } from "@mui/material";

const Recipe = () => {
  const [recipe, setRecipe] = useState();
  const [isEditable, setIsEditable] = useState();
  const { id } = useParams();
  const { loggedInUser } = useContext(AppContext);

  const getRecipe = async (id) => {
    const response = await axios.get(`/v1/recipe/${id}`);
    setRecipe(response.data);
  };
  getRecipe(id);
  let recipe_user_id = recipe.user_id;
  if (loggedInUser) {
    recipe_user_id === loggedInUser.id
      ? setIsEditable(true)
      : setIsEditable(false);
  }
  return (
    <div>
      <h1>{`This is a Recipe with id: ${id}`}</h1>
      <Button visibility={isEditable}>Edit</Button>
    </div>
  );
};

export default Recipe;
