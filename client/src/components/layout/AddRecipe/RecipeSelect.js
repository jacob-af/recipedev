import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
//import FormControlLabel from "@mui/material/FormControlLabel";
//import Checkbox from "@mui/material/Checkbox";
import { Autocomplete, Divider } from "@mui/material";
import { recipeData, newBuildInfo } from "../../../state/User";

const addLabels = list => {
  return list.map(item => {
    return { ...item, label: item.recipeName };
  });
};

export default function RecipeSelect() {
  const recipeList = addLabels(recipeData());

  const handleRecipeChange = value => {
    console.log(value);
    newBuildInfo({
      ...newBuildInfo,
      recipeId: value.recipeId
    });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom textAlign="center">
        Create New Drink Recipe
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name"
            label="Recipe Name"
            name="name"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="history"
            label="Notes (optional)"
            name="history"
            multiline
            rows={4}
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid
          item
          xs={5}
          sx={{ justifyContent: "center", alignContent: "center" }}
        >
          <Divider sx={{ border: 1 }} />
        </Grid>
        <Grid
          item
          xs={2}
          sx={{ justifyContent: "center", alignContent: "center" }}
        >
          <Typography variant="subtitle1">Or</Typography>
        </Grid>
        <Grid
          item
          xs={5}
          sx={{ justifyContent: "center", alignContent: "center" }}
        >
          <Divider sx={{ border: 1 }} />
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom textAlign="center">
        Enter New Build for an Existing Cocktail
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Autocomplete
            required
            disablePortal
            options={recipeList}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(event, newValue) => {
              handleRecipeChange(newValue);
              console.log(newValue);
            }}
            renderInput={params => (
              <TextField {...params} label="Recipe Name" variant="standard" />
            )}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
