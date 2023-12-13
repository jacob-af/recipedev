import * as React from "react";
import PropTypes from "prop-types";
import { Paper, Typography, Grid, Box, Button, Collapse } from "@mui/material/";
import { ExpandMore, ExpandLess } from "@mui/icons-material/";
import Build from "./Build";

function Recipe(props) {
  const { recipe } = props;
  const [viewDetail, setViewDetail] = React.useState(false);

  const handleChange = () => {
    setViewDetail(!viewDetail);
  };

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
            <Button onClick={handleChange}>
              {viewDetail ? <ExpandLess /> : <ExpandMore />}
            </Button>
            <Typography
              component="h6"
              variant="h6"
              color="white"
              align="center"
            >
              {recipe.recipeName}
            </Typography>
            <Collapse in={viewDetail}>
              <Typography>{recipe.history} HIIIIII</Typography>
            </Collapse>

            <Build builds={recipe.builds} viewDetail={viewDetail} />
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
