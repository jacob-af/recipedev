import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

export default function Build({ builds }) {
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
    <Box sx={{ flexGrow: 1, alignItems: "center" }}>
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
      <Box sx={{ height: 100, maxWidth: 400, p: 2, alignItems: "center" }}>
        {builds[activeStep].completeTouch.map(touch => {
          return (
            <Typography variant="body1" gutterBottom key={touch.id}>
              {touch.amount} {touch.unit}{" "}
              {touch.specificIngredientName === null
                ? touch.genericIngredientName
                : touch.specificIngredientName}
            </Typography>
          );
        })}
      </Box>
      {builds.length === 1 ? (
        ""
      ) : (
        <MobileStepper
          variant="dots"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
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
      )}
    </Box>
  );
}
