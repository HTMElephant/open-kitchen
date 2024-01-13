import {
  Card,
  CardMedia,
  Typography,
  CardContent,
  Grid,
  Button,
} from "@mui/material";
import "./RecipesDisplay.css";

const RecipesDisplay = ({ recipeList }) => {
  return (
    <div className="recipes-display">
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
