import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  MobileStepper,
  Paper,
  Typography,
  Button,
  Collapse
} from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

export default function Build({ builds, viewDetail }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = builds.length;

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

  return (
    <Box sx={{ alignItems: "center", width: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 20,
          pl: 2
        }}
      >
        <Typography align="center">{builds[activeStep].buildName}</Typography>
      </Paper>
      {builds.length === 1 ? (
        ""
      ) : (
        <Box sx={{ display: "block", width: 400 }}>
          <MobileStepper
            variant="dots"
            steps={maxSteps}
            activeStep={activeStep}
            sx={{ width: 400 }}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                //   disabled={activeStep === maxSteps - 1}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack}>
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
              </Button>
            }
          />
        </Box>
      )}
      <Box
        sx={{
          height: 100,
          width: 1,
          maxWidth: 400,
          p: 2,
          alignItems: "center"
        }}
      >
        {builds[activeStep].completeTouch.map(touch => {
          return (
            <Typography
              align="center"
              variant="body1"
              gutterBottom
              key={touch.id}
            >
              {touch.amount} {touch.unit}{" "}
              {touch.specificIngredientName === null
                ? touch.genericIngredientName
                : touch.specificIngredientName}
            </Typography>
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
      </Box>
    </Box>
  );
}
