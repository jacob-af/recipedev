import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { token, userData } from "../../state/User";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOAD_USER } from "../../reducers/query.js";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://jacobaf.com/">
        BackPocket BarBook
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function LogIn() {
  const [loadUser] = useMutation(LOAD_USER);
  const navigate = useNavigate();
  console.log("ding");
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

    navigate("/");
  };

  return (
    <Box
      sx={{
        height: 1,
        maxWidth: "xs",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexWrap: "wrap",

        flexDirection: "column"
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          bgcolor: "#bbb",
          maxWidth: 600,
          p: 5,
          borderRadius: 5,
          border: 2,
          alignItems: "center"
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "black" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, maxWidth: 400 }}
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
            variant="filled"
            color="success"
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
            variant="filled"
            sx={{ borderRadius: 4 }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, borderRadius: 5 }}
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
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Box>
    </Box>
  );
}
