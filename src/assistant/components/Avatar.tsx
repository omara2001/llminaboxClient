import React, { useState, useRef, forwardRef } from "react";
import { Button, Box, CircularProgress } from "@mui/material";
import { useContextData } from "@/assistant/context";

export function ChatAvatar(): JSX.Element {
  const [chatData] = useContextData();
  const [isVideoOn, setIsVideoOn] = useState(false);
  const videoSrc = chatData.config.avatarVideoUrl;
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const toggleVideo = () => {
    if (isVideoOn) {
      videoRef.current?.pause();
      setIsVideoOn(false);
    } else {
      if (videoRef.current && videoRef.current.readyState > 2) {
        videoRef.current.play();
        setIsVideoOn(true);
      }
    }
  };

  return (
    <>
      <Box
        sx={{ width: 200, height: 200, borderRadius: 2, overflow: "hidden" }}
      >
        <Box
          component="img"
          src={chatData.config.avatarLiveUrl}
          alt="Avatar"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: isVideoOn ? "none" : "block"
          }}
        />
        <Box
          component="video"
          ref={videoRef}
          src={videoSrc}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: isVideoOn ? "block" : "none"
          }}
          onEnded={() => setIsVideoOn(false)}
        >
          <track
            kind="captions"
            srcLang="en"
            src="/path/to/captions.vtt"
            label="English"
          />
        </Box>
      </Box>
      <Button
        variant="outlined"
        sx={{ width: "100%", color: "text.secondary" }}
        onClick={toggleVideo}
      >
        {isVideoOn ? "Pause" : "About"}
      </Button>
    </>
  );
}

interface InteractiveAvatarProps {
  isAvatarLoading: boolean;
}

const InteractiveAvatarComponent = (
  { isAvatarLoading }: InteractiveAvatarProps,
  ref: React.Ref<HTMLVideoElement>
): JSX.Element => {
  return (
    <Box>
      {isAvatarLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Box
        sx={{ width: 200, height: 200, borderRadius: 2, overflow: "hidden" }}
      >
        <Box
          component="video"
          ref={ref}
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        >
          <track
            kind="captions"
            srcLang="en"
            src="/path/to/captions.vtt"
            label="English"
          />
        </Box>
      </Box>
    </Box>
  );
};

export const InteractiveAvatar = forwardRef<
  HTMLVideoElement,
  InteractiveAvatarProps
>(InteractiveAvatarComponent);
