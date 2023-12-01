import React, { Fragment } from "react";
import { Container, Fab } from "@mui/material";
import { userData } from "../../state/User";
import Navbar from "./NavBar";
import BottomNavBar from "./BottomNavBar";
import { css } from "@emotion/css";

function Recipe(props) {
  const { userName, build } = userData();
  console.log(build);
  return (
    <Fragment>
      <Navbar />
      <Container
        className={css`
          color: #333;
        `}
      >
        <Fab sx={{ position: "absolute", top: 45, right: -15 }}>+</Fab>
        <div>
          {build.map(b => {
            return <Container>{b.buildName}</Container>;
          })}
        </div>
      </Container>
      <BottomNavBar />
    </Fragment>
  );
}

export default Recipe;
