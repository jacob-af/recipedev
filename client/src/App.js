import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Fragment } from "react";
import { token } from "./state/User";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Alert from "./components/layout/Alert";

import PrivateRoute from "./components/routing/PrivateRoute.js";
import Container from "@mui/material/Container";
import { BottomNavigation } from "@mui/material";
import { css } from "@emotion/css";

function App() {
  return (
    <Router>
      <Fragment>
        <Container
          className={css`
            padding: 32px;
            background-color: #eee;
            height: 100%;
            font-size: 24px;
            border-radius: 4px;
            &:hover {
              color: black;
            }
          `}
        >
          <Navbar />
          <Alert />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <PrivateRoute>
                  <Landing />
                </PrivateRoute>
              }
            />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </Container>
        <BottomNavigation
          showLabels
          // value={value}
          // onChange={(event, newValue) => {
          //   setValue(newValue);
          // }}
        ></BottomNavigation>
      </Fragment>
    </Router>
  );
}

export default App;
