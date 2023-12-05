import React, { Fragment } from "react";
import { Container, Fab } from "@mui/material";
import { userData } from "../../state/User";
import Navbar from "./NavBar";
import BottomNavBar from "./BottomNavBar";
import Post from "./Post";
import { Link as RouterLink } from "react-router-dom";

function Recipe(props) {
  const { completeBuild } = userData();
  console.log(completeBuild);
  return (
    <Fragment>
      <Navbar />
      <Container>
        <Fab
          component={RouterLink}
          to="/addrecipe"
          sx={{ position: "absolute", top: 45, right: -15 }}
        >
          +
        </Fab>

        {completeBuild.map(b => {
          return <Post completeBuild={b} key={b.buildName} />;
        })}
      </Container>
      <BottomNavBar />
    </Fragment>
  );
}

export default Recipe;
