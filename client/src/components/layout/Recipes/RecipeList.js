import React from "react";
import { Container, Fab, Box } from "@mui/material";
import { recipeData } from "../../../state/User";
import Navbar from "../NavBar";
import BottomNavBar from "../BottomNavBar";
import Recipe from "./Recipe";
import { Link as RouterLink } from "react-router-dom";

function RecipeList(props) {
  // const structuredRecipes = useQuery(LOAD_BUILDS);
  // console.log(structuredRecipes);
  const recipeStack = recipeData();
  return (
    <Container
      sx={{ bgcolor: "#FFF", width: 1, display: "flex", alignItems: "center" }}
    >
      <Navbar />
      <Fab
        component={RouterLink}
        to="/addrecipe"
        sx={{ position: "absolute", top: 45, right: -15 }}
      >
        +
      </Fab>
      <Box sx={{ mt: 5, overflow: "auto", height: 0.9, maxHeight: 600 }}>
        {recipeStack.length > 0
          ? recipeStack.map(b => {
              return <Recipe recipe={b} key={b.recipeId} />;
            })
          : "you have no recipes"}
      </Box>
      <BottomNavBar />
    </Container>
  );
}

export default RecipeList;
