import React from "react";
import { TextField, Grid, Autocomplete, Select, MenuItem } from "@mui/material";
import { genericIngredients } from "../../state/User";

function BuildInput(props) {
  const unit = "";
  const genericIngredientInput = genericIngredients().map(ingredient => {
    return {
      ...ingredient,
      label: ingredient.name
    };
  });
  return (
    <Grid container spacing={1}>
      <Grid item xs={3}>
        <TextField required fullWidth id="amount" name="amount" autoFocus />
      </Grid>
      <Grid item xs={3}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue="oz"
          value={unit}
          label="Age"
        >
          <MenuItem value={"ml"}>ml</MenuItem>
          <MenuItem value={"oz"}>oz</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={6}>
        <Autocomplete
          required
          disablePortal
          id="ingredient-1"
          options={
            !genericIngredientInput
              ? [{ label: "Loading...", id: 0 }]
              : genericIngredientInput
          }
          renderInput={params => <TextField {...params} label="Ingredient" />}
        />
      </Grid>
    </Grid>
  );
}

export default BuildInput;
