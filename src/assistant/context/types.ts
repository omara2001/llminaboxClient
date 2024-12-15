export interface Config {
  assistant?: {
    name?: string;
    description?: string;
    welcomeMessage?: string;
    voiceName?: string;
    avatar?: {
      staticUrl?: string;
      liveUrl?: string;
      videoUrl?: string;
    };
  };
  api?: {
    apiHost?: string;
    chatflowId?: string;
    authToken?: string;
  };
  session?: {
    chatId?: string;
    chats?: string[];
    memory?: boolean;
  };
  ui?: {
    foregroundColor?: string;
    backgroundColor?: string;
    width?: string;
    height?: string;
  };
}

export interface Message {
  role: string;
  content: string;
  timestamp: string;
  uploads?: {
    name: string;
    type: string;
    mime: string;
    data: string;
  }[];
}

export interface ChatData {
  config: Config;
  chats: string[];
  chatid: string;
  messages: Message[];
  online: boolean;
  error: string;
  isApiTyping: boolean;
  isUserTyping: boolean;
}

export type ChatAction =
  | { type: "SET_CONFIG"; payload: Config }
  | { type: "ADD_MESSAGE"; payload: Message }
  | { type: "SET_ONLINE_STATUS"; payload: boolean }
  | { type: "SET_ERROR"; payload: string }
  | { type: "SET_API_TYPING"; payload: boolean }
  | { type: "SET_USER_TYPING"; payload: boolean }
  | { type: "CLEAR_CHAT" };
