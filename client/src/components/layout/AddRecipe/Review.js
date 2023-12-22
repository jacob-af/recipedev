import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { newBuildSpec, newBuildInfo } from "../../../state/User";

export default function Review() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {newBuildSpec().map(touch => (
          <ListItem key={touch.name} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={touch.ingredient.name}
              secondary={touch.amount}
            />
            <Typography variant="body2">{touch.unit}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $34.06
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}></Typography>
          <Typography gutterBottom></Typography>
          <Typography gutterBottom>{newBuildInfo.history}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            total cost
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
