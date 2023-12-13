import React from "react";
import {
  TextField,
  Grid,
  Autocomplete,
  Select,
  MenuItem,
  CssBaseline
} from "@mui/material";
import { genericIngredients, newRecipe } from "../../../state/User";
import { useReactiveVar } from "@apollo/client";

function BuildInput(props) {
  const touches = useReactiveVar(newRecipe);

  const handleAmountChange = event => {
    const touchArray = touches.map((touch, index) => {
      if (index === props.index) {
        return {
          ...touch,
          amount: parseFloat(event.target.value)
        };
      }
      return touch;
    });
    newRecipe(touchArray);
  };
  const handleUnitChange = event => {
    const touchArray = touches.map((touch, index) => {
      if (index === props.index) {
        return {
          ...touch,
          unit: event.target.value
        };
      }
      return touch;
    });
    newRecipe(touchArray);
  };

  const handleIngredientChange = value => {
    const touchArray = newRecipe().map((touch, index) => {
      if (index === props.index) {
        return {
          ...touch,
          genericIngredient: value
        };
      }
      return touch;
    });
    newRecipe(touchArray);
  };

  const genericIngredientInput = genericIngredients().map(ingredient => {
    return {
      ...ingredient,
      label: ingredient.name
    };
  });
  return (
    <Grid container spacing={1}>
      <CssBaseline />
      <Grid item xs={2}>
        <TextField
          required
          fullWidth
          id="amount"
          name="amount"
          type="number"
          onChange={handleAmountChange}
        />
      </Grid>
      <Grid item xs={3}>
        {/* <FormControl fullWidth> */}
        <Select
          id="outlined-basic"
          variant="outlined"
          value={props.touch.unit}
          onChange={handleUnitChange}
          label="Unit"
          name="unit"
          sx={{ width: 40 }}
        >
          <MenuItem value={"ml"}>ml</MenuItem>
          <MenuItem value={"oz"}>oz</MenuItem>
          <MenuItem value={"L"}>L</MenuItem>
          <MenuItem value={"dsh"}>dsh</MenuItem>
        </Select>
        {/* </FormControl> */}
      </Grid>
      <Grid item xs={6}>
        <Autocomplete
          required
          disablePortal
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(event, newValue) => {
            handleIngredientChange(newValue);
            console.log(newValue);
          }}
          id={`ingredient${props.index}`}
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
