import React, { Fragment } from "react";
import { Container, Fab } from "@mui/material";
import { userData, recipeData } from "../../../state/User";
import Navbar from "../NavBar";
import BottomNavBar from "../BottomNavBar";
import Recipe from "./Recipe";
import { Link as RouterLink } from "react-router-dom";

function RecipeList(props) {
  const recipeStack = recipeData();
  return (
    <Fragment>
      <Navbar />
      <Fab
        component={RouterLink}
        to="/addrecipe"
        sx={{ position: "absolute", top: 45, right: -15 }}
      >
        +
      </Fab>
      <Container sx={{ mt: 2, overflow: "auto", height: 0.9 }}>
        {recipeStack.length > 0
          ? recipeStack.map(b => {
              return <Recipe recipe={b} key={b.recipeId} />;
            })
          : "you have no recipes"}
      </Container>
      <BottomNavBar />
    </Fragment>
  );
}

export default RecipeList;
