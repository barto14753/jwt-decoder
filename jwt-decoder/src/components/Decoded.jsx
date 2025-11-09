import * as React from "react";
import { useState, useEffect } from "react";
import { 
	TextField, 
	Box, 
	Typography, 
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Chip,
	IconButton,
	Tooltip,
	InputAdornment,
	Divider
} from "@mui/material";
import { 
	ExpandMore, 
	ContentCopy, 
	Check, 
	AccountTree,
	DataObject,
	Security 
} from "@mui/icons-material";

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
	const [copiedStates, setCopiedStates] = useState({
		header: false,
		payload: false,
		signature: false
	});

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

	const handleCopy = async (content, type) => {
		try {
			await navigator.clipboard.writeText(content);
			setCopiedStates(prev => ({ ...prev, [type]: true }));
			setTimeout(() => {
				setCopiedStates(prev => ({ ...prev, [type]: false }));
			}, 2000);
		} catch (err) {
			console.error('Failed to copy to clipboard:', err);
		}
	};

	const getClaimsInfo = () => {
		try {
			const payloadObj = JSON.parse(payload);
			const claims = [];
			
			// Standard claims
			if (payloadObj.iss) claims.push({ label: 'Issuer', value: payloadObj.iss, key: 'iss' });
			if (payloadObj.sub) claims.push({ label: 'Subject', value: payloadObj.sub, key: 'sub' });
			if (payloadObj.aud) claims.push({ label: 'Audience', value: payloadObj.aud, key: 'aud' });
			if (payloadObj.exp) claims.push({ 
				label: 'Expires', 
				value: new Date(payloadObj.exp * 1000).toLocaleString(), 
				key: 'exp',
				raw: payloadObj.exp
			});
			if (payloadObj.iat) claims.push({ 
				label: 'Issued At', 
				value: new Date(payloadObj.iat * 1000).toLocaleString(), 
				key: 'iat',
				raw: payloadObj.iat
			});
			if (payloadObj.nbf) claims.push({ 
				label: 'Not Before', 
				value: new Date(payloadObj.nbf * 1000).toLocaleString(), 
				key: 'nbf',
				raw: payloadObj.nbf
			});
			
			return claims;
		} catch (e) {
			return [];
		}
	};

	const getAlgorithmInfo = () => {
		try {
			const headerObj = JSON.parse(header);
			return {
				algorithm: headerObj.alg || 'Unknown',
				type: headerObj.typ || 'Unknown',
				keyId: headerObj.kid || null
			};
		} catch (e) {
			return { algorithm: 'Unknown', type: 'Unknown', keyId: null };
		}
	};

	const claims = getClaimsInfo();
	const algorithmInfo = getAlgorithmInfo();

	const ClaimsOverview = () => (
		<Box sx={{ mb: 3, p: 2, backgroundColor: "rgba(0, 0, 0, 0.2)", borderRadius: 2 }}>
			<Typography variant="body2" sx={{ color: "text.secondary", mb: 2, fontWeight: 500 }}>
				Token Information:
			</Typography>
			
			<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
				<Chip 
					label={`Algorithm: ${algorithmInfo.algorithm}`}
					size="small"
					sx={{ backgroundColor: "rgba(255, 107, 53, 0.2)", color: "#ff6b35" }}
				/>
				<Chip 
					label={`Type: ${algorithmInfo.type}`}
					size="small"
					sx={{ backgroundColor: "rgba(0, 212, 170, 0.2)", color: "#00d4aa" }}
				/>
				{algorithmInfo.keyId && (
					<Chip 
						label={`Key ID: ${algorithmInfo.keyId}`}
						size="small"
						sx={{ backgroundColor: "rgba(156, 39, 176, 0.2)", color: "#9c27b0" }}
					/>
				)}
			</Box>

			{claims.length > 0 && (
				<>
					<Divider sx={{ my: 2 }} />
					<Typography variant="body2" sx={{ color: "text.secondary", mb: 1, fontWeight: 500 }}>
						Claims:
					</Typography>
					<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
						{claims.map((claim) => (
							<Box key={claim.key} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
								<Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500, minWidth: 80 }}>
									{claim.label}:
								</Typography>
								<Typography 
									variant="body2" 
									sx={{ 
										color: "text.primary",
										fontFamily: '"Fira Code", "Monaco", "Consolas", monospace',
										fontSize: "0.75rem",
										textAlign: "right",
										maxWidth: 200,
										overflow: "hidden",
										textOverflow: "ellipsis",
									}}
								>
									{claim.value}
								</Typography>
							</Box>
						))}
					</Box>
				</>
			)}
		</Box>
	);

	const CreateSection = (title, content, setter, icon, type, color) => (
		<Accordion 
			defaultExpanded={type === 'payload'}
			sx={{
				backgroundColor: "rgba(0, 0, 0, 0.1)",
				border: `1px solid rgba(${color}, 0.3)`,
				"&:before": { display: "none" },
				mb: 2,
			}}
		>
			<AccordionSummary
				expandIcon={<ExpandMore />}
				sx={{
					backgroundColor: `rgba(${color}, 0.05)`,
					"& .MuiAccordionSummary-content": {
						alignItems: "center",
					},
				}}
			>
				<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
					{icon}
					<Typography variant="h6" sx={{ fontWeight: 600 }}>
						{title}
					</Typography>
				</Box>
			</AccordionSummary>
			<AccordionDetails sx={{ p: 2 }}>
				<TextField
					fullWidth
					multiline
					rows={type === 'signature' ? 4 : 8}
					variant="outlined"
					value={content}
					onChange={(e) => setter(e.target.value)}
					placeholder={`Edit ${title.toLowerCase()}...`}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Tooltip title={copiedStates[type] ? "Copied!" : "Copy to clipboard"}>
									<IconButton
										onClick={() => handleCopy(content, type)}
										size="small"
										sx={{
											color: copiedStates[type] ? "success.main" : "text.secondary",
											"&:hover": {
												color: "primary.main",
												backgroundColor: "rgba(0, 212, 170, 0.08)",
											},
										}}
									>
										{copiedStates[type] ? <Check /> : <ContentCopy />}
									</IconButton>
								</Tooltip>
							</InputAdornment>
						),
						sx: {
							"& textarea": {
								fontFamily: '"Fira Code", "Monaco", "Consolas", monospace !important',
								fontSize: "0.875rem !important",
								lineHeight: "1.5 !important",
							},
						},
					}}
					sx={{
						"& .MuiOutlinedInput-root": {
							alignItems: "flex-start",
							"& textarea": {
								paddingTop: "16px !important",
							},
						},
					}}
				/>
			</AccordionDetails>
		</Accordion>
	);

	return (
		<Box>
			<ClaimsOverview />
			
			{CreateSection(
				"Header",
				header,
				updateHeader,
				<AccountTree sx={{ color: "#ff6b35", fontSize: "1.25rem" }} />,
				'header',
				'255, 107, 53'
			)}
			
			{CreateSection(
				"Payload",
				payload,
				updatePayload,
				<DataObject sx={{ color: "#9c27b0", fontSize: "1.25rem" }} />,
				'payload',
				'156, 39, 176'
			)}
			
			{CreateSection(
				"Signature",
				signature,
				updateSignature,
				<Security sx={{ color: "#00bcd4", fontSize: "1.25rem" }} />,
				'signature',
				'0, 188, 212'
			)}
		</Box>
	);
}
