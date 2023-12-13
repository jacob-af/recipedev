import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Fab, Box } from "@mui/material";
import Navbar from "../NavBar";
import BottomNavBar from "../BottomNavBar";
// import { useQuery } from "@apollo/client";
// import { LOAD_BUILDS } from "../../../reducers/query.js";
// import { buildData, recipeData, userData } from "../../../state/User";

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
      <Navbar />
      <Fab
        component={RouterLink}
        to="/addIngredient"
        sx={{ position: "absolute", top: 45, right: -15 }}
      >
        +
      </Fab>
      <Box sx={{ mt: 5, overflow: "auto", height: 0.9, maxHeight: 600 }}>
        HI
      </Box>
      <BottomNavBar />
    </Container>
  );
}

export default Inventory;
