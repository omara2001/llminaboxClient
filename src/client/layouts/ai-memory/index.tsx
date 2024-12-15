import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Collapse,
  IconButton,
  TextField,
  InputAdornment,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import SearchIcon from "@mui/icons-material/Search";

interface Chat {
  id: number;
  date: string;
  summary: string;
  messages: { sender: "user" | "assistant"; content: string }[];
}

const AIMemory = () => {
  const [selectedAssistant, setSelectedAssistant] = useState("");
  const [expandedChatId, setExpandedChatId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Sample list of assistants (replace with dynamic data as needed)
  const assistants = [
    { id: "assistant1", name: "Assistant 1" },
    { id: "assistant2", name: "Assistant 2" },
    { id: "assistant3", name: "Assistant 3" }
  ];

  // Sample chat history data (replace with real data from an API)
  const chatHistory: Chat[] = [
    {
      id: 1,
      date: "2023-10-15",
      summary: "Discussed project setup",
      messages: [
        { sender: "user", content: "How do I set up the project?" },
        {
          sender: "assistant",
          content: "Here's a guide on setting up the project..."
        }
      ]
    },
    {
      id: 2,
      date: "2023-10-16",
      summary: "Troubleshooting errors",
      messages: [
        { sender: "user", content: "I'm getting an error in my code." },
        {
          sender: "assistant",
          content: "Let's go through the error step-by-step..."
        }
      ]
    }
  ];

  // Toggle chat expansion
  const handleToggle = (id: number) => {
    setExpandedChatId(expandedChatId === id ? null : id);
  };

  // Filtered chat history based on search term
  const filteredChats = chatHistory.filter(
    (chat) =>
      chat.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.messages.some((message) =>
        message.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  // Handle assistant selection
  const handleAssistantChange = (event: SelectChangeEvent<string>) => {
    setSelectedAssistant(event.target.value as string);
    setExpandedChatId(null); // Reset expanded chat on assistant change
  };

  return (
    <Box p={3}>
      {/* Assistant Selector */}
      <FormControl
        fullWidth
        sx={{ mb: 1 }}
      >
        <InputLabel>Select AI Assistant</InputLabel>
        <Select
          value={selectedAssistant}
          onChange={handleAssistantChange}
          label="Select AI Assistant"
        >
          {assistants.map((assistant) => (
            <MenuItem
              key={assistant.id}
              value={assistant.id}
            >
              {assistant.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography
        variant="h4"
        mb={2}
      >
        AI Memory
      </Typography>
      <Typography
        variant="body1"
        mb={3}
      >
        View the history of interactions with your AI assistant.
      </Typography>

      {/* Search Field */}
      <TextField
        label="Search chat history"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
        sx={{ mb: 1 }}
      />

      {/* Chat History List */}
      <List>
        {filteredChats.map((chat) => (
          <Box
            key={chat.id}
            mb={1}
          >
            <ListItem
              button
              onClick={() => handleToggle(chat.id)}
              sx={{
                backgroundColor:
                  expandedChatId === chat.id
                    ? "primary.light"
                    : "background.paper",
                borderRadius: 1
              }}
            >
              <ListItemText
                primary={chat.summary}
                secondary={chat.date}
              />
              <IconButton
                edge="end"
                onClick={() => handleToggle(chat.id)}
              >
                {expandedChatId === chat.id ? (
                  <ExpandLessIcon />
                ) : (
                  <ExpandMoreIcon />
                )}
              </IconButton>
            </ListItem>

            <Collapse
              in={expandedChatId === chat.id}
              timeout="auto"
              unmountOnExit
            >
              <List sx={{ pl: 4 }}>
                {chat.messages.map((message, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={message.content}
                      secondary={
                        message.sender === "user" ? "User" : "Assistant"
                      }
                      sx={{
                        textAlign: message.sender === "user" ? "right" : "left"
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
            <Divider />
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default AIMemory;
