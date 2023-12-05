import * as React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

function MainFeaturedPost(props) {
  const { completeBuild } = props;

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
      {/* Increase the priority of the hero background image */}
      {/* {<img style={{ display: 'none' }} src={post.image} alt={post.imageText} />} */}
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
            <Typography component="h6" variant="h6" color="inherit">
              {completeBuild.recipeName}
            </Typography>
            <Typography variant="subtitle1">
              {completeBuild.buildName}
            </Typography>
            {completeBuild.completeTouch.map(touch => {
              console.log(touch);
              return (
                <Typography variant="body1" gutterBottom key={touch.id}>
                  {touch.amount} {touch.unit} {touch.specificIngredientName}
                </Typography>
              );
            })}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

MainFeaturedPost.propTypes = {
  completeBuild: PropTypes.shape({
    description: PropTypes.string,
    buildName: PropTypes.string,
    recipeName: PropTypes.string,
    linkText: PropTypes.string,
    title: PropTypes.string
  }).isRequired
};

export default MainFeaturedPost;
