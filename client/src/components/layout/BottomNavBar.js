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
  return (
    <Paper
      sx={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
      elevation={3}
      z-index={5}
    >
      <BottomNavigation
        showLabels
        // value={value}
        // onChange={(event, newValue) => {
        //   setValue(newValue);
        // }}
      >
        <BottomNavigationAction
          label="Home"
          component={RouterLink}
          to="/"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          label="RecipeBooks"
          component={RouterLink}
          to="/recipeBook"
          icon={<MenuBookIcon />}
        />
        <BottomNavigationAction
          label="Recipes"
          component={RouterLink}
          to="/recipe"
          icon={<LocalBarIcon />}
        />
        <BottomNavigationAction label="Inventory" icon={<LiquorIcon />} />
        <BottomNavigationAction label="Crew" icon={<GroupsIcon />} />
      </BottomNavigation>
    </Paper>
  );
}

export default BottomNavBar;