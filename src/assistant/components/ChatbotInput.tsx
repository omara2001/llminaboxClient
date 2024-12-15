import React, { useState } from "react";
import { Button, TextareaAutosize, IconButton, Box } from "@mui/material";
import { Mic, Stop, Delete, Image, UploadFile } from "@mui/icons-material";
import { sendMessage } from "@/assistant/utils/getMessage";
import { useContextData, Message } from "@/assistant/context";
import {
  startAudioRecording,
  stopAudioRecording
} from "@/assistant/utils/getVoiceRecord";

export default function ChatbotInput() {
  const [chatData, dispatch] = useContextData();

  const [userMessage, setUserMessage] = useState("");
  const [userUploads, setUserUploads] = useState<Message["uploads"]>([]);
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(userMessage, chatData, dispatch, userUploads);
    setUserMessage("");
    resetUploadState();
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserMessage(e.target.value);
  };

  const resetUploadState = () => {
    setUserUploads([]);
  };

  const handleStartRecording = async () => {
    await startAudioRecording(
      (isStarted) => setIsRecording(isStarted),
      () => dispatch({ type: "SET_ERROR", payload: "Unsupported browser" }),
      () => {}
    );
    setIsRecording(true);
  };

  const handleStopRecording = async () => {
    await stopAudioRecording(async (blob) => {
      setIsRecording(false);
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const audioToUpload = {
          name: `audio.${blob.type.split("; ")[0].split("/")[1]}`,
          data: reader.result as string,
          type: "audio",
          mime: `${blob.type.split("; ")[0]}`
        };
        setUserUploads([
          ...(userUploads?.filter((upload) => upload.type !== "audio") || []),
          audioToUpload
        ]);
      };
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageUploads = files.map((file) => ({
      name: file.name,
      data: URL.createObjectURL(file),
      type: "file",
      mime: file.type
    }));

    setUserUploads((prevUploads) => [...(prevUploads || []), ...imageUploads]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const fileUploads = files.map((file) => ({
      name: file.name,
      data: URL.createObjectURL(file),
      type: "file",
      mime: file.type
    }));

    setUserUploads((prevUploads) => [...(prevUploads || []), ...fileUploads]);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        width: "100%"
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        {userUploads?.length ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, m: 2 }}>
            {userUploads.map((upload, index) => (
              <Box
                key={index}
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                {upload.type === "audio" && (
                  <audio
                    controls
                    src={upload.data}
                  >
                    <track kind="captions" />
                  </audio>
                )}
                {upload.type === "file" && upload.mime.includes("image") && (
                  <Box
                    component="img"
                    src={upload.data}
                    alt={upload.name}
                    sx={{
                      height: 80,
                      width: 80,
                      objectFit: "cover",
                      borderRadius: 1
                    }}
                  />
                )}
                {upload.type === "file" && !upload.mime.includes("image") && (
                  <Box
                    sx={{
                      p: 1,
                      border: "1px solid",
                      borderColor: "grey.300",
                      borderRadius: 1
                    }}
                  >
                    {upload.name}
                  </Box>
                )}
                <IconButton
                  onClick={() =>
                    setUserUploads(userUploads.filter((_, i) => i !== index))
                  }
                  sx={{ color: "error.main" }}
                >
                  <Delete />
                </IconButton>
              </Box>
            ))}
          </Box>
        ) : null}
      </Box>

      <Box sx={{ display: "flex", flex: 1, justifyContent: "center" }}>
        <TextareaAutosize
          value={userMessage}
          disabled={!chatData.online || chatData.isApiTyping || isRecording}
          placeholder="Type your message..."
          onChange={handleMessageChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
            }
          }}
          style={{
            width: "100%",
            minWidth: "200px",
            padding: "8px",
            resize: "none",
            fontSize: "1rem",
            borderRadius: "4px",
            border: "1px solid #ccc"
          }}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2, p: 2 }}>
        <IconButton
          onClick={isRecording ? handleStopRecording : handleStartRecording}
          disabled={
            !chatData.online ||
            chatData.isApiTyping ||
            !chatData.isApiAcceptingVoice
          }
        >
          {isRecording ? <Stop color="error" /> : <Mic />}
        </IconButton>
        <IconButton
          component="label"
          disabled={
            !chatData.online ||
            chatData.isApiTyping ||
            !chatData.isApiAcceptingImage
          }
        >
          <Image />
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageUpload}
          />
        </IconButton>
        <IconButton
          component="label"
          disabled={
            !chatData.online ||
            chatData.isApiTyping ||
            !chatData.isApiAcceptingFiles
          }
        >
          <UploadFile />
          <input
            type="file"
            multiple
            accept=".csv, .docx, .json, .pdf, .txt"
            hidden
            onChange={handleFileUpload}
          />
        </IconButton>
        <Button
          type="submit"
          variant="outlined"
          disabled={
            !chatData.online ||
            chatData.isApiTyping ||
            (!userMessage && !userUploads?.length)
          }
        >
          Send
        </Button>
      </Box>
    </Box>
  );
}
