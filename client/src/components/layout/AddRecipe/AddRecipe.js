import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RecipeSelect from "./RecipeSelect";
import BuildDetails from "./BuildDetails";
import BuildInstructions from "./BuildInstructions";
import Review from "./Review";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_RECIPE } from "../../../reducers/mutations";
import { newBuildSpec, newBuildInfo } from "../../../state/User";

const steps = ["", "Build Details", "Build Instructions", "Review"];

export default function Checkout() {
  const buildInfo = newBuildInfo();
  const [activeStep, setActiveStep] = React.useState(0);
  const [addRecipe] = useMutation(ADD_RECIPE);
  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();
    const response = await addRecipe({
      variables: {
        name: buildInfo.name,
        origin: buildInfo.origin,
        history: buildInfo.history,
        buildName: buildInfo.buildName,
        instructions: buildInfo.instructions,
        glassware: buildInfo.glassware,
        ice: buildInfo.ice,
        touchArray: newBuildSpec().map(touch => {
          return {
            order: touch.order,
            amount: touch.amount,
            unit: touch.unit,
            ingredientTypeId: touch.ingredientType.id,
            ingredientId: touch.ingredient.id ? touch.ingredient.id : null
          };
        })
      }
    });
    console.log(response);
    navigate("/recipe");
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <RecipeSelect handleChange={handleChange} />;
      case 1:
        return <BuildDetails />;
      case 2:
        return <BuildInstructions handleChange={handleChange} />;
      case 3:
        return <Review />;
      default:
        throw new Error("Unknown step");
    }
  }

  const handleChange = event => {
    event.preventDefault();
    console.log(event);
    const newInfo = {
      ...buildInfo,
      [event.target.name]: event.target.value
    };
    console.log(newInfo);
    newBuildInfo({ ...newInfo });
  };

  const handleNext = () => {
    if (activeStep < steps.length) {
      setActiveStep(activeStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <Container component="main" maxWidth="sm">
        <Typography variant="h6" gutterBottom textAlign="center">
          Create New Recipe
        </Typography>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="subtitle2" align="center">
            {steps[activeStep]}
          </Typography>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Save Build" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </React.Fragment>
  );
}
