import React from "react";
import ReactDOM from "react-dom/client";

import Chatbot from "./components/Chatbot";
import { ContextProvider } from "./context";
import { Config } from "./context/types";

const initConfig: Config = {
  assistant: {
    name: "Mai",
    description: "Critical Future Chatbot Assistant",
    welcomeMessage: "Hello! How can I assist you today?",
    voiceName: "en-GB-SoniaNeural",
    avatar: {
      staticUrl:
        "https://raw.githubusercontent.com/Critical-Future-LLM-in-a-Box/llminaboxchatbots/main/Avatars/mai/mai.png",
      liveUrl:
        "https://raw.githubusercontent.com/Critical-Future-LLM-in-a-Box/llminaboxchatbots/main/Avatars/mai/mai-new.gif",
      videoUrl:
        "https://github.com/Critical-Future-LLM-in-a-Box/llminaboxchatbots/raw/main/Avatars/mai/Mai%20intro%20V0.2%20(sonia%20voice).mp4"
    }
  },
  api: {
    apiHost: "https://llm.criticalfutureglobal.com",
    chatflowId: "95e01dd4-ff2f-4055-a6f1-3cfc35261831",
    authToken: ""
  },
  session: {
    chatId:
      localStorage.getItem("chatid") ??
      Math.random().toString().substring(2, 12),
    chats: JSON.parse(localStorage.getItem("chats") ?? "[]"),
    memory: true
  },
  ui: {
    backgroundColor: "#F8F8FF",
    foregroundColor: "#000000",
    width: "100%",
    height: "100%"
  }
};

function init(config: Config = initConfig): void {
  let chatbotRoot = document.querySelector("llminabox");

  if (!chatbotRoot) {
    // Create and append the chatbot root if it doesn't exist, and render the floating button view
    chatbotRoot = document.createElement("llminabox");
    document.body.appendChild(chatbotRoot);
  }

  ReactDOM.createRoot(chatbotRoot).render(
    <ContextProvider config={config}>
      <Chatbot position={{ bottom: "20px", right: "20px" }} />
    </ContextProvider>
  );
}

// Initialize the chatbot with the default configuration
init();
