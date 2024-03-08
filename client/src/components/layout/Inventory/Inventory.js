import React from "react";
import { useQuery } from "@apollo/client";
import { Link as RouterLink } from "react-router-dom";
import { Container, Fab, Box, Typography } from "@mui/material";
import { LOAD_ING } from "../../../reducers/query";
import { ingredientTypes } from "../../../state/User";

function Inventory() {
  const { data, loading, error } = useQuery(LOAD_ING);
  //, {
  //     variables: { userId: userData().id }
  //   });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  ingredientTypes(data.allIngredientTypes);
  //   recipeData(data.completeBuild.reduce(restructure, []));

  return (
    <Container
      sx={{ bgcolor: "#FFF", width: 1, display: "flex", alignItems: "center" }}
    >
      <Fab
        component={RouterLink}
        to="/addIngredient"
        sx={{ position: "fixed", top: 45, right: -15 }}
      >
        +
      </Fab>
      <Box sx={{ mt: 5, overflow: "auto", height: 0.9, maxHeight: 600 }}>
        {ingredientTypes().map(ingredient => {
          return (
            <div>
              <Typography sx={{ color: "black" }} key={ingredient.id}>
                {ingredient.name}: {ingredient.description}
              </Typography>
            </div>
          );
        })}
      </Box>
    </Container>
  );
}

export default Inventory;
