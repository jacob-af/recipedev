import React from "react";
import {
  TextField,
  Grid,
  Autocomplete,
  Select,
  MenuItem,
  CssBaseline
} from "@mui/material";
import {
  ingredientTypes,
  ingredients,
  newBuildSpec
} from "../../../state/User";
import { useReactiveVar } from "@apollo/client";

const addLabels = list => {
  return list.map(item => {
    return { ...item, label: item.name };
  });
};

function BuildInput({ ingredientSelect, index, touch }) {
  const touches = useReactiveVar(newBuildSpec);

  const handleAmountChange = event => {
    const touchArray = touches.map((touch, i) => {
      if (i === index) {
        return {
          ...touch,
          amount: parseFloat(event.target.value)
        };
      }
      return touch;
    });
    newBuildSpec(touchArray);
  };
  const handleUnitChange = event => {
    const touchArray = touches.map((touch, i) => {
      if (i === index) {
        return {
          ...touch,
          unit: event.target.value
        };
      }
      return touch;
    });
    newBuildSpec(touchArray);
  };
  const handleIngredientChange = value => {
    const touchArray = newBuildSpec().map((touch, i) => {
      if (ingredientSelect) {
        if (i === index) {
          return {
            ...touch,
            ingredient: value,
            ingredientType: value.ingredientType
          };
        } else if (i === index) {
          return {
            ...touch,
            ingredientType: value
          };
        }
      }
      return touch;
    });
    newBuildSpec(touchArray);
  };

  const ingredientTypeInput = addLabels(ingredientTypes());
  const ingredientInput = addLabels(ingredients());

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
          value={touch.unit}
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
          freeSolo
          disablePortal
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(event, newValue) => {
            handleIngredientChange(newValue);
          }}
          id={`ingredient${index}`}
          options={ingredientSelect ? ingredientInput : ingredientTypeInput}
          renderInput={params => (
            <TextField {...params} label="Ingredient" variation="standat" />
          )}
        />
      </Grid>
    </Grid>
  );
}

export default BuildInput;
