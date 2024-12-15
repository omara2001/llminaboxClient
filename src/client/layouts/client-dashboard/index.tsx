import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowForwardIos as ArrowForwardIosIcon,
} from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import logo from "../../assets/images/Created AI Assistants.png";

interface MessageHistory {
  text: string;
  timestamp: string;
}

interface Assistant {
  name: string;
  description: string;
  voice: string;
  avatar: string | null;
  messageHistory: MessageHistory[];
}

export default function Dashboard() {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Dummy data for message history
  const dummyMessageHistory: MessageHistory[] = [
    { text: "Hello, how can I assist you today?", timestamp: "2024-10-01 10:00" },
    { text: "Please provide more details.", timestamp: "2024-10-01 10:05" },
    { text: "Thank you! Have a great day!", timestamp: "2024-10-01 10:10" },
  ];

  // Add dummy data for assistants
  useEffect(() => {
    const dummyData: Assistant[] = [
      {
        name: "Assistant 1",
        description: "This is the first assistant",
        voice: "Google US English",
        avatar: null,
        messageHistory: dummyMessageHistory,
      },
      {
        name: "Assistant 2",
        description: "This is the second assistant",
        voice: "Google UK English",
        avatar: null,
        messageHistory: dummyMessageHistory,
      },
      {
        name: "Assistant 3",
        description: "This is the third assistant",
        voice: "Google US English",
        avatar: null,
        messageHistory: dummyMessageHistory,
      },
    ];

    setAssistants(dummyData);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/dashboard") {
      navigate("/dashboard", { replace: true });
    }
  });

  return (
    <Box p={3}>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <img
          src={logo as string}
          alt="AI Assistants Logo"
          style={{
            width: "30px",
            height: "30px",
            marginRight: "10px",
          }}
        />
        <Typography
          variant="h4"
          fontWeight="bold"
          color="#33363f"
          fontFamily="Merriweather Sans, Helvetica"
          sx={{ fontSize: { xs: "20px", sm: "24px" } }}
        >
          Created AI Assistants:
        </Typography>
      </Box>

      <List>
        {assistants.map((assistant, index) => (
          <ListItem
            key={index}
            sx={{
              backgroundColor: "white",
              borderRadius: "20px",
              maxWidth:"550px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e0e0e0",
              marginBottom: "15px",
              padding: "15px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ListItemAvatar>
              <Avatar
                src={assistant.avatar || ""}
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: assistant.avatar ? "transparent" : "#d9d9d9",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                {!assistant.avatar ? assistant.name[0] : null}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={assistant.name}
              secondary={`${assistant.description} | Voice: ${assistant.voice}`}
              primaryTypographyProps={{
                fontWeight: "bold",
                fontSize: { xs: "14px", sm: "16px" },
                color: "#333",
              }}
              secondaryTypographyProps={{
                fontSize: { xs: "12px", sm: "14px" },
                color: "#666",
              }}
            />
            <IconButton edge="end">
              <ArrowForwardIosIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
