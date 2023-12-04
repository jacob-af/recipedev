import React, { Fragment } from "react";
import { Container, Fab } from "@mui/material";
import { userData } from "../../state/User";
import Navbar from "./NavBar";
import BottomNavBar from "./BottomNavBar";
import { css } from "@emotion/css";
import Post from "./Post";

function Recipe(props) {
  const { completeBuild } = userData();
  console.log(completeBuild);
  return (
    <Fragment>
      <Navbar />
      <Container
        className={css`
          color: #333;
        `}
      >
        <Fab sx={{ position: "absolute", top: 45, right: -15 }}>+</Fab>

        {completeBuild.map(b => {
          return <Post completeBuild={b} key={completeBuild.id} />;
        })}
      </Container>
      <BottomNavBar />
    </Fragment>
  );
}

export default Recipe;
