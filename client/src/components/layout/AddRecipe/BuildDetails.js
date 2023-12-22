import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import Fab from "@mui/material/Fab";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useReactiveVar } from "@apollo/client";
import {
  newBuildSpec,
  blankBuild,
  ingredientTypes,
  ingredients
} from "../../../state/User";
import BuildInput from "../AddRecipe/BuildInput";

export default function BuildDetails() {
  const touches = useReactiveVar(newBuildSpec);
  const [checked, setChecked] = useState(true);
  const [options, setOptions] = useState(ingredients());

  const handleSetChange = event => {
    console.log(checked);
    newBuildSpec(blankBuild);
    if (checked) {
      setOptions(ingredientTypes());
    } else {
      setOptions(ingredients());
    }
    setChecked(event.target.checked);
  };

  const handleSpecChange = (value, field, index) => {
    const newTouch = {
      ...touches[index],
      order: index,
      [field]: value
    };
    const newArray = touches;
    console.log(newArray, newTouch);
    newArray.splice(index, 1, newTouch);
    console.log(newArray);
    newBuildSpec(newArray);
  };

  const handleInputValueChange = (index, value) => {};

  const addTouch = event => {
    const rec = [
      ...touches,
      {
        order: touches.length,
        ingredientType: {},
        ingredient: {},
        amount: 0,
        unit: "oz"
      }
    ];
    newBuildSpec(rec);
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Switch
            label="inventory toggle"
            checked={checked}
            onChange={handleSetChange}
          />
        </Grid>
        {touches.map((touch, index) => (
          <BuildInput
            key={`buildInput${index}${touch.amount}${touch.unit}${touch.ingredientid}`}
            index={index}
            touch={touch}
            handleChange={handleSpecChange}
            options={options}
            ingredientId={
              checked ? touch.ingredient.id : touch.ingredientType.id
            }
          />
        ))}
        <Fab onClick={addTouch}>-</Fab>
      </Grid>
    </React.Fragment>
  );
}
