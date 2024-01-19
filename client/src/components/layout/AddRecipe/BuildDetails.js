import React from "react";

import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import Fab from "@mui/material/Fab";

// import { useReactiveVar } from "@apollo/client";
// import {
//   newBuildSpec,
//   blankTouch,
//   ingredientTypes,
//   ingredients
// } from "../../../state/User";
import BuildInput from "../AddRecipe/BuildInput";

export default function BuildDetails({
  touches,
  options,
  checked,
  handleTouchChange,
  handleAddTouch,
  handleRemoveTouch,
  handleIngredientChange,
  handleOptionChange
}) {
  return (
    <React.Fragment>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item xs={12}>
          <Switch
            label="inventory toggle"
            checked={checked}
            onChange={() => handleOptionChange()}
          />
        </Grid>
        {touches.map((touch, index) => (
          <BuildInput
            key={`buildInput${touch.order}_${index}`}
            index={index}
            touch={touch}
            handleTouchChange={handleTouchChange}
            handleIngredientChange={handleIngredientChange}
            removeTouch={handleRemoveTouch}
            options={options}
            checked={checked}
          />
        ))}
        <Fab onClick={() => handleAddTouch()}>-</Fab>
      </Grid>
    </React.Fragment>
  );
}
