import * as React from "react";
import { FilledInput, FormControl, Grid, InputLabel } from "@mui/material";

export default function Decoded({ decodedJwt, updateData }) {
  const update = (header, payload, signature) => {
    try {
      updateData({
        header: JSON.parse(header),
        payload: JSON.parse(payload),
        signature: JSON.parse(signature),
      });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <FormControl fullWidth sx={{ m: 1 }} variant="filled">
          <InputLabel sx={{ color: "white" }}>Header</InputLabel>
          <FilledInput
            id="header-jwt"
            multiline={true}
            minRows={5}
            value={JSON.stringify(decodedJwt.header, null, 2)}
            onChange={(e) => {
              update({
                header: e.target.value,
                payload: JSON.stringify(decodedJwt.payload),
                signature: JSON.stringify(decodedJwt.signature),
              });
            }}
            inputProps={{ style: { color: "white" } }}
          />
        </FormControl>{" "}
      </Grid>
      <Grid item>
        <FormControl fullWidth sx={{ m: 1 }} variant="filled">
          <InputLabel sx={{ color: "white" }}>Payload</InputLabel>
          <FilledInput
            id="payload-jwt"
            multiline={true}
            minRows={10}
            value={JSON.stringify(decodedJwt.payload, null, 2)}
            onChange={(e) => {
              update({
                header: JSON.stringify(decodedJwt.header),
                payload: e.target.value,
                signature: JSON.stringify(decodedJwt.signature),
              });
            }}
            inputProps={{ style: { color: "white" } }}
          />
        </FormControl>{" "}
      </Grid>
      <Grid item>
        <FormControl fullWidth sx={{ m: 1 }} variant="filled">
          <InputLabel sx={{ color: "white" }}>Signature</InputLabel>
          <FilledInput
            id="singature-jwt"
            multiline={true}
            minRows={5}
            value={JSON.stringify(decodedJwt.signature, null, 2)}
            onChange={(e) => {
              update({
                header: JSON.stringify(decodedJwt.header),
                payload: JSON.stringify(decodedJwt.payload),
                signature: e.target.value,
              });
            }}
            inputProps={{ style: { color: "white" } }}
          />
        </FormControl>{" "}
      </Grid>
    </Grid>
  );
}
