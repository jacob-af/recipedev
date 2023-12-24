import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
// import Stepper from "@mui/material/Stepper";
// import Step from "@mui/material/Step";
// import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RecipeSelect from "./RecipeSelect";
import BuildDetails from "./BuildDetails";
import BuildInstructions from "./BuildInstructions";
import Review from "./Review";
import { useNavigate } from "react-router-dom";
import { useMutation, useReactiveVar } from "@apollo/client";
import { ADD_RECIPE, ADD_BUILD } from "../../../reducers/mutations";
import {
  newBuildSpec,
  newBuildInfo,
  blankTouch,
  recipeData,
  ingredientTypes,
  ingredients
} from "../../../state/User";
import {
  recipeChange,
  fieldChange,
  touchChange,
  ingredientChange
} from "./utils";

const steps = ["", "Build Details", "Build Instructions", "Review"];

export default function Checkout() {
  const recipeList = useReactiveVar(recipeData);

  const [recipeInfo, setRecipeInfo] = React.useState({
    recipeName: "",
    recipeId: "",
    about: "",
    buildName: ""
  });

  const [buildInfo, setBuildInfo] = React.useState({
    ice: "",
    glassware: "",
    instructions: "",
    notes: ""
  });

  const [touches, setTouches] = React.useState([blankTouch(0), blankTouch(1)]);

  const [options, setOptions] = React.useState(ingredients());

  const [ingredientOptions, setIngredientOptions] = React.useState(true);

  //const buildInfo = newBuildInfo();
  const [activeStep, setActiveStep] = React.useState(0);
  const [addRecipe] = useMutation(ADD_RECIPE);
  const [addBuild] = useMutation(ADD_BUILD);
  const navigate = useNavigate();

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <RecipeSelect
            handleRecipeChange={handleRecipeChange}
            handleAboutChange={handleFieldChange}
            recipeInfo={recipeInfo}
            recipeList={recipeList}
          />
        );
      case 1:
        return (
          <BuildDetails
            touches={touches}
            options={options}
            checked={ingredientOptions}
            handleTouchChange={handleTouchChange}
            handleAddTouch={handleAddTouch}
            handleRemoveTouch={handleRemoveTouch}
            handleIngredientChange={handleIngredientChange}
            handleOptionChange={handleIngredientOptionChange}
          />
        );
      case 2:
        return (
          <BuildInstructions
            handleChange={handleBuildChange}
            buildInfo={buildInfo}
          />
        );
      case 3:
        return (
          <Review
            recipeInfo={recipeInfo}
            touches={touches}
            buildInfo={buildInfo}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  const handleSubmit = async () => {
    if (recipeInfo.new) {
      const response = await addRecipe({
        variables: {
          name: recipeInfo.recipeName,
          about: recipeInfo.about,
          buildName: recipeInfo.buildName,
          instructions: buildInfo.instructions,
          glassware: buildInfo.glassware,
          ice: buildInfo.ice,
          notes: buildInfo.notes,
          touchArray: touches.map((touch, index) => {
            return {
              order: index,
              amount: touch.amount,
              unit: touch.unit,
              ingredientTypeId: ingredientOptions
                ? touch.ingredient.ingredientType.id
                : touch.ingredient.id,
              ingredientId: ingredientOptions ? touch.ingredient.id : null
            };
          })
        }
      });
      console.log(response);
    } else {
      const response = await addBuild({
        variables: {
          recipeId: recipeInfo.recipeId,
          about: recipeInfo.about,
          buildName: recipeInfo.buildName,
          instructions: buildInfo.instructions,
          glassware: buildInfo.glassware,
          ice: buildInfo.ice,
          notes: buildInfo.notes,
          touchArray: touches.map((touch, index) => {
            return {
              order: index,
              amount: touch.amount,
              unit: touch.unit,
              ingredientTypeId: ingredientOptions
                ? touch.ingredient.ingredientType.id
                : touch.ingredient.id,
              ingredientId: ingredientOptions ? touch.ingredient.id : null
            };
          })
        }
      });
      console.log(response);
    }

    navigate("/recipe");
  };

  const handleRecipeChange = value => {
    recipeChange(value, recipeList, setRecipeInfo);
  };

  const handleFieldChange = event => {
    event.preventDefault();
    fieldChange(
      event.target.name,
      event.target.value,
      recipeInfo,
      setRecipeInfo
    );
  };

  const handleBuildChange = event => {
    event.preventDefault();
    fieldChange(event.target.name, event.target.value, buildInfo, setBuildInfo);
  };

  const handleTouchChange = (field, value, index) => {
    touchChange(field, value, index, touches, setTouches);
  };

  const handleIngredientChange = (value, index) => {
    ingredientChange(value, index, touches, setTouches);
  };

  const handleIngredientOptionChange = () => {
    if (ingredientOptions) {
      const newTouches = touches.map(touch => {
        console.log(touch);
        return { ...touch, ingredient: touch.ingredient.ingredientType };
      });

      setTouches(newTouches);
      setOptions(ingredientTypes());
    } else {
      const newTouches = touches.map(touch => {
        return { ...touch, ingredient: {} };
      });
      setTouches(newTouches);
      setOptions(ingredients());
    }
    setIngredientOptions(!ingredientOptions);
  };

  const handleAddTouch = () => {
    const rec = [...touches, blankTouch(touches.length)];
    setTouches(rec);
  };

  const handleRemoveTouch = (index, touches, setTouches) => {
    touches.splice(index, 1);

    setTouches([...touches]);
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
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
