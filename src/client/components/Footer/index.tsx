import React from "react";
import { Box, Typography, Link } from "@mui/material";

interface Company {
  href: string;
  name: string;
}

interface FooterProps {
  company?: Company;
}

const Footer: React.FC<FooterProps> = ({
  company = {
    href: "https://criticalfutureglobal.com/",
    name: "CRITICAL FUTURE",
  },
}) => (
  <Box
    sx={{
      width: "100%",
      backgroundColor: "#040068", // Solid background color
      padding: { xs: "10px", sm: "15px" }, // Responsive padding
      color: "white",
      textAlign: "center",
    }}
  >
    <Typography
      variant="body2"
      sx={{
        fontSize: { xs: "10px", sm: "12px" }, // Adjust font size for smaller screens
        lineHeight: "1.5",
      }}
    >
      © {new Date().getFullYear()} LLM in a Box. All rights reserved. Powered by{" "}
      <Link
        href={company.href}
        target="_blank"
        rel="noopener noreferrer"
        underline="hover"
        color="inherit"
        sx={{
          fontWeight: "bold",
          textDecoration: "none",
          "&:hover": { textDecoration: "underline" },
        }}
      >
        {company.name}
      </Link>
    </Typography>
  </Box>
);

export default Footer;
