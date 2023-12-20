import React, { Fragment, useState } from "react";
import {
  Fab,
  Button,
  Typography,
  Box,
  Grid,
  TextField,
  Switch
  //Checkbox
} from "@mui/material";

import BuildInput from "./BuildInput";
import { useMutation, useReactiveVar } from "@apollo/client";
import { useNavigate } from "react-router-dom";
//import { Link as RouterLink } from "react-router-dom";
import { newBuild, blankBuild } from "../../../state/User";
import { ADD_RECIPE } from "../../../reducers/mutations";

function AddRecipe(props) {
  const touches = useReactiveVar(newBuild);
  const [addRecipe] = useMutation(ADD_RECIPE);
  const navigate = useNavigate();
  const [checked, setChecked] = useState(true);

  const handleChange = event => {
    console.log(checked);
    setChecked(event.target.checked);
    newBuild(blankBuild);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await addRecipe({
      variables: {
        name: formData.get("name"),
        origin: formData.get("origin"),
        history: formData.get("history"),
        buildName: formData.get("buildName"),
        instructions: formData.get("instructions"),
        glassware: formData.get("glassware"),
        ice: formData.get("ice"),
        touchArray: touches.map(touch => {
          return {
            order: touch.order,
            amount: touch.amount,
            unit: touch.unit,
            ingredientTypeId: touch.ingredientType.id,
            ingredientId: touch.ingredient.id ? touch.ingredient.id : null
          };
        })
      }
    });
    console.log(response);
    navigate("/recipe");
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

    newBuild(rec);
  };

  return (
    <Fragment>
      {/* <Fab
        component={RouterLink}
        to=".."
        sx={{ position: "absolute", top: 45, right: -15 }}
      >
        -
      </Fab> */}
      <Box
        sx={{
          display: "flex",
          bgcolor: "#FFF",
          width: 1,
          border: 2,
          borderColor: "#000",
          justifyContent: "center"
        }}
      >
        <Box
          sx={{
            display: "flex",
            // flexDirection: "column",
            height: 1,
            maxWidth: 400
          }}
        >
          <Box
            component="form"
            noValidate
            sx={{ mt: 2, overflow: "auto", height: 1 }}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={1}>
              <Grid item xs={4} sx={{ mt: 4 }}>
                <Typography component="h1" variant="h5">
                  New Build
                </Typography>
              </Grid>
              <Grid item xs={4} sx={{ mt: 4, justifyContent: "center" }}>
                <Switch
                  label="inventory toggle"
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <Typography component="h1" variant="caption">
                  {checked ? "Using Inventory" : "Using Ingredient Types"}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Recipe Name"
                  name="name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="origin"
                  label="Origin"
                  name="origin"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="history"
                  label="History"
                  name="history"
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="buildName"
                  label="Build Name"
                  name="buildName"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="glassware"
                  label="Glassware"
                  name="glassware"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField required fullWidth id="ice" label="Ice" name="ice" />
              </Grid>
              {touches.map((touch, index) => (
                <Grid item xs={12} key={index}>
                  <BuildInput
                    index={index}
                    touch={touch}
                    ingredientSelect={checked}
                  />
                </Grid>
              ))}

              <Fab onClick={addTouch}>-</Fab>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create Recipe
              </Button>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
}

export default AddRecipe;
