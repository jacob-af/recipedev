import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

// TODO remove, this demo shouldn't need to reset the theme.

export default function NavBar() {
  return (
    <Toolbar
      sx={{
        pr: "24px"
        // keep right padding when drawer closed
      }}
    >
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 0 }}
      >
        <MenuIcon />
      </IconButton>
      <Typography
        variant="h6"
        component="div"
        align="center"
        sx={{ flexGrow: 1 }}
      >
        Back Pocket
      </Typography>
      <Button color="inherit">Login</Button>
    </Toolbar>
  );
}
