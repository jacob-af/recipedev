import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Autocomplete } from "@mui/material";
// import { recipeData, newBuildInfo } from "../../../state/User";
// import { useReactiveVar } from "@apollo/client";

export default function RecipeSelect({
  handleRecipeChange,
  handleAboutChange,
  recipeInfo,
  recipeList
}) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom textAlign="center">
        Create New Drink Recipe
      </Typography>
      <Grid container spacing={3} alignItems="center" justifyContent={"center"}>
        <Grid item xs={12}>
          <Autocomplete
            required
            disablePortal
            freeSolo
            options={recipeList}
            value={recipeInfo || {}}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(event, newValue) => {
              handleRecipeChange(newValue);
            }}
            getOptionLabel={option =>
              option.recipeName ? option.recipeName : ""
            }
            renderInput={params => (
              <TextField {...params} label="Recipe Name" variant="standard" />
            )}
          />
        </Grid>
        {recipeInfo.new ? (
          <React.Fragment>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom textAlign="center">
                Please enter a brief description of your new cocktail:
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                defaultValue={recipeInfo.about}
                id="about"
                label="About"
                name="about"
                multiline
                rows={5}
                fullWidth
                variant="standard"
                onChange={e => handleAboutChange(e)}
              />
            </Grid>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom textAlign="center">
                A recipe with this name already exists: please give a name to
                your build:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="name"
                defaultValue={recipeInfo.buildName}
                label="New Build Name"
                name="buildName"
                fullWidth
                variant="standard"
                onChange={e => handleAboutChange(e)}
              />
            </Grid>
          </React.Fragment>
        )}
      </Grid>

      <Typography variant="h6" gutterBottom textAlign="center">
        Enter New Build for an Existing Cocktail
      </Typography>
    </React.Fragment>
  );
}
