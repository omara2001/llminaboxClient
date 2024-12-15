import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  IconButton,
  Paper,
} from "@mui/material";
import RecordVoiceOverOutlinedIcon from "@mui/icons-material/RecordVoiceOverOutlined";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import GraphicEqOutlinedIcon from '@mui/icons-material/GraphicEqOutlined';

const AIVoice: React.FC = () => {
  const [selectedVoice, setSelectedVoice] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [voiceScales, setVoiceScales] = useState<{ [key: number]: number }>({});
  const [scale, setScale] = useState(1); // Scale for "Clone Your Voice"
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  const voices = [
    { id: 1, label: "Light Voice, Man" },
    { id: 2, label: "Light Voice, Man" },
    { id: 3, label: "Light Voice, Man" },
    { id: 4, label: "Light Voice, Man" },
    { id: 5, label: "Light Voice, Man" },
    { id: 6, label: "Light Voice, Man" },
    { id: 7, label: "Light Voice, Man" },
    { id: 8, label: "Light Voice, Man" },
    { id: 9, label: "Light Voice, Man" },
    { id: 10, label: "Light Voice, Man" },
  ];

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setScale(1); // Reset scale to normal
    }
  };

  // Handle voice selection and stop recording
  const handleVoiceSelect = (voiceId: number) => {
    if (isRecording) {
      stopRecording(); // Stop recording if active
    }

    setAudioUrl(null); // Clear recorded audio

    setSelectedVoice((prevSelected) =>
      prevSelected === voiceId ? null : voiceId
    );

    // Update scales: scale up the clicked voice, reset others
    setVoiceScales((prevScales) => {
      const updatedScales: { [key: number]: number } = {};
      voices.forEach((voice) => {
        updatedScales[voice.id] =
          voice.id === voiceId && prevScales[voice.id] !== 1.05 ? 1.05 : 1;
      });
      return updatedScales;
    });
  };

  // Start recording
  const startRecording = async () => {
    setIsRecording(true);
    setScale(1.05); // Scale up on start
    setAudioChunks([]); // Clear previous audio chunks
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        setAudioChunks((prevChunks) => [...prevChunks, event.data]);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
        const audioURL = URL.createObjectURL(audioBlob);
        setAudioUrl(audioURL);
        console.log("Recording complete:", audioURL);
      };

      mediaRecorder.start();
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setIsRecording(false);
    }
  };

  const handleRecordingToggle = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <Box p={3}>
      {/* Header */}
      <Typography variant="h5" fontWeight="bold" mb={1}>
        <GraphicEqOutlinedIcon sx={{mr:"8px"}}></GraphicEqOutlinedIcon>
        Define your assistant’s voice
      </Typography>
      <Typography variant="body2" mb={2}>
        Clone your voice or select ready voices
      </Typography>

      <Grid container spacing={2}>
        {/* Clone Your Voice */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              border: "2px solid #0085EF",
              backgroundColor: "#F5F5F5",
              borderRadius: "8px",
              p: 2,
              textAlign: "center",
              cursor: "pointer",
              transform: `scale(${scale})`, // Apply scaling
              transition: "transform 0.2s ease", // Smooth scaling transition
            }}
            onClick={handleRecordingToggle} // Toggle recording on click
          >
            <Typography variant="body1" fontWeight="bold">
              <RecordVoiceOverOutlinedIcon color="primary" fontSize="large" />
              CLONE YOUR VOICE
            </Typography>

            {/* Audio Playback */}
            {audioUrl && (
              <Box mt={2}>
                <audio controls src={audioUrl}>
                  <track kind="captions" srcLang="en" label="English" />
                </audio>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Ready Voices */}
        {voices.map((voice) => (
          <Grid item xs={12} sm={6} md={3} key={voice.id}>
            <Paper
              sx={{
                border: `2px solid ${
                  selectedVoice === voice.id ? "#FF00CD" : "#999696"
                }`,
                borderRadius: "8px",
                p: 2,
                textAlign: "center",
                backgroundColor:
                  selectedVoice === voice.id ? "#FFF3F8" : "#FFFFFF",
                cursor: "pointer",
                transform: `scale(${voiceScales[voice.id] || 1})`, // Apply dynamic scaling
                transition: "transform 0.2s ease, background-color 0.2s ease", // Smooth scaling and color transition
                "&:hover": {
                  boxShadow: "0px 2px 10px rgba(0,0,0,0.2)",
                },
              }}
              onClick={() => handleVoiceSelect(voice.id)}
            >
              <Typography
                variant="body2"
                fontWeight="bold"
                color={selectedVoice === voice.id ? "#FF00CD" : "inherit"}
              >
                {voice.label}
                <IconButton>
                  <VolumeUpOutlinedIcon
                    sx={{
                      fontSize: "32px",
                      color: selectedVoice === voice.id ? "#FF00CD" : "#0085EF",
                    }}
                  />
                </IconButton>
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Save Button */}
      <Box mt={3} textAlign="right">
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#2196F3",
            color: "#fff",
            borderRadius: "20px",
            textTransform: "none",
            px: 4,
            ml: 5,
            "&:hover": { backgroundColor: "#FF00CD" },
          }}
        >
          Save and continue
          <ArrowForwardIosOutlinedIcon sx={{ ml: 1 }} />
        </Button>
      </Box>
    </Box>
  );
};

export default AIVoice;




