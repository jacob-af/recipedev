import React, { Fragment } from "react";
import { Container, Fab } from "@mui/material";
import { userData, recipeData } from "../../state/User";
import Navbar from "./NavBar";
import BottomNavBar from "./BottomNavBar";
import Build from "./Build";
import { Link as RouterLink } from "react-router-dom";

function RecipeList(props) {
  const recipeStack = recipeData();
  return (
    <Fragment>
      <Navbar />
      <Container sx={{ mt: 2, overflow: "auto", maxHeight: 400 }}>
        <Fab
          component={RouterLink}
          to="/addrecipe"
          sx={{ position: "absolute", top: 45, right: -15 }}
        >
          +
        </Fab>

        {recipeStack.map(b => {
          return <Build recipe={b} key={b.recipeId} />;
        })}
      </Container>
      <BottomNavBar />
    </Fragment>
  );
}

export default RecipeList;
