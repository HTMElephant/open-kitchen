import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableRow,
  TableCell,
  TextField,
  Button,

} from "@mui/material";

const IngredientTableRow = ({
  name,
  unit,
  measurement,
  setNewIngredients,
  index,
}) => {
  const handleUpdate = (key, event) => {
    setNewIngredients((previousIngredients) => {
      previousIngredients[index][key] = event.target.value;
      return [...previousIngredients];
    });
  };

  const removeIngredient = () => {
    setNewIngredients((previousIngredients) => {
      previousIngredients.splice(index, 1);
      return [...previousIngredients];
    });
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <TextField
            onChange={(event) => handleUpdate("name", event)}
            value={name}
            label="Ingredient"
          ></TextField>
        </TableCell>

        <TableCell>
          <FormControl>
            <InputLabel>Unit</InputLabel>
            <Select
              sx={{ width: "10ch" }}
              label="Unit"
              value={unit}
              onChange={(event) => handleUpdate("unit", event)}
            >
              <MenuItem value={"qty"}>qty</MenuItem>
              <MenuItem value={"Cup"}>cup</MenuItem>
              <MenuItem value={"oz"}>oz</MenuItem>
              <MenuItem value={"lbs"}>lbs</MenuItem>
              <MenuItem value={"tsp"}>tsp</MenuItem>
              <MenuItem value={"tbsp"}>tbsp</MenuItem>
              <MenuItem value={"slices"}>slices</MenuItem>
            </Select>
          </FormControl>
        </TableCell>

        <TableCell>
          <FormControl>
            <TextField
              onChange={(event) => handleUpdate("measurement", event)}
              type="number"
              value={measurement}
              label="Measurement"
            ></TextField>
          </FormControl>
        </TableCell>

        <TableCell>
          <Button onClick={removeIngredient}>Delete</Button>
        </TableCell>
      </TableRow>
    </>
  );
};

export default IngredientTableRow;
