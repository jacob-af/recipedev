import React, { useState } from "react";

import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import Fab from "@mui/material/Fab";

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
      [field]: value
    };

    touches.splice(index, 1, newTouch);
    newBuildSpec(touches);
  };

  const removeTouch = index => {
    touches.splice(index, 1);
    console.log(touches);
    newBuildSpec([...touches]);
  };

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
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item xs={12}>
          <Switch
            label="inventory toggle"
            checked={checked}
            onChange={handleSetChange}
          />
        </Grid>
        {touches.map((touch, index) => (
          <BuildInput
            key={`buildInput${touch.order}_${index}`}
            index={index}
            touch={touch}
            handleChange={handleSpecChange}
            removeTouch={removeTouch}
            options={options}
          />
        ))}
        <Fab onClick={() => addTouch()}>-</Fab>
      </Grid>
    </React.Fragment>
  );
}
