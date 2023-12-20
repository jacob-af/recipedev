import React from "react";
import { Link as RouterLink, Outlet } from "react-router-dom";
import { Container, Fab, Box } from "@mui/material";
import Recipe from "./Recipe";
import { useQuery } from "@apollo/client";
import { LOAD_BUILDS } from "../../../reducers/query.js";
import { buildData, recipeData, userData } from "../../../state/User";
import { restructure } from "../../../utils.js";

function RecipeList() {
  const { data, loading, error } = useQuery(LOAD_BUILDS, {
    variables: { userId: userData().id }
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  buildData(data.completeBuild);
  recipeData(data.completeBuild.reduce(restructure, []));
  const recipeStack = recipeData();

  return (
    <Box
      sx={{
        bgcolor: "#000",
        border: 2,
        borderColor: "#FFF",
        height: 1,
        width: 1,
        maxWidth: 800,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      <Fab
        component={RouterLink}
        to="add"
        sx={{ position: "fixed", top: 45, right: -15 }}
      >
        +
      </Fab>

      {recipeStack.length > 0
        ? recipeStack.map(b => {
            return <Recipe recipe={b} key={b.recipeId} />;
          })
        : "you have no recipes"}

      <Outlet />
    </Box>
  );
}

export default RecipeList;
