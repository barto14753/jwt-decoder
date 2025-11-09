import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Security, GitHub, Info } from "@mui/icons-material";
import { Tooltip, Chip } from "@mui/material";

export default function Bar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                background: "linear-gradient(135deg, #00d4aa 0%, #1ae5be 100%)",
                borderRadius: "50%",
                width: 40,
                height: 40,
                justifyContent: "center",
                boxShadow: "0 4px 16px rgba(0, 212, 170, 0.3)",
              }}
            >
              <Security sx={{ color: "#000", fontSize: "1.25rem" }} />
            </Box>
            <Box>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #00d4aa 0%, #1ae5be 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "-0.02em",
                }}
              >
                JWT Decoder
              </Typography>
              <Typography
                variant="body2"
                sx={{ 
                  color: "text.secondary", 
                  fontSize: "0.75rem",
                  fontWeight: 400
                }}
              >
                Secure token analysis & verification
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Chip
              label="v1.0"
              size="small"
              sx={{
                backgroundColor: "rgba(0, 212, 170, 0.1)",
                color: "#00d4aa",
                border: "1px solid rgba(0, 212, 170, 0.3)",
                fontWeight: 500,
              }}
            />
            
            <Tooltip title="View on GitHub">
              <IconButton
                size="medium"
                sx={{
                  color: "text.secondary",
                  "&:hover": {
                    color: "#00d4aa",
                    backgroundColor: "rgba(0, 212, 170, 0.08)",
                  },
                }}
                href="https://github.com/barto14753/jwt-decoder"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHub />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="About JWT Tokens">
              <IconButton
                size="medium"
                sx={{
                  color: "text.secondary",
                  "&:hover": {
                    color: "#00d4aa",
                    backgroundColor: "rgba(0, 212, 170, 0.08)",
                  },
                }}
              >
                <Info />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
