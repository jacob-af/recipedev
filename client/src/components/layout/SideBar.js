import { Box, Typography } from "@mui/material";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LiquorIcon from "@mui/icons-material/Liquor";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import { Link as RouterLink } from "react-router-dom";

function SideBar() {
  return (
    <Box
      sx={{
        position: "fixed",
        pt: 10,
        top: 0,
        left: 0,
        height: 1,
        width: 200,
        bgcolor: "#99e"
      }}
    >
      <Typography
        label="Home"
        component={RouterLink}
        to="/"
        icon={<HomeIcon />}
      >
        Home
      </Typography>
      <Typography
        label="RecipeBooks"
        component={RouterLink}
        to="/recipeBook"
        icon={<MenuBookIcon />}
      >
        Recipe Books
      </Typography>
      <Typography
        label="Recipes"
        component={RouterLink}
        to="/recipe"
        icon={<LocalBarIcon />}
      />
      <Typography
        label="Inventory"
        component={RouterLink}
        to="/inventory"
        icon={<LiquorIcon />}
      />
      <Typography
        label="Crew"
        component={RouterLink}
        to="/crew"
        icon={<GroupsIcon />}
      />
    </Box>
  );
}

export default SideBar;
