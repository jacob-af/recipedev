import React, { Fragment } from "react";
import { Container, Fab } from "@mui/material";
import { userData } from "../../state/User";
import Navbar from "./NavBar";
import BottomNavBar from "./BottomNavBar";

function Landing(props) {
  const { userName, firstName, lastName, email } = userData();
  return (
    <Fragment>
      <Navbar />
      <Container>
        <Fab sx={{ position: "absolute", top: 45, right: -15 }}>+</Fab>
        booonm
      </Container>
      <BottomNavBar />
    </Fragment>
  );
}

export default Landing;
