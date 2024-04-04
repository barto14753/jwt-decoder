import * as React from "react";
import { Alert, Grid, Stack } from "@mui/material";
import Encoded from "./Encoded";
import Decoded from "./Decoded";
import { useState } from "react";
import {
	decodeJwt,
	encodeJwt,
	getDefaultJwt,
	verifyJwt,
} from "../utils/JwtUtils";

export default function Dashboard() {
	const defaultJwt = getDefaultJwt();
	const defaultDecodedJwt = decodeJwt(defaultJwt);
	const [jwt, setJwt] = useState(defaultJwt);
	const [decodedJwt, setDecodedJwt] = useState(defaultDecodedJwt);

	const updateJwt = (newJwt) => {
		const newDecodedJwt = decodeJwt(newJwt);
		if (newDecodedJwt != null) {
			setJwt(newJwt);
			setDecodedJwt(newDecodedJwt);
		}
	};

	const updateData = (header, payload) => {
		const newJwt = encodeJwt(header, payload, "secret");
		const newDecodedJwt = decodeJwt(newJwt);
		setJwt(newJwt);
		setDecodedJwt(newDecodedJwt);
	};

	const jwtError = verifyJwt(jwt);
	const severity = jwtError ? "error" : "success";

	return (
		<>
			<Stack sx={{ width: "100%" }} spacing={2}>
				<Alert severity={severity}>{jwtError.message}</Alert>
			</Stack>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<Encoded spacing={2} jwt={jwt} updateJwt={updateJwt} />
				</Grid>

				<Grid item xs={6}>
					<Decoded
						spacing={2}
						decodedJwt={decodedJwt}
						updateData={updateData}
					/>
				</Grid>
			</Grid>
		</>
	);
}
