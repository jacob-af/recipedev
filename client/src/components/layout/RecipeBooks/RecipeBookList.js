import React, { Fragment } from "react";
import { Container, Typography, Fab, Box, Grid } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { LOAD_BOOKS } from "../../../reducers/query.js";
import { recipeBookData, userData } from "../../../state/User";

function RecipeBookList(props) {
  const { data, loading, error } = useQuery(LOAD_BOOKS, {
    variables: { userId: userData().id }
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  recipeBookData(data.userRecipeBook);
  const recipeBookStack = recipeBookData();
  return (
    <Fragment>
      <Fab
        component={RouterLink}
        to="/addRecipeBook"
        sx={{ position: "absolute", top: 45, right: -15 }}
      >
        +
      </Fab>
      <Container sx={{ mt: 2, overflow: "auto", height: 0.9 }}>
        {recipeBookStack.map(b => {
          return (
            <Grid item md={6} key={b.id}>
              <Box
                sx={{
                  position: "relative",
                  p: { xs: 3, md: 6 },
                  pr: { md: 0 }
                }}
              >
                <Typography variant="h4" color="white" align="center">
                  {b.name}
                </Typography>
                {b.completeBuild.length > 0 ? (
                  <Typography color="white" align="center">
                    {" "}
                    {b.completeBuild[0].recipeName}{" "}
                  </Typography>
                ) : (
                  <Typography color="white" align="center">
                    {" "}
                    No Recipes{" "}
                  </Typography>
                )}
              </Box>
            </Grid>
          );
        })}
      </Container>
    </Fragment>
  );
}

export default RecipeBookList;
