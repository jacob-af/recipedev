import React, { Fragment } from "react";
import {
  Container,
  Fab,
  Button,
  Typography,
  Box,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import Navbar from "./NavBar";
import BottomNavBar from "./BottomNavBar";
import BuildInput from "./BuildInput";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

const ADD_RECIPE = gql`
  mutation AddRecipe(
    $name: String
    $origin: String
    $history: String
    $buildName: String
    $instructions: String
    $glassware: String
    $ice: String
    $touchArray: [TouchInput]
  ) {
    addRecipe(
      name: $name
      origin: $origin
      history: $history
      buildName: $buildName
      instructions: $instructions
      glassware: $glassware
      ice: $ice
      touchArray: $touchArray
    ) {
      id
    }
  }
`;

function AddRecipe(props) {
  const [addRecipe, response] = useMutation(ADD_RECIPE);
  console.log(response);
  const touchArray = [{}, {}];
  const navigate = useNavigate();
  const handleSubmit = async event => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await addRecipe({
      variables: {
        email: formData.get("email"),
        password: formData.get("password")
      }
    });
    console.log(response);
    navigate("/recipe");
  };
  return (
    <Fragment>
      <Navbar />
      <Container sx={{ bgcolor: "#FFF" }}>
        <Fab
          component={RouterLink}
          to="/recipe"
          sx={{ position: "absolute", top: 45, right: -15 }}
        >
          -
        </Fab>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Typography component="h1" variant="h5">
            New Build
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {touchArray.map((touch, index) => (
              <BuildInput key={index} {...props} />
            ))}

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Recipe
            </Button>
          </Box>
        </Box>
      </Container>
      <BottomNavBar />
    </Fragment>
  );
}

export default AddRecipe;
