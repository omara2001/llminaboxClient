import React, { useState, useEffect } from "react";
import { useContextData } from "@/assistant/context";
import { getOnlineStatus, getAllowedUploads } from "@/assistant/utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  IconButton,
  Button,
  CircularProgress,
  Typography
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

const Chatbot: React.FC<{ position?: { bottom?: string; right?: string } }> = ({
  position = { bottom: "20px", right: "20px" }
}) => {
  const [chatData, dispatch] = useContextData();
  const [isChatbotVisible, setChatbotVisible] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    if (chatData.error) {
      toast.error(chatData.error);
      dispatch({ type: "SET_ERROR", payload: "" });
    }
  }, [chatData.error]);

  useEffect(() => {
    getOnlineStatus(chatData, dispatch);
    getAllowedUploads(chatData, dispatch);
  }, [chatData, dispatch]);

  const toggleChatbot = () => setChatbotVisible(!isChatbotVisible);
  const toggleMaximize = () => setIsMaximized(!isMaximized);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        theme="colored"
      />

      {/* Floating Button to Open Chatbot */}
      {!isChatbotVisible && (
        <Button
          onClick={toggleChatbot}
          sx={{
            position: "fixed",
            bottom: position.bottom,
            right: position.right,
            bgcolor: "primary.main",
            color: "white",
            width: 64,
            height: 64,
            borderRadius: "50%",
            boxShadow: 3,
            zIndex: 50
          }}
        >
          <ChatIcon fontSize="large" />
        </Button>
      )}

      {/* Chatbot Modal */}
      {isChatbotVisible && (
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: isMaximized ? "rgba(0, 0, 0, 0.5)" : "transparent",
            backdropFilter: isMaximized ? "blur(5px)" : "none",
            zIndex: 999999
          }}
        >
          <Box
            sx={{
              width: isMaximized ? "100%" : "80%",
              height: isMaximized ? "100%" : "60%",
              maxWidth: "50%",
              bgcolor: "background.paper",
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: 3,
              position: "fixed",
              bottom: !isMaximized ? position.bottom : "unset",
              right: !isMaximized ? position.right : "unset"
            }}
          >
            {/* Chatbot Header */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 1,
                bgcolor: "primary.main",
                color: "white"
              }}
            >
              <Typography sx={{ flexGrow: 1 }}>Chatbot Assistant</Typography>
              <IconButton
                onClick={toggleMaximize}
                sx={{ color: "white" }}
              >
                {isMaximized ? <FullscreenExitIcon /> : <FullscreenIcon />}
              </IconButton>
              <IconButton
                onClick={toggleChatbot}
                sx={{ color: "white" }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Chatbot Body */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                overflow: "auto",
                p: 2
              }}
            >
              {/* Placeholder for chat messages */}
              {chatData.isApiTyping ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <CircularProgress size={16} />
                </Box>
              ) : (
                <Typography>Chat content goes here...</Typography>
              )}
            </Box>

            {/* Chatbot Footer */}
            <Box
              component="footer"
              sx={{
                p: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "grey.100",
                borderTop: 1,
                borderColor: "grey.300"
              }}
            >
              <Typography
                variant="body2"
                color="textSecondary"
              >
                &copy; {new Date().getFullYear()} CriticalFuture. Made by{" "}
                <a
                  href="https://criticalfutureglobal.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "blue", textDecoration: "underline" }}
                >
                  CriticalFuture
                </a>
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Chatbot;
