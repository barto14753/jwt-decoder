import * as React from "react";
import { useState, useEffect } from "react";
import { FilledInput, FormControl, Grid, InputLabel } from "@mui/material";

export default function Decoded({ decodedJwt, updateData }) {
  useEffect(() => {
    setHeader(JSON.stringify(decodedJwt.header, null, 2));
    setPayload(JSON.stringify(decodedJwt.payload, null, 2));
    setSignature(decodedJwt.signature);
  }, [decodedJwt]);

  const [header, setHeader] = useState(
    JSON.stringify(decodedJwt.header, null, 2)
  );
  const [payload, setPayload] = useState(
    JSON.stringify(decodedJwt.payload, null, 2)
  );
  const [signature, setSignature] = useState(decodedJwt.signature);

  const updateHeader = (header_) => {
    setHeader(header_);
    try {
      update(header_, payload, signature);
    } catch (e) {
      console.error(e);
    }
  };

  const updatePayload = (payload_) => {
    setPayload(payload_);
    try {
      update(header, payload_, signature);
    } catch (e) {
      console.error(e);
    }
  };

  const updateSignature = (signature_) => {
    setSignature(signature_);
    update(header, payload, signature_);
  };

  const update = (header_, payload_, signature_) => {
    try {
      payload_ = JSON.parse(payload_);
      header_ = JSON.parse(header_);
      updateData(header_, payload_);
    } catch (e) {
      console.error("Error updating data");
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
            value={header}
            onChange={(e) => {
              updateHeader(e.target.value);
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
            value={payload}
            onChange={(e) => {
              updatePayload(e.target.value);
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
            value={signature}
            onChange={(e) => {
              updateSignature(e.target.value);
            }}
            inputProps={{ style: { color: "white" } }}
          />
        </FormControl>{" "}
      </Grid>
    </Grid>
  );
}
