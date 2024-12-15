import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import AutoModeOutlinedIcon from '@mui/icons-material/AutoModeOutlined';
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';

const AIFace = () => {
  const [screen, setScreen] = useState("main"); // Track current screen
  const [description, setDescription] = useState({
    gender: "",
    age: "",
    ethnicity: "",
    appearance: "",
  });
  const [uploadedImage, setUploadedImage] = useState<string | null>(null); // State to store uploaded image

  // Handlers for navigation
  const handleScreenChange = (newScreen: string) => setScreen(newScreen);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription({ ...description, [e.target.name]: e.target.value });
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string); // Save uploaded image as base64 string
      };
      reader.readAsDataURL(file); // Convert image to base64 URL
    }
  };

  const renderMainScreen = () => (
    <Box textAlign="left" >
      <Typography variant="h4" mb={2} ml={5}>
        Create your assistant’s face
      </Typography>
      <Typography mb={4} ml={5}>
        You can upload photos or generate your assistant’s appearance
      </Typography>
      <Grid container spacing={3} justifyContent="left">
        {/* Upload Option */}
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Box
            sx={{
              border: "2px solid #0085EF",
              borderRadius: "8px",
              p: 8,
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() => handleScreenChange("upload")}
          >
            <CloudUploadOutlinedIcon
              sx={{ width: 60, height: 60, margin: "0 auto", color:"#0085EF"}}
            />
            <Typography variant="h6" color="#0085EF">
              UPLOAD
            </Typography>
            <Typography>Upload photos from your files or drive</Typography>
          </Box>
        </Grid>
        {/* Generate Option */}
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Box
            sx={{
              border: "2px solid #0085EF",
              borderRadius: "8px",
              p: 8,
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() => handleScreenChange("generate")}
          >
            <AutoModeOutlinedIcon
              sx={{ width: 60, height: 60, margin: "0 auto",color:"#0085EF"}}
            />
            <Typography variant="h6" color="#0085EF">
              GENERATE
            </Typography>
            <Typography>Describe your avatar and generate preview</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  const renderUploadScreen = () => (
    <Box>
      {/* Header */}
      <Typography variant="h5" fontWeight="bold" mb={1}>
        AI Face
      </Typography>
      <Typography mb={3}>
        You can have a photo or video avatar for your assistant.
      </Typography>
      {/* Toggle Buttons */}
      <Box display="flex" mb={3}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            borderRadius: "20px",
            textTransform: "none",
            mr: 1,
            boxShadow: "none",
          }}
        >
          PHOTO
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          sx={{
            borderRadius: "20px",
            textTransform: "none",
            boxShadow: "none",
          }}
        >
          VIDEO
        </Button>
      </Box>
  
      {/* Description */}
      <Typography mb={2}>
        You can upload, generate your assistant’s face by clicking{" "}
        <strong>Create button</strong> or select from the ready ones!
      </Typography>
  
      {/* Avatar Options */}
      <Grid container spacing={2} justifyContent="center">
        {/* Create Button */}
        <Grid item xs={4} sm={3} md={2} lg={2}>
          {/* File Upload Wrapper */}
          <Box
            component="label" // Makes the box clickable for file upload
            htmlFor="photo-upload" // Links the label to the input
            sx={{
              border: "2px dashed #1976D2",
              borderRadius: "8px",
              textAlign: "center",
              p: 2,
              height: "100%",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              "&:hover": {
                backgroundColor: "#E3F2FD", // Adds hover effect
              },
            }}
          >
            <AddCircleOutlineRoundedIcon
              sx={{ width: 50, height: 50, margin: "0 auto", color:"#0085EF"}}
            />
            <Typography variant="body2" color="primary" fontWeight="bold">
              Create
            </Typography>
            <Typography variant="caption" color="textSecondary">
              (upload & generate)
            </Typography>
            {/* Hidden File Input */}
            <input
              id="photo-upload"
              type="file"
              accept="image/*" // Restricts to image files only
              hidden
              onChange={handleFileUpload} // Call the file upload handler
            />
          </Box>
        </Grid>

        {/* Predefined Avatars */}
        {[...Array(4)].map((_, index) => (
          <Grid item xs={4} sm={3} md={2} key={index}>
            <Box
              sx={{
                height: "200px",
                borderRadius: "8px",
                backgroundImage: `url(https://via.placeholder.com/100?text=Avatar+${
                  index + 1
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </Grid>
        ))}

        {/* Display Uploaded Image */}
        {uploadedImage && (
          <Grid item xs={4} sm={3} md={2}>
            <Box
              sx={{
                height: "200px",
                borderRadius: "8px",
                backgroundImage: `url(${uploadedImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </Grid>
        )}
      </Grid>
      <Box textAlign="right" mt={4}>
        <Button onClick={() => handleScreenChange("main")} variant="outlined">
          Back
        </Button>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#2196F3",
            color: "#fff",
            borderRadius: "20px",
            textTransform: "none",
            px: 4,
            ml:5,
            "&:hover": { backgroundColor: "#FF00CD" },
          }}
        >
          Save and continue
          <ArrowForwardIosOutlinedIcon
            sx={{ ml: 1 }}
          />
        </Button>
      </Box>
    </Box>
  );
  
  const renderGenerateScreen = () => (
    <Box>
      <Typography variant="h5" mb={3}>
      <PaletteOutlinedIcon sx={{mr:"8px"}}></PaletteOutlinedIcon>
        Describe Your Assistant’s Look
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Gender"
            name="gender"
            value={description.gender}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Age"
            name="age"
            value={description.age}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Ethnicity"
            name="ethnicity"
            value={description.ethnicity}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
      <Box mt={2}>
        <TextField
          fullWidth
          label="Appearance"
          name="appearance"
          multiline
          rows={4}
          placeholder="e.g., Tall, with brown hair and glasses"
          value={description.appearance}
          onChange={handleInputChange}
        />
      </Box>
      <Box textAlign="right" mt={4}>
        <Button onClick={() => handleScreenChange("main")} variant="outlined">
          Back
        </Button>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#2196F3",
            color: "#fff",
            borderRadius: "20px",
            textTransform: "none",
            px: 4,
            ml:5,
            "&:hover": { backgroundColor: "#FF00CD" },
          }}
        >
          Generate Preview
          <ArrowForwardIosOutlinedIcon sx={{ ml:1}} />
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box p={3}>
      {screen === "main" && renderMainScreen()}
      {screen === "upload" && renderUploadScreen()}
      {screen === "generate" && renderGenerateScreen()}
    </Box>
  );
};

export default AIFace;




