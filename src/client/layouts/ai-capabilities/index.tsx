import React, { useState } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from "@mui/material";

const AICapabilities = () => {
  const [selectedAssistant, setSelectedAssistant] = useState("");
  const [capabilities, setCapabilities] = useState<string[]>([]);

  // Sample list of assistants (replace with dynamic data as needed)
  const assistants = [
    { id: "assistant1", name: "Assistant 1" },
    { id: "assistant2", name: "Assistant 2" },
    { id: "assistant3", name: "Assistant 3" }
  ];

  // Define a list of capabilities that can be selected
  const capabilityOptions = [
    "Natural Language Processing",
    "Speech Recognition",
    "Image Recognition",
    "Sentiment Analysis",
    "Data Analysis",
    "Predictive Analytics",
    "Machine Translation",
    "Chatbot Interaction"
  ];

  // Handle assistant selection
  const handleAssistantChange = (event: SelectChangeEvent<string>) => {
    setSelectedAssistant(event.target.value as string);
  };

  // Handle checkbox change
  const handleCheckboxChange = (capability: string) => {
    setCapabilities(
      (prev) =>
        prev.includes(capability)
          ? prev.filter((item) => item !== capability) // Remove if already selected
          : [...prev, capability] // Add if not already selected
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the selected capabilities, e.g., send them to an API with the selected assistant
    console.log("Selected assistant:", selectedAssistant);
    console.log("Selected capabilities:", capabilities);
  };

  return (
    <Box
      p={3}
      component="form"
      onSubmit={handleSubmit}
    >
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
        AI Capabilities
      </Typography>
      <Typography
        variant="body1"
        mb={3}
      >
        Choose the capabilities you want to enable for your AI assistant.
      </Typography>

      <FormGroup>
        <Grid
          container
          spacing={2}
        >
          {capabilityOptions.map((capability) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={capability}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={capabilities.includes(capability)}
                    onChange={() => handleCheckboxChange(capability)}
                  />
                }
                label={capability}
              />
            </Grid>
          ))}
        </Grid>
      </FormGroup>

      <Box mt={3}>
  <Button
    variant="contained"
    type="submit"
    disabled={!selectedAssistant} // Disable if no assistant selected
    sx={{
      marginLeft: { xs: "auto", sm: "380px", md:"480px" ,lg:"500px",xl:"650px" },
      backgroundColor: '#FF00BD',
      '&:hover': {
        backgroundColor: '#E600A9', // Optional: slightly darker for hover
      },
    }}
  >
    Save and continue
  </Button>
</Box>

    </Box>
  );
};

export default AICapabilities;
