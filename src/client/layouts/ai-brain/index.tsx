import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const AIBrain = () => {
  const [selectedAssistant] = useState("");

  // Sample list of assistants (replace with dynamic data as needed)
  const assistants = [
    { id: "assistant1", name: "Assistant 1" },
    { id: "assistant2", name: "Assistant 2" },
    { id: "assistant3", name: "Assistant 3" }
  ];

  const handleAssistantChange = () => {};

  const handleUploadAndLink = () => {
    // Placeholder function for handling document upload to Google Drive
    // and linking to Quadrant or a similar vector database.
    // Replace with actual API integration for Google Drive and Quadrant.
    console.log(
      "Upload documents to Google Drive and link to Quadrant for:",
      selectedAssistant
    );
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
        AI Brain
      </Typography>
      <Typography
        variant="body1"
        mb={3}
      >
        Upload documents to enhance your AI assistant&apos;s knowledge base.
        These documents will be stored in Google Drive and linked to a vector
        database to create an AI-powered memory for smarter interactions.
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
      >
        <Tooltip title="Upload documents to Google Drive and link to Quadrant">
          <Button
            variant="contained"
            color="primary"
            startIcon={<UploadFileIcon />}
            onClick={handleUploadAndLink}
            disabled={!selectedAssistant} // Disable if no assistant selected
          >
            Upload and Link to AI Brain
          </Button>
        </Tooltip>
      </Stack>
    </Box>
  );
};

export default AIBrain;
