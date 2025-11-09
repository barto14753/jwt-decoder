// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0a0a0a",
      paper: "#1a1a1a",
    },
    primary: {
      main: "#00d4aa",
      light: "#1ae5be",
      dark: "#009688",
      contrastText: "#000000",
    },
    secondary: {
      main: "#ff6b35",
      light: "#ff8a65",
      dark: "#e65100",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
    divider: "rgba(255, 255, 255, 0.12)",
    success: {
      main: "#4caf50",
      light: "#81c784",
      dark: "#388e3c",
    },
    warning: {
      main: "#ff9800",
      light: "#ffb74d",
      dark: "#f57c00",
    },
    error: {
      main: "#f44336",
      light: "#e57373",
      dark: "#d32f2f",
    },
    info: {
      main: "#2196f3",
      light: "#64b5f6",
      dark: "#1976d2",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: "1.125rem",
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: "thin",
          scrollbarColor: "#00d4aa #1a1a1a",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#1a1a1a",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#00d4aa",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#1ae5be",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1a1a1a",
          boxShadow: "0 4px 20px rgba(0, 212, 170, 0.15)",
          borderBottom: "1px solid rgba(0, 212, 170, 0.2)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#1a1a1a",
          backgroundImage: "none",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
          fontWeight: 500,
          padding: "10px 24px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 16px rgba(0, 212, 170, 0.3)",
          },
        },
        contained: {
          background: "linear-gradient(135deg, #00d4aa 0%, #1ae5be 100%)",
          color: "#000000",
          "&:hover": {
            background: "linear-gradient(135deg, #1ae5be 0%, #00d4aa 100%)",
          },
        },
        outlined: {
          borderColor: "#00d4aa",
          color: "#00d4aa",
          "&:hover": {
            borderColor: "#1ae5be",
            backgroundColor: "rgba(0, 212, 170, 0.08)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#2a2a2a",
            borderRadius: "8px",
            "& fieldset": {
              borderColor: "rgba(255, 255, 255, 0.2)",
            },
            "&:hover fieldset": {
              borderColor: "#00d4aa",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#00d4aa",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#b0b0b0",
            "&.Mui-focused": {
              color: "#00d4aa",
            },
          },
          "& .MuiOutlinedInput-input": {
            color: "#ffffff",
            fontFamily: '"Fira Code", "Monaco", "Consolas", monospace',
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#2a2a2a",
          borderRadius: "8px 8px 0 0",
          "&:hover": {
            backgroundColor: "#333333",
          },
          "&.Mui-focused": {
            backgroundColor: "#333333",
          },
          "&:before": {
            borderBottom: "2px solid rgba(255, 255, 255, 0.2)",
          },
          "&:hover:before": {
            borderBottom: "2px solid #00d4aa",
          },
          "&:after": {
            borderBottom: "2px solid #00d4aa",
          },
        },
        input: {
          color: "#ffffff",
          fontFamily: '"Fira Code", "Monaco", "Consolas", monospace',
          fontSize: "0.875rem",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        filled: {
          color: "#b0b0b0",
          "&.Mui-focused": {
            color: "#00d4aa",
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          "& .MuiAlert-icon": {
            fontSize: "1.25rem",
          },
        },
        standardSuccess: {
          backgroundColor: "rgba(76, 175, 80, 0.15)",
          color: "#81c784",
          border: "1px solid rgba(76, 175, 80, 0.3)",
        },
        standardError: {
          backgroundColor: "rgba(244, 67, 54, 0.15)",
          color: "#e57373",
          border: "1px solid rgba(244, 67, 54, 0.3)",
        },
        standardWarning: {
          backgroundColor: "rgba(255, 152, 0, 0.15)",
          color: "#ffb74d",
          border: "1px solid rgba(255, 152, 0, 0.3)",
        },
        standardInfo: {
          backgroundColor: "rgba(33, 150, 243, 0.15)",
          color: "#64b5f6",
          border: "1px solid rgba(33, 150, 243, 0.3)",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: "#1a1a1a",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          "&:before": {
            display: "none",
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0, 212, 170, 0.05)",
          borderRadius: "12px 12px 0 0",
          "&.Mui-expanded": {
            borderRadius: "12px 12px 0 0",
          },
        },
        content: {
          alignItems: "center",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          color: "#b0b0b0",
          "&.Mui-selected": {
            color: "#00d4aa",
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "#00d4aa",
          height: "3px",
          borderRadius: "2px 2px 0 0",
        },
      },
    },
  },
});

export default theme;
