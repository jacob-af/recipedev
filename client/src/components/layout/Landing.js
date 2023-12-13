import React, { Fragment } from "react";
import { Container } from "@mui/material";

import Navbar from "./NavBar";
import BottomNavBar from "./BottomNavBar";
import { useQuery } from "@apollo/client";
import { LOAD_GENERIC } from "../../reducers/query.js";
import { genericIngredients } from "../../state/User";

function Landing(props) {
  const { data, loading, error } = useQuery(LOAD_GENERIC);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  genericIngredients(data.allGenericIngredients);

  return (
    <Fragment>
      <Navbar />
      <Container></Container>
      <BottomNavBar />
    </Fragment>
  );
}

export default Landing;
