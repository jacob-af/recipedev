import React from "react";
import {
  TextField,
  Grid,
  Autocomplete,
  Select,
  MenuItem,
  FormControl,
  IconButton
} from "@mui/material";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
function BuildInput({
  options,
  index,
  touch,
  handleTouchChange,
  handleIngredientChange,
  removeTouch
}) {
  return (
    <React.Fragment>
      <Grid item xs={2}>
        <TextField
          required
          fullWidth
          key={index}
          defaultValue={touch.amount}
          name="amount"
          type="number"
          variant="standard"
          onChange={event => {
            handleTouchChange("amount", event.target.value, index);
          }}
          inputProps={{ step: ".25" }}
        />
      </Grid>
      <Grid item xs={2}>
        <FormControl>
          <Select
            variant="standard"
            value={touch.unit || ""}
            onChange={event => {
              handleTouchChange("unit", event.target.value, index);
            }}
            label="Unit"
            name="unit"
            sx={{ width: 60 }}
          >
            <MenuItem value={"ml"}>ml</MenuItem>
            <MenuItem value={"oz"}>oz</MenuItem>
            <MenuItem value={"L"}>L</MenuItem>
            <MenuItem value={"dsh"}>dsh</MenuItem>
          </Select>
        </FormControl>

        {/* </FormControl> */}
      </Grid>
      <Grid item xs={7}>
        <Autocomplete
          id="ingredient"
          required
          disablePortal
          options={options}
          value={touch.ingredient || {}}
          isOptionEqualToValue={(option, value) => option.id === value.id || {}}
          onChange={(event, newValue) => {
            handleIngredientChange(newValue, index);
          }}
          getOptionLabel={option => (option.name ? option.name : "")}
          renderInput={params => (
            <TextField
              {...params}
              name="ingredient"
              label="Ingredient"
              variant="standard"
            />
          )}
        />
      </Grid>
      <Grid item xs={1}>
        <IconButton onClick={() => removeTouch(index)}>
          <DoNotDisturbOnIcon />
        </IconButton>
      </Grid>
    </React.Fragment>
  );
}

export default BuildInput;
