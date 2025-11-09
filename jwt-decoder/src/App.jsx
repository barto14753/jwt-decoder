import * as React from "react";
import "./App.css";
import Bar from "./components/Bar";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import { Box } from "@mui/material";

function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 20%, rgba(0, 212, 170, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 107, 53, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(156, 39, 176, 0.05) 0%, transparent 50%)
          `,
          pointerEvents: "none",
        },
      }}
    >
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Bar />
        <Dashboard />
        <Footer />
      </Box>
    </Box>
  );
}

export default App;
