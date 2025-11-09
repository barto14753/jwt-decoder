import * as React from "react";
import { Alert, Grid, Stack } from "@mui/material";
import Encoded from "./Encoded";
import Decoded from "./Decoded";
import KeyLoader from "./KeyLoader";
import { useState, useCallback } from "react";
import {
	decodeJwt,
	encodeJwt,
	getDefaultJwt,
	verifyJwt,
	verifyJwtWithPublicKey,
	verifyJwtWithJWK,
	verifyJwtWithJWKS,
} from "../utils/JwtUtils";

export default function Dashboard() {
	const defaultJwt = getDefaultJwt();
	const defaultDecodedJwt = decodeJwt(defaultJwt);
	const [jwt, setJwt] = useState(defaultJwt);
	const [decodedJwt, setDecodedJwt] = useState(defaultDecodedJwt);
	const [verificationKey, setVerificationKey] = useState(null);
	const [verificationResult, setVerificationResult] = useState(null);

	const updateJwt = (newJwt) => {
		const newDecodedJwt = decodeJwt(newJwt);
		if (newDecodedJwt != null) {
			setJwt(newJwt);
			setDecodedJwt(newDecodedJwt);
			// Po zmianie JWT, sprawdź weryfikację
			performVerification(newJwt);
		}
	};

	const updateData = (header, payload) => {
		const newJwt = encodeJwt(header, payload, "secret");
		const newDecodedJwt = decodeJwt(newJwt);
		setJwt(newJwt);
		setDecodedJwt(newDecodedJwt);
		// Po zmianie danych, sprawdź weryfikację
		performVerification(newJwt);
	};

	const performVerification = useCallback(async (jwtString) => {
		if (!verificationKey) {
			// Fallback do domyślnej weryfikacji z sekretem
			const error = verifyJwt(jwtString);
			setVerificationResult(error);
			return;
		}

		try {
			let error = null;
			
			switch (verificationKey.type) {
				case 'public-key':
				case 'certificate':
				case 'default':
					error = verifyJwtWithPublicKey(jwtString, verificationKey.key);
					break;
				case 'jwk':
					error = await verifyJwtWithJWK(jwtString, verificationKey.key);
					break;
				case 'jwks':
					error = await verifyJwtWithJWKS(jwtString, verificationKey.key);
					break;
				default:
					error = verifyJwt(jwtString);
			}
			
			setVerificationResult(error);
		} catch (err) {
			setVerificationResult(err);
		}
	}, [verificationKey]);

	const handleKeyLoad = (keyData) => {
		setVerificationKey(keyData);
		// Po załadowaniu nowego klucza, sprawdź weryfikację obecnego JWT
		performVerification(jwt);
	};

	// Sprawdź weryfikację przy zmianie klucza lub JWT
	React.useEffect(() => {
		performVerification(jwt);
	}, [performVerification, jwt]);

	const severity = verificationResult ? "error" : "success";
	const message = verificationKey 
		? (verificationResult ? `Verification failed: ${verificationResult.message}` : "JWT verified successfully")
		: (verificationResult ? `Verification failed: ${verificationResult.message}` : "JWT verified successfully (default secret)");

	return (
		<>
			<KeyLoader onKeyLoad={handleKeyLoad} />
			
			<Stack sx={{ width: "100%", mt: 2 }} spacing={2}>
				<Alert severity={severity}>{message}</Alert>
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
