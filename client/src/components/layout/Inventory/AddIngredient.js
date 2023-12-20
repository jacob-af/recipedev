import React from "react";
import {
  Container,
  Fab,
  Button,
  Typography,
  Box,
  Grid,
  TextField,
  Autocomplete
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { newIngredient, ingredientTypes } from "../../../state/User";
import { ADD_SPEC_ING } from "../../../reducers/mutations";

function AddIngredient(props) {
  //const ingredient = useReactiveVar(newIngredient);
  const [addIngredient] = useMutation(ADD_SPEC_ING);
  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(formData.get("name"));
    try {
      const response = await addIngredient({
        variables: {
          name: formData.get("name"),
          amount: parseInt(formData.get("amount")),
          unit: formData.get("unit"),
          price: parseInt(formData.get("price")),
          source: formData.get("source"),
          description: formData.get("description"),
          ingredientTypeId: newIngredient().id
        }
      });
      console.log(response);
      navigate("/inventory");
    } catch (err) {
      console.log(err);
    }
  };

  const handleIngredientChange = value => {
    console.log(value);
    newIngredient(value);
  };

  const ingredientTypeInput = ingredientTypes().map(ingredient => {
    return {
      ...ingredient,
      label: ingredient.name
    };
  });

  return (
    <Container sx={{ bgcolor: "#FFF", width: 1, maxWidth: 400 }}>
      <Fab
        component={RouterLink}
        to="/recipe"
        sx={{ position: "fixed", top: 45, right: -15 }}
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
          sx={{ mt: 4, overflow: "auto", height: 0.9 }}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            <Typography component="h1" variant="h5">
              New Ingredient
            </Typography>
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
              <Autocomplete
                required
                disablePortal
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(event, newValue) => {
                  handleIngredientChange(newValue);
                  console.log(newValue);
                }}
                id={`ingredient${props.index}`}
                options={
                  !ingredientTypeInput
                    ? [{ label: "Loading...", id: 0 }]
                    : ingredientTypeInput
                }
                renderInput={params => (
                  <TextField {...params} label="Ingredient Type" />
                )}
              />
            </Grid>
            <Grid item xs={7}>
              <TextField
                required
                fullWidth
                id="amount"
                label="Amount"
                name="amount"
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                required
                fullWidth
                id="unit"
                label="Unit"
                name="unit"
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                minRows={3}
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
              />
            </Grid>
            <Grid item xs={6}>
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
  );
}

export default AddIngredient;
