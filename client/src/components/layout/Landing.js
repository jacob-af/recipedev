import React from "react";
import { Box } from "@mui/material";
import SideBar from "./SideBar.js";
import Navbar from "./NavBar.js";
import BottomNavBar from "./BottomNavBar";
import { useQuery } from "@apollo/client";
import { LOAD_ING } from "../../reducers/query.js";
import { ingredientTypes, ingredients } from "../../state/User";
import { Outlet } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Unstable_Grid2";

function Landing(props) {
  const { data, loading, error } = useQuery(LOAD_ING);
  const matches = useMediaQuery("(min-width:600px)");
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  ingredientTypes(data.allIngredientTypes);
  ingredients(
    [...data.allIngredients].sort((a, b) => (a.name < b.name ? -1 : 1))
  );

  return (
    <Grid container>
      <Navbar />
      <Grid item xs={0} s={2}>
        {matches ? <SideBar /> : <></>}
      </Grid>

      <Grid
        sx={{
          mt: 0,
          bgcolor: "red",
          height: 1,
          width: matches ? 0.6 : 1,
          float: "right"
        }}
      >
        <Outlet />
      </Grid>

      {matches ? <></> : <BottomNavBar />}
    </Grid>
  );
}

export default Landing;
