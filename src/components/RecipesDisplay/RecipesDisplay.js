import {
  Card,
  CardMedia,
  Typography,
  CardContent,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import "./RecipesDisplay.css";
import { useState, useEffect } from "react";
import axios from "axios";

const RecipesDisplay = ({ recipeList, refetchRecipes }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

  useEffect(() => {
    const getCategories = async () => {
      const response = await axios.get("http://localhost:4001/v1/categories");
      setCategories(response.data);
    };
    getCategories();
  }, []);

  const handleChange = (e) => {
    const newStateValue = e.target.value === "All" ? null : e.target.value;
    setSelectedCategory(newStateValue);
    refetchRecipes(newStateValue);
  };

  return (
    <div className="recipes-display">
      <div className="category">
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="select-label" shrink>
            Category
          </InputLabel>
          <Select
            onChange={handleChange}
            label="Category"
            displayEmpty
            value={selectedCategory}
          >
            <MenuItem value={null}>
              <em>All</em>
            </MenuItem>
            {categories.map((category) => (
              <MenuItem value={category.id}>{category.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        {recipeList.map((recipe) => (
          <Grid item xs={6} md={4} key={recipe.id}>
            <Card className="recipe-card">
              <Typography variant="h6">{recipe.title}</Typography>
              <CardMedia
                height="160"
                component="img"
                image={recipe.image_url}
                style={{ objectFit: "cover", width: "100%" }}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {recipe.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default RecipesDisplay;
