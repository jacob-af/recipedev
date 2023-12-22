import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

export default function BuildInstructions() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Instructions, etc.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id="glassware"
            label="Glassware"
            name="glassware"
            variant="standard"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id="ice"
            label="Ice"
            name="ice"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="instructions"
            label="Instructions"
            name="instructions"
            variant="standard"
            multiline
            rows={4}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
