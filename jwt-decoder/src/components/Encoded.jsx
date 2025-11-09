import * as React from "react";
import { useState, useEffect } from "react";
import { 
	TextField, 
	Box, 
	Typography, 
	Chip, 
	IconButton,
	Tooltip,
	InputAdornment
} from "@mui/material";
import { ContentCopy, Check } from "@mui/icons-material";

export default function Encoded({ jwt, updateJwt }) {
	useEffect(() => {
		setData(jwt);
	}, [jwt]);

	const [data, setData] = useState(jwt);
	const [copied, setCopied] = useState(false);

	const updateData = (data_) => {
		setData(data_);
		try {
			updateJwt(data_);
		} catch (e) {
			console.error(e);
		}
	};

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(data);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error('Failed to copy to clipboard:', err);
		}
	};

	const getTokenParts = () => {
		if (!data) return { header: '', payload: '', signature: '' };
		const parts = data.split('.');
		return {
			header: parts[0] || '',
			payload: parts[1] || '',
			signature: parts[2] || ''
		};
	};

	const tokenParts = getTokenParts();

	const TokenVisualization = () => (
		<Box sx={{ mb: 3, p: 2, backgroundColor: "rgba(0, 0, 0, 0.2)", borderRadius: 2 }}>
			<Typography variant="body2" sx={{ color: "text.secondary", mb: 2, fontWeight: 500 }}>
				Token Structure:
			</Typography>
			<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
				<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
					<Chip 
						label="Header" 
						size="small" 
						sx={{ 
							backgroundColor: "rgba(255, 107, 53, 0.2)",
							color: "#ff6b35",
							fontWeight: 500,
							minWidth: 80,
						}} 
					/>
					<Typography 
						variant="body2" 
						sx={{ 
							fontFamily: '"Fira Code", "Monaco", "Consolas", monospace',
							color: "#ff6b35",
							wordBreak: "break-all",
							fontSize: "0.75rem",
						}}
					>
						{tokenParts.header}
					</Typography>
				</Box>
				<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
					<Chip 
						label="Payload" 
						size="small" 
						sx={{ 
							backgroundColor: "rgba(156, 39, 176, 0.2)",
							color: "#9c27b0",
							fontWeight: 500,
							minWidth: 80,
						}} 
					/>
					<Typography 
						variant="body2" 
						sx={{ 
							fontFamily: '"Fira Code", "Monaco", "Consolas", monospace',
							color: "#9c27b0",
							wordBreak: "break-all",
							fontSize: "0.75rem",
						}}
					>
						{tokenParts.payload}
					</Typography>
				</Box>
				<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
					<Chip 
						label="Signature" 
						size="small" 
						sx={{ 
							backgroundColor: "rgba(0, 188, 212, 0.2)",
							color: "#00bcd4",
							fontWeight: 500,
							minWidth: 80,
						}} 
					/>
					<Typography 
						variant="body2" 
						sx={{ 
							fontFamily: '"Fira Code", "Monaco", "Consolas", monospace',
							color: "#00bcd4",
							wordBreak: "break-all",
							fontSize: "0.75rem",
						}}
					>
						{tokenParts.signature}
					</Typography>
				</Box>
			</Box>
		</Box>
	);

	return (
		<Box>
			<TokenVisualization />
			
			<TextField
				fullWidth
				multiline
				rows={12}
				variant="outlined"
				label="JWT Token"
				value={data}
				onChange={(e) => updateData(e.target.value)}
				placeholder="Paste your JWT token here..."
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
								<Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
									<IconButton
										onClick={handleCopy}
										size="small"
										sx={{
											color: copied ? "success.main" : "text.secondary",
											"&:hover": {
												color: "primary.main",
												backgroundColor: "rgba(0, 212, 170, 0.08)",
											},
										}}
									>
										{copied ? <Check /> : <ContentCopy />}
									</IconButton>
								</Tooltip>
							</Box>
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
						minHeight: "400px",
						alignItems: "flex-start",
						"& textarea": {
							paddingTop: "16px !important",
						},
					},
				}}
			/>
			
			<Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<Typography variant="body2" sx={{ color: "text.secondary" }}>
					Character count: <strong>{data.length}</strong>
				</Typography>
				<Typography variant="body2" sx={{ color: "text.secondary" }}>
					{data.split('.').length === 3 ? "✓ Valid JWT format" : "⚠ Invalid JWT format"}
				</Typography>
			</Box>
		</Box>
	);
}
