import React, { useState } from "react";
import Color from "color";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { CircularProgress, Box, IconButton, Typography } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import StopIcon from "@mui/icons-material/Stop";
import { useContextData, Message } from "@/assistant/context";
import { getVoice } from "@/assistant/utils/getVoice";

export default function MessageCard({
  message,
  isLastApiMessage
}: {
  message: Message;
  isLastApiMessage: boolean;
}) {
  const [chatData, dispatch] = useContextData();

  const [isFetchingVoice, setIsFetchingVoice] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioInstance, setAudioInstance] = useState<HTMLAudioElement | null>(
    null
  );

  const handleVoiceClick = async () => {
    if (isPlaying && audioInstance) {
      audioInstance.pause();
      setIsPlaying(false);
    } else {
      setIsFetchingVoice(true);
      try {
        const audio = await getVoice(chatData, message);
        if (audio) {
          setAudioInstance(audio);
          audio.play();
          setIsPlaying(true);

          audio.onended = () => {
            setIsPlaying(false);
          };
        }
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: (error as Error).message
        });
      } finally {
        setIsFetchingVoice(false);
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: message.role === "apiMessage" ? "flex-start" : "flex-end",
        m: 1,
        width: "fit-content"
      }}
    >
      <Box
        sx={{
          display: "inline-block",
          p: 2,
          borderRadius: 1,
          bgcolor:
            message.role === "apiMessage"
              ? Color(chatData.config.themeColor).darken(0.02).toString()
              : Color(chatData.config.themeColor).darken(0.01).toString()
        }}
      >
        {chatData.isApiTyping && isLastApiMessage ? (
          <CircularProgress size={16} />
        ) : (
          <>
            <MessageMarked content={message.content} />
            {message.uploads && message.uploads.length > 0 && (
              <Box sx={{ mt: 1 }}>
                {message.uploads.map((upload, index) => (
                  <Box
                    key={index}
                    sx={{ mb: 1 }}
                  >
                    {upload.type === "file" &&
                    upload.mime.startsWith("image") ? (
                      <Box
                        component="img"
                        src={upload.data}
                        alt={upload.name}
                        sx={{
                          width: 80,
                          height: 80,
                          objectFit: "cover",
                          borderRadius: 1
                        }}
                      />
                    ) : upload.type === "audio" ? (
                      <Box
                        component="audio"
                        controls
                        src={upload.data}
                        sx={{ width: "100%" }}
                      >
                        <track kind="captions" />
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          p: 1,
                          border: "1px solid",
                          borderColor: "grey.300",
                          borderRadius: 1,
                          typography: "body2"
                        }}
                      >
                        {upload.name}
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            )}
          </>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          color: "text.secondary",
          mt: 1
        }}
      >
        <Typography variant="caption">{message.timestamp}</Typography>
        {message.role === "apiMessage" && (
          <IconButton
            onClick={handleVoiceClick}
            size="small"
          >
            {isFetchingVoice ? (
              <CircularProgress size={16} />
            ) : isPlaying ? (
              <StopIcon fontSize="small" />
            ) : (
              <VolumeUpIcon fontSize="small" />
            )}
          </IconButton>
        )}
      </Box>
    </Box>
  );
}

export function MessageMarked({ content }: { content: string }): JSX.Element {
  const rawHtml = marked(content);
  const sanitizedHtml = DOMPurify.sanitize(rawHtml as string);
  return (
    <Box
      sx={{ typography: "body2" }}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
