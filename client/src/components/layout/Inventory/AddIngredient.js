import React, { Fragment } from "react";
import {
  Container,
  Fab,
  Button,
  Typography,
  Box,
  Grid,
  TextField,
  Autocomplete
  //Checkbox
} from "@mui/material";
import Navbar from "../NavBar";
import BottomNavBar from "../BottomNavBar";
import { useMutation, useReactiveVar } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { newIngredient, genericIngredients } from "../../../state/User";
import { ADD_SPEC_ING } from "../../../reducers/mutations";

function AddIngredient(props) {
  //const ingredient = useReactiveVar(newIngredient);
  const [addIngredient] = useMutation(ADD_SPEC_ING);
  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();
    // console.log(touches);
    const formData = new FormData(event.currentTarget);
    const response = await addIngredient({
      variables: {
        name: formData.get("name"),
        amount: parseInt(formData.get("amount")),
        unit: formData.get("unit"),
        price: parseInt(formData.get("price")),
        source: formData.get("source"),
        description: formData.get("description"),
        genericIngredientId: newIngredient().id
      }
    });
    console.log(response);
    navigate("/inventory");
  };

  const handleIngredientChange = value => {
    console.log(value);
    newIngredient(value);
  };

  const genericIngredientInput = genericIngredients().map(ingredient => {
    return {
      ...ingredient,
      label: ingredient.name
    };
  });

  return (
    <Fragment>
      <Navbar />
      <Container sx={{ bgcolor: "#FFF", width: 1 }}>
        <Fab
          component={RouterLink}
          to="/recipe"
          sx={{ position: "absolute", top: 45, right: -15 }}
        >
          -
        </Fab>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            alignItems: "center"
          }}
        >
          <Box
            component="form"
            noValidate
            sx={{ mt: 2, overflow: "auto", height: 0.9 }}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Typography component="h1" variant="h5">
                New Ingredient
              </Typography>
              <Grid item xs={12}>
                <Autocomplete
                  required
                  disablePortal
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
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
                  renderInput={params => (
                    <TextField {...params} label="Base Ingredient" />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Ingredient Name"
                  name="name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="amount"
                  label="Amount"
                  name="amount"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="unit"
                  label="Unit"
                  name="unit"
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="price"
                  label="Price"
                  name="price"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="source"
                  label="Source"
                  name="source"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                />
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create Ingredient
              </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
      <BottomNavBar />
    </Fragment>
  );
}

export default AddIngredient;
