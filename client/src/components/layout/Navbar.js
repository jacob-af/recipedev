import { createTheme } from "@mui/material/styles";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import { Outlet } from "react-router-dom";

// TODO remove, this demo shouldn't need to reset the theme.

export default function NavBar() {
  return (
    <Box sx={{ position: "static", flexGrow: 1, width: 1, zIndex: "tooltip" }}>
      <AppBar sx={{ bgcolor: "#000" }}>
        <Toolbar>
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
            alight="center"
            sx={{ flexGrow: 1 }}
          >
            Back Pocket
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
