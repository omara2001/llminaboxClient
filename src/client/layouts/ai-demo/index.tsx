import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from "@mui/material";

interface Message {
  sender: "user" | "assistant";
  content: string;
}

const AIDemos = () => {
  const [selectedAssistant, setSelectedAssistant] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  // Sample list of assistants (replace with dynamic data as needed)
  const assistants = [
    { id: "assistant1", name: "Assistant 1" },
    { id: "assistant2", name: "Assistant 2" },
    { id: "assistant3", name: "Assistant 3" }
  ];

  const handleAssistantChange = (event: SelectChangeEvent<string>) => {
    setSelectedAssistant(event.target.value as string);
    setMessages([]); // Clear chat history when switching assistants
  };

  const handleSend = () => {
    if (input.trim() && selectedAssistant) {
      // Add user message to chat
      setMessages((prev) => [...prev, { sender: "user", content: input }]);

      // Placeholder for assistant response
      const response = `AI Assistant: This is a simulated response to "${input}"`;

      // Add assistant response to chat
      setMessages((prev) => [
        ...prev,
        { sender: "assistant", content: response }
      ]);

      setInput(""); // Clear the input
    }
  };

  return (
    <Box p={3}>
      {/* Assistant Selector */}
      <FormControl
        fullWidth
        sx={{ mb: 3 }}
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
        AI Demos
      </Typography>
      <Typography
        variant="body1"
        mb={3}
      >
        Use this area to test and interact with your AI assistant.
      </Typography>

      <Paper
        elevation={3}
        sx={{
          height: 170,
          overflowY: "auto",
          mb: 2,
          p: 2,
          display: "flex",
          flexDirection: "column"
        }}
      >
        <List>
          {messages.map((message, index) => (
            <ListItem
              key={index}
              sx={{
                justifyContent:
                  message.sender === "user" ? "flex-end" : "flex-start"
              }}
            >
              <ListItemText
                primary={message.content}
                sx={{
                  textAlign: message.sender === "user" ? "right" : "left",
                  bgcolor:
                    message.sender === "user"
                      ? "primary.light"
                      : "secondary.light",
                  color:
                    message.sender === "user"
                      ? "primary.contrastText"
                      : "text.primary",
                  borderRadius: 2,
                  p: 1,
                  maxWidth: "75%"
                }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Input Field and Send Button */}
      <Box
        display="flex"
        gap={1}
      >
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Type a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={!selectedAssistant} // Disable input if no assistant selected
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSend}
          disabled={!selectedAssistant} // Disable send if no assistant selected
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default AIDemos;
