import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Grid,
  MobileStepper,
  Paper,
  Typography,
  Button,
  Collapse,
  IconButton
} from "@mui/material";

import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useNavigate } from "react-router-dom";
import { newBuildInfo, newRecipeInfo, touches } from "../../../state/User";

export default function Build({ builds, viewDetail }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(prevActiveStep => {
      return prevActiveStep + 1 < builds.length ? prevActiveStep + 1 : 0;
    });
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => {
      return prevActiveStep === 0 ? builds.length - 1 : prevActiveStep - 1;
    });
  };

  const editBuild = () => {
    console.log(`edit time ${builds[activeStep].id}`);
    newRecipeInfo({
      recipeName: builds[activeStep].recipe.name,
      recipeId: builds[activeStep].recipe.id,
      about: builds[activeStep].recipe.about,
      buildName: builds[activeStep].buildName
    });
    newBuildInfo({
      buildId: builds[activeStep].id,
      ice: builds[activeStep].ice,
      glassware: builds[activeStep].glassware,
      instructions: builds[activeStep].instructions,
      notes: builds[activeStep].notes,
      permission: builds[activeStep].permission
    });
    touches(builds[activeStep].touch);
    navigate("/recipe/edit");
  };

  return (
    <Grid
      container
      sx={{
        alignItems: "center",
        width: 1,
        justifyContent: "center"
      }}
    >
      {builds.length === 1 ? (
        <React.Fragment>
          <Grid item xs={11}>
            <Typography align="center">
              {builds[activeStep].buildName}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={() => editBuild()}>
              <ModeEditIcon />
            </IconButton>
          </Grid>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Grid item xs={1}>
            <IconButton onClick={() => handleBack()}>
              <KeyboardArrowLeft />
            </IconButton>
          </Grid>
          <Grid item xs={9}>
            <Typography align="center">
              {builds[activeStep].buildName}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={() => editBuild()}>
              <ModeEditIcon />
            </IconButton>
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={() => handleNext()}>
              <KeyboardArrowRight />
            </IconButton>
          </Grid>
        </React.Fragment>
      )}

      {builds[activeStep].touch.map(touch => {
        return (
          <Grid item xs={6} key={touch.order}>
            <Typography
              align="center"
              variant="body1"
              gutterBottom
              key={touch.id}
            >
              {touch.amount} {touch.unit}{" "}
              {touch.ingredient === null
                ? touch.ingredientType.name
                : touch.ingredient.name}
            </Typography>
          </Grid>
        );
      })}
      <Collapse in={viewDetail}>
        <Typography>
          {"Instructions: "}
          {builds[activeStep].instructions}
        </Typography>
        <Typography>
          {"Glassware: "}
          {builds[activeStep].glassware}
          {"Ice "}
          {builds[activeStep].ice}
        </Typography>
      </Collapse>
    </Grid>
  );
}
