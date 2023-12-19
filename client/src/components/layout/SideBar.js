import { Box, Grid } from "@mui/material";
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
        float: "left",
        pt: 0,
        m: 0,
        height: 0.9,
        witdh: 200,
        bgcolor: "#99e"
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Box label="Home" component={RouterLink} to="/">
            <HomeIcon />
            Home
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box label="Home" component={RouterLink} to="recipeBook">
            <MenuBookIcon />
            Recipe Books
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box label="Home" component={RouterLink} to="recipe">
            <LocalBarIcon />
            Recipes
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box label="Home" component={RouterLink} to="inventory">
            <LiquorIcon />
            Inventory
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box label="Home" component={RouterLink} to="crew">
            <GroupsIcon />
            Crew
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SideBar;
