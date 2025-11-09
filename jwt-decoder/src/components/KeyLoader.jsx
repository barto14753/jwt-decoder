import * as React from "react";
import { useState } from "react";
import { 
	Box, 
	Button, 
	TextField, 
	Tab, 
	Tabs, 
	Typography, 
	Paper,
	Alert,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import LinkIcon from '@mui/icons-material/Link';
import KeyIcon from '@mui/icons-material/Key';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { 
	parseJWK, 
	parseCertificate, 
	convertCertificateToPublicKey,
	getDefaultKeys 
} from "../utils/JwtUtils";

function TabPanel({ children, value, index, ...other }) {
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					{children}
				</Box>
			)}
		</div>
	);
}

export default function KeyLoader({ onKeyLoad }) {
	const [tabValue, setTabValue] = useState(0);
	const [publicKeyText, setPublicKeyText] = useState("");
	const [jwkText, setJwkText] = useState("");
	const [jwksUrl, setJwksUrl] = useState("");
	const [certificateText, setCertificateText] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [showDefaultKeys, setShowDefaultKeys] = useState(false);

	const handleTabChange = (event, newValue) => {
		setTabValue(newValue);
		setError("");
		setSuccess("");
	};

	const handleLoadPublicKey = () => {
		try {
			if (!publicKeyText.trim()) {
				setError("Please enter a public key");
				return;
			}
			
			if (!publicKeyText.includes('-----BEGIN PUBLIC KEY-----')) {
				setError("Invalid public key format");
				return;
			}

			onKeyLoad({
				type: 'public-key',
				key: publicKeyText.trim()
			});
			
			setSuccess("Public key loaded successfully");
			setError("");
		} catch (err) {
			setError(err.message || "Error loading public key");
		}
	};

	const handleLoadJWK = () => {
		try {
			if (!jwkText.trim()) {
				setError("Please enter a JWK");
				return;
			}

			const jwk = parseJWK(jwkText);
			onKeyLoad({
				type: 'jwk',
				key: jwk
			});

			setSuccess("JWK loaded successfully");
			setError("");
		} catch (err) {
			setError(err.message || "Error loading JWK");
		}
	};

	const handleLoadJWKS = () => {
		try {
			if (!jwksUrl.trim()) {
				setError("Please enter a JWKS URL");
				return;
			}

			if (!jwksUrl.startsWith('http')) {
				setError("URL must start with http:// or https://");
				return;
			}

			onKeyLoad({
				type: 'jwks',
				key: jwksUrl.trim()
			});

			setSuccess("JWKS endpoint configured successfully");
			setError("");
		} catch (err) {
			setError(err.message || "Error configuring JWKS");
		}
	};

	const handleLoadCertificate = async () => {
		try {
			if (!certificateText.trim()) {
				setError("Please enter a certificate");
				return;
			}

			const cert = parseCertificate(certificateText);
			const publicKey = await convertCertificateToPublicKey(cert);
			
			onKeyLoad({
				type: 'certificate',
				key: publicKey,
				certificate: cert
			});

			setSuccess("Certificate loaded successfully");
			setError("");
		} catch (err) {
			setError(err.message || "Error loading certificate");
		}
	};

	const handleLoadDefaultKey = () => {
		try {
			const defaultKeys = getDefaultKeys();
			onKeyLoad({
				type: 'default',
				key: defaultKeys.publicKey,
				jwk: defaultKeys.jwk
			});

			setSuccess("Default key loaded successfully");
			setError("");
		} catch (err) {
			setError(err.message || "Error loading default key");
		}
	};

	const handleShowDefaultKeys = () => {
		setShowDefaultKeys(true);
	};

	const handleFileLoad = (event, setter) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setter(e.target.result);
			};
			reader.readAsText(file);
		}
	};

	const DefaultKeysDialog = () => {
		const defaultKeys = getDefaultKeys();
		
		return (
			<Dialog
				open={showDefaultKeys}
				onClose={() => setShowDefaultKeys(false)}
				maxWidth="md"
				fullWidth
			>
				<DialogTitle>Default Application Keys</DialogTitle>
				<DialogContent>
					<Box sx={{ mb: 3 }}>
						<Typography variant="h6" gutterBottom>
							Public Key (PEM format):
						</Typography>
						<TextField
							fullWidth
							multiline
							rows={8}
							variant="outlined"
							value={defaultKeys.publicKey}
							InputProps={{
								readOnly: true,
								style: { fontFamily: 'monospace', fontSize: '12px' }
							}}
							sx={{ mb: 2 }}
						/>
					</Box>
					
					<Box sx={{ mb: 3 }}>
						<Typography variant="h6" gutterBottom>
							JSON Web Key (JWK format):
						</Typography>
						<TextField
							fullWidth
							multiline
							rows={6}
							variant="outlined"
							value={JSON.stringify(defaultKeys.jwk, null, 2)}
							InputProps={{
								readOnly: true,
								style: { fontFamily: 'monospace', fontSize: '12px' }
							}}
						/>
					</Box>
					
					<Alert severity="warning" sx={{ mt: 2 }}>
						<Typography variant="body2">
							<strong>Security Notice:</strong> These keys are for demonstration purposes only. 
							In production, always use your own secure keys and never expose private keys.
						</Typography>
					</Alert>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setShowDefaultKeys(false)}>Close</Button>
				</DialogActions>
			</Dialog>
		);
	};

	return (
		<>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="key-loader-content"
					id="key-loader-header"
				>
					<KeyIcon sx={{ mr: 1 }} />
					<Typography variant="h6">
						JWT Verification Key Configuration
					</Typography>
				</AccordionSummary>
			<AccordionDetails>
				<Paper elevation={3} sx={{ p: 2 }}>
					{error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
					{success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
					
					<Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
						<Button 
							variant="contained" 
							color="secondary" 
							onClick={handleLoadDefaultKey}
						>
							Use Default Key
						</Button>
						<Button 
							variant="outlined" 
							startIcon={<VisibilityIcon />}
							onClick={handleShowDefaultKeys}
						>
							View Default Keys
						</Button>
					</Box>

					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<Tabs value={tabValue} onChange={handleTabChange}>
							<Tab label="Public Key" />
							<Tab label="JWK" />
							<Tab label="JWKS URL" />
							<Tab label="Certificate" />
						</Tabs>
					</Box>

					<TabPanel value={tabValue} index={0}>
						<Typography variant="body2" sx={{ mb: 2 }}>
							Enter a public key in PEM format:
						</Typography>
						<TextField
							fullWidth
							multiline
							rows={8}
							variant="outlined"
							value={publicKeyText}
							onChange={(e) => setPublicKeyText(e.target.value)}
							placeholder="-----BEGIN PUBLIC KEY-----&#10;...&#10;-----END PUBLIC KEY-----"
							sx={{ mb: 2 }}
						/>
						<Box sx={{ display: 'flex', gap: 1 }}>
							<Button
								variant="contained"
								component="label"
								startIcon={<UploadFileIcon />}
							>
								Load from File
								<input
									type="file"
									hidden
									accept=".pem,.crt,.key,.pub"
									onChange={(e) => handleFileLoad(e, setPublicKeyText)}
								/>
							</Button>
							<Button
								variant="contained"
								color="primary"
								onClick={handleLoadPublicKey}
							>
								Load Key
							</Button>
						</Box>
					</TabPanel>

					<TabPanel value={tabValue} index={1}>
						<Typography variant="body2" sx={{ mb: 2 }}>
							Enter a JWK in JSON format:
						</Typography>
						<TextField
							fullWidth
							multiline
							rows={8}
							variant="outlined"
							value={jwkText}
							onChange={(e) => setJwkText(e.target.value)}
							placeholder='{"kty": "RSA", "n": "...", "e": "AQAB", ...}'
							sx={{ mb: 2 }}
						/>
						<Box sx={{ display: 'flex', gap: 1 }}>
							<Button
								variant="contained"
								component="label"
								startIcon={<UploadFileIcon />}
							>
								Load from File
								<input
									type="file"
									hidden
									accept=".json,.jwk"
									onChange={(e) => handleFileLoad(e, setJwkText)}
								/>
							</Button>
							<Button
								variant="contained"
								color="primary"
								onClick={handleLoadJWK}
							>
								Load JWK
							</Button>
						</Box>
					</TabPanel>

					<TabPanel value={tabValue} index={2}>
						<Typography variant="body2" sx={{ mb: 2 }}>
							Enter a JWKS endpoint URL:
						</Typography>
						<TextField
							fullWidth
							variant="outlined"
							value={jwksUrl}
							onChange={(e) => setJwksUrl(e.target.value)}
							placeholder="https://example.com/.well-known/jwks.json"
							sx={{ mb: 2 }}
						/>
						<Button
							variant="contained"
							color="primary"
							startIcon={<LinkIcon />}
							onClick={handleLoadJWKS}
						>
							Configure JWKS
						</Button>
					</TabPanel>

					<TabPanel value={tabValue} index={3}>
						<Typography variant="body2" sx={{ mb: 2 }}>
							Enter an X.509 certificate in PEM format:
						</Typography>
						<TextField
							fullWidth
							multiline
							rows={8}
							variant="outlined"
							value={certificateText}
							onChange={(e) => setCertificateText(e.target.value)}
							placeholder="-----BEGIN CERTIFICATE-----&#10;...&#10;-----END CERTIFICATE-----"
							sx={{ mb: 2 }}
						/>
						<Box sx={{ display: 'flex', gap: 1 }}>
							<Button
								variant="contained"
								component="label"
								startIcon={<UploadFileIcon />}
							>
								Load from File
								<input
									type="file"
									hidden
									accept=".pem,.crt,.cer"
									onChange={(e) => handleFileLoad(e, setCertificateText)}
								/>
							</Button>
							<Button
								variant="contained"
								color="primary"
								onClick={handleLoadCertificate}
							>
								Load Certificate
							</Button>
						</Box>
					</TabPanel>
				</Paper>
			</AccordionDetails>
		</Accordion>
		<DefaultKeysDialog />
		</>
	);
}