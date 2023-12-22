import React from "react";
import {
  TextField,
  Grid,
  Autocomplete,
  Select,
  MenuItem,
  CssBaseline
} from "@mui/material";

function BuildInput({ options, index, touch, handleChange }) {
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
            handleChange(event.target.value, "amount", index);
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <Select
          variant="standard"
          value={touch.unit}
          onChange={event => {
            handleChange(event.target.value, "unit", index);
          }}
          label="Unit"
          name="unit"
          sx={{ width: 40 }}
          renderInput={value => <TextField value={value} variant="standard" />}
        >
          <MenuItem value={"ml"}>ml</MenuItem>
          <MenuItem value={"oz"}>oz</MenuItem>
          <MenuItem value={"L"}>L</MenuItem>
          <MenuItem value={"dsh"}>dsh</MenuItem>
        </Select>
        {/* </FormControl> */}
      </Grid>
      <Grid item xs={7}>
        <Autocomplete
          id="ingredient"
          required
          disablePortal
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(event, newValue) => {
            handleChange(newValue, "ingredient", index);
          }}
          options={options}
          getOptionLabel={option => option.name}
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
    </React.Fragment>
  );
}

export default BuildInput;
