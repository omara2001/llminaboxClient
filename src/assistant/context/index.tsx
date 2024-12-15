import React, { createContext, useContext, ReactNode } from "react";
import { useImmerReducer, Reducer } from "use-immer";
import { Config, ChatData, ChatAction } from "@/assistant/context/types";

const createContextData = (config: Config = {}): ChatData => ({
  config,
  chats: config.session?.chats || [],
  chatid: config.session?.chatId || Math.random().toString().substring(2, 12),
  messages: [
    {
      role: "api",
      content:
        config.assistant?.welcomeMessage ||
        "Hello! How can I assist you today?",
      timestamp: new Date().toLocaleString(),
      uploads: []
    }
  ],
  online: false,
  error: "",
  isApiTyping: false,
  isUserTyping: false
});

// Context and Provider
const ChatContext = createContext<
  [ChatData, React.Dispatch<ChatAction>] | null
>(null);

const ContextProvider = ({
  children,
  config
}: {
  children: ReactNode;
  config: Config;
}): JSX.Element => {
  const [chatData, dispatch] = useImmerReducer(
    chatReducer,
    createContextData(config)
  );

  return (
    <ChatContext.Provider value={[chatData, dispatch]}>
      {children}
    </ChatContext.Provider>
  );
};

// Hook for using context data
const useContextData = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useContextData must be used within a ContextProvider");
  }
  return context;
};

// Reducer
const chatReducer: Reducer<ChatData, ChatAction> = (draft, action) => {
  switch (action.type) {
    case "SET_CONFIG":
      draft.config = action.payload;
      break;
    case "ADD_MESSAGE":
      draft.messages.push(action.payload);
      break;
    case "SET_ONLINE_STATUS":
      draft.online = action.payload;
      break;
    case "SET_ERROR":
      draft.error = action.payload;
      break;
    case "SET_API_TYPING":
      draft.isApiTyping = action.payload;
      break;
    case "SET_USER_TYPING":
      draft.isUserTyping = action.payload;
      break;
    case "CLEAR_CHAT":
      draft.messages = [];
      draft.chatid = Math.random().toString().substring(2, 12);
      localStorage.setItem("chatid", draft.chatid);
      break;
    default:
      break;
  }
};

export { ContextProvider, useContextData, createContextData };
