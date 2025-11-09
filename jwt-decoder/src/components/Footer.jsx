import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  Divider,
  IconButton,
  Tooltip,
  Chip,
} from "@mui/material";
import {
  GitHub,
  Security,
  Info,
  OpenInNew,
  Favorite,
} from "@mui/icons-material";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const resources = [
    {
      title: "JWT.io",
      description: "Official JWT website",
      url: "https://jwt.io/",
    },
    {
      title: "RFC 7519",
      description: "JWT Specification",
      url: "https://tools.ietf.org/html/rfc7519",
    },
    {
      title: "OWASP JWT Guide",
      description: "Security best practices",
      url: "https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html",
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        py: 6,
        background: "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <Container maxWidth="xl">
        {/* Resources Section */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Info sx={{ color: "primary.main" }} />
            Helpful Resources
          </Typography>
          
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 2,
            }}
          >
            {resources.map((resource) => (
              <Box
                key={resource.title}
                sx={{
                  p: 2,
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: 2,
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "primary.main",
                    backgroundColor: "rgba(0, 212, 170, 0.05)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <Link
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: "primary.main",
                        fontWeight: 600,
                        mb: 0.5,
                      }}
                    >
                      {resource.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {resource.description}
                    </Typography>
                  </Box>
                  <OpenInNew
                    sx={{
                      color: "text.secondary",
                      fontSize: "1rem",
                      ml: 1,
                    }}
                  />
                </Link>
              </Box>
            ))}
          </Box>
        </Box>

        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)", mb: 4 }} />

        {/* Security Notice */}
        <Box
          sx={{
            p: 3,
            backgroundColor: "rgba(255, 152, 0, 0.1)",
            border: "1px solid rgba(255, 152, 0, 0.3)",
            borderRadius: 2,
            mb: 4,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
            <Security sx={{ color: "warning.main", mt: 0.5 }} />
            <Box>
              <Typography
                variant="h6"
                sx={{ color: "warning.main", fontWeight: 600, mb: 1 }}
              >
                Security Notice
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
                This tool is designed for development and analysis purposes. Always
                exercise caution when handling JWTs in production environments:
              </Typography>
              <Box component="ul" sx={{ pl: 2, m: 0 }}>
                <Typography component="li" variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
                  Never expose private keys or secrets
                </Typography>
                <Typography component="li" variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
                  Validate tokens server-side in production
                </Typography>
                <Typography component="li" variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
                  Use HTTPS for token transmission
                </Typography>
                <Typography component="li" variant="body2" sx={{ color: "text.secondary" }}>
                  Implement proper token expiration and rotation
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Footer Bottom */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              Made with{" "}
              <Favorite sx={{ color: "#ff6b35", fontSize: "1rem" }} /> for the
              developer community
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Chip
                label="React 18"
                size="small"
                sx={{
                  backgroundColor: "rgba(97, 218, 251, 0.1)",
                  color: "#61dafb",
                  fontSize: "0.75rem",
                }}
              />
              <Chip
                label="Material-UI"
                size="small"
                sx={{
                  backgroundColor: "rgba(0, 127, 255, 0.1)",
                  color: "#007fff",
                  fontSize: "0.75rem",
                }}
              />
            </Box>

            <Tooltip title="View source on GitHub">
              <IconButton
                component={Link}
                href="https://github.com/barto14753/jwt-decoder"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "text.secondary",
                  "&:hover": {
                    color: "primary.main",
                    backgroundColor: "rgba(0, 212, 170, 0.08)",
                  },
                }}
              >
                <GitHub />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            textAlign: "center",
            mt: 3,
            pt: 3,
            borderTop: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          © {currentYear} JWT Decoder. Open source project for educational and
          development purposes.
        </Typography>
      </Container>
    </Box>
  );
}