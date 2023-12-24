import * as React from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Paper,
  Button,
  Collapse,
  Container,
  SvgIcon
} from "@mui/material/";
import { ExpandMore, ExpandLess } from "@mui/icons-material/";
import Build from "./Build";

function Recipe(props) {
  const { recipe } = props;
  const [viewDetail, setViewDetail] = React.useState(false);

  const handleChange = () => {
    setViewDetail(!viewDetail);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h6" variant="h6" color="black" align="center">
          {recipe.recipeName}
        </Typography>
        <Collapse in={viewDetail}>
          <Typography>{recipe.about} HIIIIII</Typography>
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
      </Paper>
    </Container>
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
