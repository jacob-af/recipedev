import * as React from "react";
import PropTypes from "prop-types";
import { Typography, Box, Button, Collapse, SvgIcon } from "@mui/material/";
import { ExpandMore, ExpandLess } from "@mui/icons-material/";
import Build from "./Build";

function Recipe(props) {
  const { recipe } = props;
  const [viewDetail, setViewDetail] = React.useState(false);

  const handleChange = () => {
    setViewDetail(!viewDetail);
  };

  return (
    <Box
      sx={{
        width: 1,
        maxWidth: 700,
        justifyContent: "center",
        border: 2,
        bgcolor: "#888",
        borderColor: "silver",
        flexDirection: "column",
        p: 4,
        my: 2,
        mx: 2
      }}
    >
      <Typography component="h6" variant="h6" color="black" align="center">
        {recipe.recipeName}
      </Typography>
      <Collapse in={viewDetail}>
        <Typography>{recipe.history} HIIIIII</Typography>
      </Collapse>

      <Build builds={recipe.builds} viewDetail={viewDetail} />

      <Button
        onClick={handleChange}
        sx={{ width: 1, justifyContent: "center", height: 8 }}
      >
        <SvgIcon
          viewBox="0 0 40 40"
          width={1}
          preserveAspectRatio="none"
          sx={{ transform: "scale(18, 1.5)" }}
        >
          {viewDetail ? (
            <ExpandLess sx={{ color: "#000" }} />
          ) : (
            <ExpandMore sx={{ color: "#000" }} />
          )}
        </SvgIcon>
      </Button>
    </Box>
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
