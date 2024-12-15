import React, { useState, useEffect, ReactNode } from "react";
import color from "color";
import {
  Button,
  ButtonGroup,
  Modal,
  Box,
  Typography,
  CircularProgress
} from "@mui/material";
import { HeaderAvatar } from "@/assistant/components/Avatar";
import { useContextData } from "@/assistant/context";

export default function ChatbotHeader(): JSX.Element {
  const [chatData, dispatch] = useContextData();
  const [isHistoryModalOpen, setHistoryModalOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<
    {
      role: ReactNode;
      content: ReactNode;
      createdDate: string | number | Date;
      id: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isHistoryModalOpen) {
      setLoading(true);
      const fetchChatHistory = async () => {
        const authToken = btoa("adam:acbb6161-87e7-459c-beca-26235a7e6a30");
        try {
          const response = await fetch(
            `https://llm.criticalfutureglobal.com/api/v1/chatmessage/${chatData.config.chatflowid}`,
            {
              method: "GET",
              headers: {
                "Authorization": `Basic ${authToken}`,
                "Content-Type": "application/json"
              }
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch chat history.");
          }
          const data = await response.json();
          setChatHistory(data);
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      };

      fetchChatHistory();
    }
  }, [isHistoryModalOpen]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: 1,
          p: 2,
          height: 80,
          bgcolor: color(chatData.config.themeColor).darken(0.03).string(),
          color: color(chatData.config.textColor).darken(0.05).string()
        }}
      >
        <HeaderAvatar />
        <ButtonGroup variant="outlined">
          <Button onClick={() => setHistoryModalOpen(true)}>
            View History
          </Button>
        </ButtonGroup>
      </Box>

      <Modal
        open={isHistoryModalOpen}
        onClose={() => setHistoryModalOpen(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            width: 600,
            height: 400,
            overflowY: "auto"
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
          >
            Chat History
          </Typography>
          <Box>
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <CircularProgress />
              </Box>
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : chatHistory.length ? (
              chatHistory.map((message) => (
                <Box
                  key={message.id}
                  sx={{ mb: 2 }}
                >
                  <Typography
                    variant="subtitle2"
                    component="strong"
                  >
                    {message.role}:
                  </Typography>{" "}
                  <Typography
                    variant="body2"
                    component="span"
                  >
                    {message.content}
                  </Typography>
                  <Typography
                    variant="caption"
                    display="block"
                  >
                    {new Date(message.createdDate).toLocaleString()}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body2">
                No chat history available.
              </Typography>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
}
