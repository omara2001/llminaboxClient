import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  TextField,
  Tooltip,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const AICodeSnippets = () => {
  const [selectedAssistant, setSelectedAssistant] = useState("");
  const [embedType, setEmbedType] = useState("html");
  const [codeSnippet, setCodeSnippet] = useState("");

  // Sample list of assistants (replace with dynamic data as needed)
  const assistants = [
    { id: "assistant1", name: "Assistant 1" },
    { id: "assistant2", name: "Assistant 2" },
    { id: "assistant3", name: "Assistant 3" }
  ];

  const handleAssistantChange = (event: SelectChangeEvent<string>) => {
    setSelectedAssistant(event.target.value as string);
  };

  const generateCodeSnippet = () => {
    if (selectedAssistant) {
      let snippet = "";
      if (embedType === "html") {
        snippet = `<iframe src="https://your-ai-assistant.com/embed/${selectedAssistant}" width="400" height="600"></iframe>`;
      } else if (embedType === "javascript") {
        snippet = `<script src="https://your-ai-assistant.com/embed/${selectedAssistant}.js"></script><div id="ai-assistant"></div>`;
      }
      setCodeSnippet(snippet);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
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
        AI Code Snippets
      </Typography>
      <Typography
        variant="body1"
        mb={3}
      >
        Generate and copy code snippets to embed your AI assistant on other
        websites.
      </Typography>

      {/* Embed Type Selection */}
      <FormControl
        component="fieldset"
        fullWidth
      >
        <FormLabel component="legend">Select Embed Type</FormLabel>
        <RadioGroup
          value={embedType}
          onChange={(e) => setEmbedType(e.target.value)}
          sx={{ mt: 2 }}
        >
          <FormControlLabel
            value="html"
            control={<Radio />}
            label="HTML Embed"
          />
          <FormControlLabel
            value="javascript"
            control={<Radio />}
            label="JavaScript Embed"
          />
        </RadioGroup>
      </FormControl>

      {/* Generate Button */}
      <Box
        mt={3}
        mb={2}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={generateCodeSnippet}
          disabled={!selectedAssistant} // Disable if no assistant is selected
        >
          Generate Code Snippet
        </Button>
      </Box>

      {/* Code Snippet Display and Copy Button */}
      {codeSnippet && (
        <Box
          display="flex"
          alignItems="center"
          gap={1}
        >
          <TextField
            label="Generated Code Snippet"
            multiline
            fullWidth
            variant="outlined"
            value={codeSnippet}
            InputProps={{
              readOnly: true
            }}
          />
          <Tooltip title="Copy to clipboard">
            <IconButton
              color="primary"
              onClick={handleCopy}
            >
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Box>
  );
};

export default AICodeSnippets;
