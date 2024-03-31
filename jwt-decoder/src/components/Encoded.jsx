import * as React from "react";
import { FilledInput, FormControl, Grid, InputLabel } from "@mui/material";

export default function Encoded({ jwt, updateJwt }) {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <FormControl fullWidth sx={{ m: 1 }} variant="filled">
          <InputLabel sx={{ color: "white" }}>JWT</InputLabel>
          <FilledInput
            id="encoded-jwt"
            multiline={true}
            minRows={15}
            value={jwt}
            onChange={(e) => updateJwt(e.target.value)}
            inputProps={{ style: { color: "white" } }}
          />
        </FormControl>{" "}
      </Grid>
    </Grid>
  );
}
