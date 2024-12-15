import React, { useState } from "react";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import logo from "../../assets/images/Created AI Assistants.png";

const CreateAI = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [Instruction,setInstruction] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submit functionality, such as sending the form data to an API.
    console.log({
      name,
      description,
      Instruction,
    });
  };

  return (
    <Box p={3} component="form" onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center", // Align logo and text vertically
          mb: 2, // Add spacing below the title
        }}
      >
        <img
          src={logo as string}
          alt="AI Assistants Logo"
          style={{
            width: "30px",
            height: "30px",
            marginRight: "10px", // Add spacing between logo and text
            
          }}
        />
        <Typography 
        variant="h4"
        fontWeight="bold"
        color="#33363f"
        fontFamily="Merriweather Sans, Helvetica"
        sx={{ fontSize: { xs: "20px", sm: "24px" } }}
        mb={0}
        >
          Create AI Assistant
          </Typography>
      </Box>
      <Typography
        variant="body1"
        mb={3}
      >
        Complete the form below to create a customized AI assistant.
      </Typography>

      <Grid
        container
        spacing={2}
      >
        {/* Assistant Name */}
        <Grid
          item
          xs={12}
          marginBottom={1}
        >
          <TextField
            label="Assistant Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Grid>

        {/* Description */}
        <Grid
          item
          xs={12}
          marginBottom={1}

        >
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>

        {/* Instruction */}
        <Grid
          item
          xs={12}

        >
          <TextField
            label="Instruction"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={Instruction}
            onChange={(e) => setInstruction(e.target.value)}
          />
        </Grid>



        {/* Submit Button */}
        <Grid
          item
          xs={4}
          marginLeft = {"auto"}
        >
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{
            borderRadius: "18px",
            }}
          >
            Save and continue
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateAI;
