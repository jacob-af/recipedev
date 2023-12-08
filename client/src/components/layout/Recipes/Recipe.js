import * as React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Build from "./Build";

function Recipe(props) {
  const { recipe } = props;

  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: "grey.800",
        color: "#fff",
        mb: 4,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,.3)"
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: "relative",
              p: { xs: 3, md: 6 },
              pr: { md: 0 }
            }}
          >
            <Typography component="h6" variant="h6" color="white">
              {recipe.recipeName}
            </Typography>
            <Build builds={recipe.builds} />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

Recipe.propTypes = {
  recipe: PropTypes.shape({
    description: PropTypes.string,
    buildName: PropTypes.string,
    recipeName: PropTypes.string
  }).isRequired
};

export default Recipe;
