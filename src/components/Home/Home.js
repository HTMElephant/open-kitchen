import { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import RecipesDisplay from "../RecipesDisplay/RecipesDisplay";

const Home = () => {
  const [recipeList, setRecipeList] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      const response = await axios.get("http://localhost:4001/v1/recipes");
      setRecipeList(response.data);
    };
    getRecipes();
  }, []);

  const refetchRecipes = (categoryId) => {
    const getRecipes = async () => {
      const response = await axios.get("http://localhost:4001/v1/recipes", {
        params: {
          category_id: categoryId,
        },
      });
      setRecipeList(response.data);
    };
    getRecipes();
  };

  return (
    <div className="Home">
      <div className="list-component-title">Recipes You Should Try!</div>
      <RecipesDisplay recipeList={recipeList} refetchRecipes={refetchRecipes} />
    </div>
  );
};

export default Home;
