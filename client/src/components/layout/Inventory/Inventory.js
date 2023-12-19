import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Fab, Box, Typography } from "@mui/material";

import { ingredients } from "../../../state/User";

function Inventory() {
  //   const { data, loading, error } = useQuery(LOAD_BUILDS, {
  //     variables: { userId: userData().id }
  //   });
  //   if (loading) return "Loading...";
  //   if (error) return `Error! ${error.message}`;
  //   buildData(data.completeBuild);
  //   recipeData(data.completeBuild.reduce(restructure, []));

  return (
    <Container
      sx={{ bgcolor: "#FFF", width: 1, display: "flex", alignItems: "center" }}
    >
      <Fab
        component={RouterLink}
        to="/addIngredient"
        sx={{ position: "absolute", top: 45, right: -15 }}
      >
        +
      </Fab>
      <Box sx={{ mt: 5, overflow: "auto", height: 0.9, maxHeight: 600 }}>
        {ingredients().map(ingredient => {
          return <Typography key={ingredient.id}>{ingredient.name}</Typography>;
        })}
      </Box>
    </Container>
  );
}

export default Inventory;
