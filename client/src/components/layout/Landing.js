import React from "react";
import { Container, Box, Typography } from "@mui/material";
import SideBar from "./SideBar.js";
import Navbar from "./NavBar.js";
import BottomNavBar from "./BottomNavBar";
import { useQuery } from "@apollo/client";
import { LOAD_GENERIC } from "../../reducers/query.js";
import { ingredientTypes } from "../../state/User";
import { Outlet } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

function Landing(props) {
  const { data, loading, error } = useQuery(LOAD_GENERIC);
  const matches = useMediaQuery("(min-width:600px)");
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  ingredientTypes(data.allIngredientTypes);

  return (
    <Container sx={{ px: 0, width: 1 }}>
      <Navbar />
      {matches ? <SideBar /> : <BottomNavBar />}
      <Outlet />
    </Container>
  );
}

export default Landing;
