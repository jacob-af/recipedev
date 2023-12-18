import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Fragment } from "react";
import Landing from "./components/layout/Landing";
import RecipeList from "./components/layout/Recipes/RecipeList";
import RecipeBookList from "./components/layout/RecipeBooks/RecipeBookList";
import Inventory from "./components/layout/Inventory/Inventory";
import AddIngredient from "./components/layout/Inventory/AddIngredient.js";
import Crew from "./components/layout/Crew/Crew";
import AddRecipe from "./components/layout/Recipes/AddRecipe";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import PrivateRoute from "./components/routing/PrivateRoute.js";
import { Container } from "@mui/material";

function App() {
  return (
    <Container sx={{ bgcolor: "#333", height: "100vh", px: 0 }}>
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
          path="/recipeBook"
          element={
            <PrivateRoute>
              <RecipeBookList />
            </PrivateRoute>
          }
        />
        <Route
          path="recipe"
          element={
            <PrivateRoute>
              <RecipeList />
            </PrivateRoute>
          }
        />

        <Route
          exact
          path="/addrecipe"
          element={
            <PrivateRoute>
              <AddRecipe />
            </PrivateRoute>
          }
        />

        <Route
          exact
          path="/inventory"
          element={
            <PrivateRoute>
              <Inventory />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/addingredient"
          element={
            <PrivateRoute>
              <AddIngredient />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/crew"
          element={
            <PrivateRoute>
              <Crew />
            </PrivateRoute>
          }
        />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </Container>
  );
}

export default App;
