import React, { useState, useEffect } from "react";
import color from "color";
import {
  Box,
  Tabs,
  Tab,
  IconButton,
  Typography,
  List,
  ListItem,
  Button
} from "@mui/material";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { ChatAvatar } from "@/assistant/components/Avatar";
import { useContextData } from "@/assistant/context";

export default function ChatbotSidebar(): JSX.Element {
  const [chatData] = useContextData();
  const [isAboutOpen, setIsAboutOpen] = useState(window.innerWidth > 768);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box
      sx={{
        position: "relative",
        bgcolor: color(chatData.config.themeColor).darken(0.01).string(),
        color: color(chatData.config.textColor).darken(0.05).string(),
        minHeight: "100%",
        borderRight: 1,
        overflow: "hidden",
        width: isAboutOpen ? 300 : 0,
        transition: "width 0.3s"
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          p: isAboutOpen ? 2 : 0,
          overflow: "hidden",
          height: "100%"
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{ width: "100%", minHeight: 36 }}
        >
          <Tab
            label="Avatar"
            sx={{ fontSize: "12px", padding: "6px" }}
          />
          <Tab
            label="Conversations"
            sx={{ fontSize: "12px", padding: "6px" }}
          />
        </Tabs>

        {activeTab === 0 ? <ChatAvatar /> : <ChatSidebar />}
      </Box>

      <IconButton
        sx={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          position: "absolute",
          top: "50%",
          right: -16,
          transform: "translateY(-50%)",
          bgcolor: color(chatData.config.themeColor).darken(0.03).string(),
          color: color(chatData.config.textColor).darken(0.05).string()
        }}
        onClick={() => setIsAboutOpen(!isAboutOpen)}
      >
        {isAboutOpen ? <ArrowLeft /> : <ArrowRight />}
      </IconButton>
    </Box>
  );
}

function ChatSidebar() {
  const [conversations, setConversations] = useState<
    { id: number; title: string }[]
  >([]);

  useEffect(() => {
    setConversations([
      { id: 1, title: "Conversation 1" },
      { id: 2, title: "Conversation 2" },
      { id: 3, title: "Conversation 3" }
    ]);
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", mb: 2 }}
      >
        Conversations
      </Typography>
      <List>
        {conversations.map((conversation) => (
          <ListItem
            key={conversation.id}
            sx={{ p: 0, mb: 1 }}
          >
            <Button
              fullWidth
              sx={{
                "justifyContent": "flex-start",
                "textTransform": "none",
                "color": "text.primary",
                "&:hover": { textDecoration: "underline" }
              }}
            >
              {conversation.title}
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
