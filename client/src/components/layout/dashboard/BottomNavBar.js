import React from "react";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LiquorIcon from "@mui/icons-material/Liquor";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import { Link as RouterLink } from "react-router-dom";

function BottomNavBar() {
  const [value, setValue] = React.useState("home");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: { sm: "none" }
      }}
      elevation={3}
    >
      <BottomNavigation
        value={value}
        onChange={handleChange}
        spacing={1}
        sx={{
          bgcolor: "#000",
          "&& .Mui-selected": {
            color: "orange"
          }
        }}
      >
        <BottomNavigationAction
          label="Home"
          value="home"
          width={20}
          component={RouterLink}
          to="/"
          icon={<HomeIcon />}
          sx={{
            color: "#FFF"
          }}
        />
        <BottomNavigationAction
          label="RecipeBooks"
          value="recipeBooks"
          component={RouterLink}
          to="/recipeBook"
          icon={<MenuBookIcon />}
          sx={{
            color: "#FFF",
            px: 0
          }}
        />
        <BottomNavigationAction
          label="Recipes"
          value="recipes"
          component={RouterLink}
          to="/recipe"
          icon={<LocalBarIcon />}
          sx={{
            color: "#FFF"
          }}
        />
        <BottomNavigationAction
          label="Inventory"
          value="inventory"
          component={RouterLink}
          to="/inventory"
          icon={<LiquorIcon />}
          sx={{
            color: "#FFF"
          }}
        />
        <BottomNavigationAction
          label="Crew"
          value="crew"
          component={RouterLink}
          to="/crew"
          icon={<GroupsIcon />}
          sx={{
            color: "#FFF"
          }}
        />
      </BottomNavigation>
    </Paper>
  );
}

export default BottomNavBar;
