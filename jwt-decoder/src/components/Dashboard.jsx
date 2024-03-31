import * as React from "react";
import { Grid } from "@mui/material";
import Encoded from "./Encoded";
import Decoded from "./Decoded";
import { useState } from "react";
import { decodeJwt, encodeJwt, getDefaultJwt } from "../utils/JwtUtils";

export default function Dashboard() {
  const defaultJwt = getDefaultJwt();
  const defaultDecodedJwt = decodeJwt(defaultJwt);
  const [jwt, setJwt] = useState(defaultJwt);
  const [decodedJwt, setDecodedJwt] = useState(defaultDecodedJwt);

  const updateJwt = (newJwt) => {
    setJwt(newJwt);
    setDecodedJwt(decodeJwt(newJwt));
  };

  const updateData = (newData) => {
    setDecodedJwt(newData);
    setJwt(encodeJwt(newData, "secret"));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Encoded spacing={2} jwt={jwt} updateJwt={updateJwt} />
      </Grid>

      <Grid item xs={6}>
        <Decoded spacing={2} decodedJwt={decodedJwt} updateData={updateData} />
      </Grid>
    </Grid>
  );
}
