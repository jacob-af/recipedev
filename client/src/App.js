import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Fragment } from "react";
import { token } from "./state/User";
import Landing from "./components/layout/Landing";
import Recipe from "./components/layout/Recipe";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Alert from "./components/layout/Alert";

import PrivateRoute from "./components/routing/PrivateRoute.js";
import { Box } from "@mui/material";
import { css } from "@emotion/css";

function App() {
  return (
    <Router>
      gooober
      <Fragment>
        <Box
          className={css`
            height: 100vh;
            padding: 32px;
            background-color: #0b0a10;
            font-size: 24px;
            font-color: #D993AA
            &:hover {
              color: #D993AA;
            }
          `}
        >
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
            <Route
              exact
              path="/recipe"
              element={
                <PrivateRoute>
                  <Recipe />
                </PrivateRoute>
              }
            />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </Box>
      </Fragment>
    </Router>
  );
}

export default App;
