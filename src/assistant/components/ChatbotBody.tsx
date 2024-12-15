import React from "react";
import { useContextData } from "@/assistant/context";
import ChatbotInput from "@/assistant/components/ChatbotInput";
import ChatbotSidebar from "@/assistant/components/ChatbotSidebar";
import MessageCard from "@/assistant/components/ChatbotMessage";
import { Box, Divider } from "@mui/material";

export default function ChatbotBody(): JSX.Element {
  const [chatData] = useContextData();
  const chatBodyRef = React.useRef<HTMLDivElement>(null);

  return (
    <Box
      ref={chatBodyRef}
      sx={{
        display: "flex",
        height: "calc(100% - 160px)"
      }}
    >
      <ChatbotSidebar />
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            overflowY: "auto",
            p: 2
          }}
        >
          {chatData.messages.map((message, index) => (
            <MessageCard
              key={index}
              message={message}
              isLastApiMessage={
                message.role === "apiMessage" &&
                index === chatData.messages.length - 1
              }
            />
          ))}
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <ChatbotInput />
        </Box>
      </Box>
    </Box>
  );
}
