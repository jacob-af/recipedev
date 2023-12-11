import React, { Fragment } from "react";
import { Container } from "@mui/material";

import Navbar from "./NavBar";
import BottomNavBar from "./BottomNavBar";

function Landing(props) {
  return (
    <Fragment>
      <Navbar />
      <Container></Container>
      <BottomNavBar />
    </Fragment>
  );
}

export default Landing;
