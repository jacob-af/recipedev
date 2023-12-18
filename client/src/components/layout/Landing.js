import React from "react";
import { Container, Box, Typography } from "@mui/material";

import Navbar from "./NavBar.js";
import BottomNavBar from "./BottomNavBar";
import { useQuery } from "@apollo/client";
import { LOAD_GENERIC } from "../../reducers/query.js";
import { ingredientTypes } from "../../state/User";

function Landing(props) {
  const { data, loading, error } = useQuery(LOAD_GENERIC);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  ingredientTypes(data.allIngredientTypes);

  return (
    <Container sx={{ px: 0, width: 1 }}>
      <Navbar />
      <Box sx={{ height: "100vh", bgcolor: "#080" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, textalign: "center" }}
        >
          Back Pocket
        </Typography>
      </Box>
      <BottomNavBar />
    </Container>
  );
}

export default Landing;
