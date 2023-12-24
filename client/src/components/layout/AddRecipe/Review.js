import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { newBuildSpec, newBuildInfo } from "../../../state/User";
import { useReactiveVar } from "@apollo/client";
import zIndex from "@mui/material/styles/zIndex";

export default function Review({ recipeInfo, touches, buildInfo }) {
  // const buildSpec = useReactiveVar(newBuildSpec);
  // const buildInfo = useReactiveVar(newBuildInfo);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        {recipeInfo.recipeName}
      </Typography>
      <Typography variant="h6" gutterBottom>
        {recipeInfo.buildName}
      </Typography>
      <Typography variant="body2" gutterBottom>
        {buildInfo.about}
      </Typography>
      <List disablePadding>
        {touches.map((touch, index) => (
          <ListItem key={`review${index}`} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={touch.ingredient.name}
              secondary={touch.unit}
            />
            <Typography variant="body2">{touch.amount}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Glassware" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {buildInfo.glassware}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Ice" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {buildInfo.ice}
          </Typography>
        </ListItem>
        <ListItemText
          primary="Instructions"
          secondary={buildInfo.instructions}
        />
      </List>
      <Grid item container direction="column" xs={12} sm={6}>
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          total cost
        </Typography>
      </Grid>
    </React.Fragment>
  );
}
