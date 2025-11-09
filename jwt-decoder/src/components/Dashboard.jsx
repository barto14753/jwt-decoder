import * as React from "react";
import { Grid, Container, Box, Typography, Paper, Divider } from "@mui/material";
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
import { CheckCircle, Error, Token, VpnKey } from "@mui/icons-material";

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

	const message = verificationKey 
		? (verificationResult ? `Verification failed: ${verificationResult.message}` : "JWT verified successfully")
		: (verificationResult ? `Verification failed: ${verificationResult.message}` : "JWT verified successfully (default secret)");

	const VerificationStatus = () => (
		<Paper 
			elevation={0}
			sx={{ 
				p: 3, 
				mb: 3, 
				background: verificationResult 
					? "linear-gradient(135deg, rgba(244, 67, 54, 0.1) 0%, rgba(244, 67, 54, 0.05) 100%)"
					: "linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%)",
				border: `1px solid ${verificationResult ? "rgba(244, 67, 54, 0.3)" : "rgba(76, 175, 80, 0.3)"}`,
				borderRadius: 2,
			}}
		>
			<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
				{verificationResult ? (
					<Error sx={{ color: "error.light", fontSize: "2rem" }} />
				) : (
					<CheckCircle sx={{ color: "success.light", fontSize: "2rem" }} />
				)}
				<Box sx={{ flex: 1 }}>
					<Typography 
						variant="h6" 
						sx={{ 
							color: verificationResult ? "error.light" : "success.light",
							fontWeight: 600,
							mb: 0.5,
						}}
					>
						{verificationResult ? "Verification Failed" : "Token Verified"}
					</Typography>
					<Typography variant="body2" sx={{ color: "text.secondary" }}>
						{message}
					</Typography>
				</Box>
				<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
					<VpnKey sx={{ color: "text.secondary", fontSize: "1.25rem" }} />
					<Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500 }}>
						{verificationKey ? verificationKey.type.toUpperCase() : "DEFAULT"}
					</Typography>
				</Box>
			</Box>
		</Paper>
	);

	return (
		<Container maxWidth="xl" sx={{ py: 4 }}>
			{/* Header Section */}
			<Box sx={{ mb: 4, textAlign: "center" }}>
				<Typography 
					variant="h4" 
					sx={{ 
						mb: 2,
						fontWeight: 700,
						background: "linear-gradient(135deg, #ffffff 0%, #b0b0b0 100%)",
						backgroundClip: "text",
						WebkitBackgroundClip: "text",
						WebkitTextFillColor: "transparent",
					}}
				>
					JWT Token Analysis
				</Typography>
				<Typography variant="body1" sx={{ color: "text.secondary", maxWidth: "600px", mx: "auto" }}>
					Decode, verify, and analyze JSON Web Tokens with advanced key management and real-time validation
				</Typography>
			</Box>

			{/* Key Management Section */}
			<Box sx={{ mb: 4 }}>
				<KeyLoader onKeyLoad={handleKeyLoad} />
			</Box>
			
			{/* Verification Status */}
			<VerificationStatus />
			
			{/* Main Content Grid */}
			<Grid container spacing={4}>
				<Grid item xs={12} lg={6}>
					<Paper 
						elevation={0}
						sx={{ 
							p: 3, 
							height: "fit-content",
							background: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)",
							border: "1px solid rgba(255, 255, 255, 0.1)",
							mb: { xs: 2, lg: 0 }, // Add margin bottom on mobile
						}}
					>
						<Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
							<Token sx={{ color: "primary.main", fontSize: "1.5rem" }} />
							<Typography variant="h6" sx={{ fontWeight: 600 }}>
								Encoded Token
							</Typography>
						</Box>
						<Divider sx={{ mb: 3, borderColor: "rgba(255, 255, 255, 0.1)" }} />
						<Encoded jwt={jwt} updateJwt={updateJwt} />
					</Paper>
				</Grid>

				<Grid item xs={12} lg={6}>
					<Paper 
						elevation={0}
						sx={{ 
							p: 3, 
							height: "fit-content",
							background: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)",
							border: "1px solid rgba(255, 255, 255, 0.1)",
						}}
					>
						<Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
							<Token sx={{ color: "secondary.main", fontSize: "1.5rem" }} />
							<Typography variant="h6" sx={{ fontWeight: 600 }}>
								Decoded Payload
							</Typography>
						</Box>
						<Divider sx={{ mb: 3, borderColor: "rgba(255, 255, 255, 0.1)" }} />
						<Decoded
							decodedJwt={decodedJwt}
							updateData={updateData}
						/>
					</Paper>
				</Grid>
			</Grid>
		</Container>
	);
}
