import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
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
import NavBar from "./components/layout/NavBar.js";
import ErrorPage from "./components/routing/ErrorPage.js";
import Feed from "./components/layout/Feed/Feed.js";

function App() {
  return (
    <Container sx={{ bgcolor: "#333", height: "100vh", px: 0 }}>
      <Routes>
        <Route exact path="signup" element={<SignUp />} />
        <Route exact path="login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route element={<Landing />}>
            <Route index element={<Feed />} />
            <Route path="recipeBook" element={<RecipeBookList />} />
            <Route path="recipe">
              <Route index element={<RecipeList />} />
              <Route path="add" element={<AddRecipe />} />
            </Route>
            <Route exact path="inventory" element={<Inventory />} />
            <Route exact path="addingredient" element={<AddIngredient />} />
            <Route exact path="crew" element={<Crew />} />
          </Route>
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Container>
  );
}

export default App;
