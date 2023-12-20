import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems, secondaryListItems } from "./listItems";
import { useQuery } from "@apollo/client";
import { LOAD_ING } from "../../reducers/query";
import { ingredients, ingredientTypes } from "../../state/User";

import { Outlet } from "react-router-dom";
import BottomNavBar from "./BottomNavBar";

function Copyright(props) {}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== "open"
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== "open"
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    [theme.breakpoints.up("sm")]: {
      position: "relative"
    },
    whiteSpace: "nowrap",
    width: drawerWidth,

    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(7),
      [theme.breakpoints.only("xs")]: {
        display: "none"
      },
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
        position: "relative"
      }
    })
  }
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme({});

export default function Dashboard() {
  const { data, loading, error } = useQuery(LOAD_ING);
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  ingredientTypes(data.allIngredientTypes);
  ingredients(
    [...data.allIngredients].sort((a, b) => (a.name < b.name ? -1 : 1))
  );

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex", height: 1 }}>
        <AppBar position="fixed" open={open}>
          <Toolbar
            sx={{
              pr: "0px",
              bgcolor: "#000"
              // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                ...(open && { display: "none" })
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              align="center"
              sx={{ flexGrow: 1 }}
            >
              Back Pocket
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              bgcolor: "#000",
              px: [1]
            }}
          >
            <IconButton onClick={toggleDrawer} sx={{ color: "#FFF" }}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          {/* <Divider /> */}
          <List
            component="nav"
            sx={{ bgcolor: "#000", color: "#FFF", height: 1 }}
          >
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: theme =>
              theme.palette.mode === "light"
                ? theme.palette.grey[900]
                : theme.palette.grey[900],
            flexGrow: 1,

            height: 1,
            overflow: "auto",
            justifyContent: "center"
          }}
        >
          <Toolbar />
          <Container
            maxWidth="lg"
            sx={{ mt: 4, justifyContent: "center", display: "flex" }}
          >
            <Outlet />
            <Copyright sx={{ pt: 4 }} />
          </Container>
          <BottomNavBar />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
