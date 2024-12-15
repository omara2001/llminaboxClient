import React from "react";
import color from "color";
import { useContextData } from "@/assistant/context";
import { Box, Typography, Link } from "@mui/material";

export default function ChatbotFooter(): JSX.Element {
  const [chatData] = useContextData();

  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: 1,
        p: 2,
        height: 80,
        bgcolor: color(chatData.config.themeColor).darken(0.03).string(),
        color: color(chatData.config.textColor).darken(0.05).string()
      }}
    >
      <Typography
        variant="body2"
        sx={{ color: "text.secondary" }}
      >
        &copy; {new Date().getFullYear()} CriticalFuture. Made by{" "}
        <Link
          href="https://criticalfutureglobal.com/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            "color": "primary.main",
            "textDecoration": "none",
            "&:hover": {
              textDecoration: "underline"
            }
          }}
        >
          CriticalFuture
        </Link>
      </Typography>
    </Box>
  );
}
