import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  token,
  userData,
  buildData,
  recipeData,
  recipeBookData,
  genericIngredients
} from "../../state/User";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { LOAD_USER, LOAD_GENERIC } from "../../reducers/query.js";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

function restructure(accumulator, currentvalue) {
  const index = accumulator.findIndex(
    i => i.recipeId === currentvalue.recipeId
  );
  if (index === -1) {
    //console.log(currentvalue, "beep");
    accumulator.push({
      recipeId: currentvalue.recipeId,
      recipeName: currentvalue.recipeName,
      builds: [currentvalue]
    });
  } else {
    accumulator[index].builds.push(currentvalue);
  }
  return accumulator;
}

export default function LogIn() {
  //console.log(data, loading, error);
  const [loadUser] = useMutation(LOAD_USER);
  const genericIngredientResponse = useQuery(LOAD_GENERIC);

  const navigate = useNavigate();
  // if (loading) return "Submitting...";
  // if (error) alertMessage(error);

  const handleSubmit = async event => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const { data } = await loadUser({
      variables: {
        email: formData.get("email"),
        password: formData.get("password")
      }
    });
    token(data.login.token);
    userData({
      id: data.login.user.id,
      firstName: data.login.user.firstName,
      lastName: data.login.user.lastName,
      userName: data.login.user.userName
    });
    buildData(data.login.user.completeBuild);
    recipeBookData(data.login.user.recipeBook);
    recipeData(data.login.user.completeBuild.reduce(restructure, []));
    genericIngredients(genericIngredientResponse.data.allGenericIngredients);

    navigate("/");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
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
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
