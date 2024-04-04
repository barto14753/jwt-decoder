import * as React from "react";
import { useState } from "react";
import { FilledInput, FormControl, Grid, InputLabel } from "@mui/material";

export default function Encoded({ jwt, updateJwt }) {
	const [data, setData] = useState(jwt);

	const updateData = (data_) => {
		setData(data_);
		try {
			updateJwt(data_);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<Grid container direction="column" spacing={2}>
			<Grid item>
				<FormControl fullWidth sx={{ m: 1 }} variant="filled">
					<InputLabel sx={{ color: "white" }}>JWT</InputLabel>
					<FilledInput
						id="encoded-jwt"
						multiline={true}
						minRows={15}
						value={data}
						onChange={(e) => updateData(e.target.value)}
						inputProps={{ style: { color: "white" } }}
					/>
				</FormControl>{" "}
			</Grid>
		</Grid>
	);
}
