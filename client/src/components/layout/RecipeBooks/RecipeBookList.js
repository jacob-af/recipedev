import React, { Fragment } from "react";
import { Container, Typography, Fab, Box, Grid } from "@mui/material";
import { recipeData, recipeBookData } from "../../../state/User";
import Navbar from "../NavBar";
import BottomNavBar from "../BottomNavBar";
import Recipe from "../Recipes/Recipe";
import { Link as RouterLink } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";

function RecipeBookList(props) {
  const recipeBookStack = recipeBookData();
  console.log(recipeBookStack);
  return (
    <Fragment>
      <Navbar />
      <Fab
        component={RouterLink}
        to="/addRecipeBook"
        sx={{ position: "absolute", top: 45, right: -15 }}
      >
        +
      </Fab>
      <Container sx={{ mt: 2, overflow: "auto", height: 0.9 }}>
        {recipeBookStack.map(b => {
          return (
            <Grid item md={6}>
              <Box
                sx={{
                  position: "relative",
                  p: { xs: 3, md: 6 },
                  pr: { md: 0 }
                }}
              >
                <Typography variant="h4" color="white" key={b.id}>
                  {b.name}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Container>
      <BottomNavBar />
    </Fragment>
  );
}

export default RecipeBookList;
