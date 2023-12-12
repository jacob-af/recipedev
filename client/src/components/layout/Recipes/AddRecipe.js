import React, { Fragment } from "react";
import {
  Container,
  Fab,
  Button,
  Typography,
  Box,
  Grid,
  TextField
  //Checkbox
} from "@mui/material";
import Navbar from "../NavBar";
import BottomNavBar from "../BottomNavBar";
import BuildInput from "../BuildInput";
import { useMutation, gql, useReactiveVar } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { newRecipe } from "../../../state/User";

const ADD_RECIPE = gql`
  mutation AddRecipe(
    $name: String
    $origin: String
    $history: String
    $buildName: String
    $instructions: String
    $glassware: String
    $ice: String
    $touchArray: [TouchInput]
  ) {
    addRecipe(
      name: $name
      origin: $origin
      history: $history
      buildName: $buildName
      instructions: $instructions
      glassware: $glassware
      ice: $ice
      touchArray: $touchArray
    ) {
      recipe {
        id
        name
      }
    }
  }
`;

function AddRecipe(props) {
  const touches = useReactiveVar(newRecipe);
  const [addRecipe] = useMutation(ADD_RECIPE);
  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();
    // console.log(touches);
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
            genericIngredientId: touch.genericIngredient.id,
            specificIngredientId: touch.specificIngredient.id
              ? touch.specificIngredient.id
              : null
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
        genericIngredient: {},
        specificIngredient: {},
        amount: 0,
        unit: "oz"
      }
    ];

    newRecipe(rec);
  };

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
                New Build
              </Typography>
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
                  <BuildInput index={index} touch={touch} />
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
      </Container>
      <BottomNavBar />
    </Fragment>
  );
}

export default AddRecipe;