import localforage from "localforage";
import { ChatData, Message } from "@/assistant/context";
import { request } from "@/assistant/utils/request";

export const fetchVoice = async (chatData: ChatData, message: Message) => {
  const proxyUrl = "https://proxy.cors.sh/";
  const { file_url } = await request<{ file_url: string }>({
    url: proxyUrl + "http://51.20.131.200/get_tts",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "G7x9mVt2Q5bK8Jp4S1Zc"
      },
      body: JSON.stringify({
        text: message.content,
        voice: chatData.config?.voiceName,
        id: message.timestamp
      })
    }
  }).catch((err) => {
    throw new Error(err);
  });

  const audioBlob = await request<Blob>({ url: proxyUrl + file_url }).catch(
    (err) => {
      throw new Error(err);
    }
  );

  const mp3Blob = new Blob([audioBlob], { type: "audio/mpeg" });

  const mp3Url = URL.createObjectURL(mp3Blob);

  await localforage.setItem(message.timestamp, mp3Url);

  return mp3Url;
};

export const getVoice = async (chatData: ChatData, message: Message) => {
  const storedVoice = await localforage.getItem(message.timestamp);

  if (storedVoice) {
    return new Audio(storedVoice as string);
  } else {
    const audioUrl = await fetchVoice(chatData, message).catch((err) => {
      throw new Error(err);
    });

    if (audioUrl) {
      return new Audio(audioUrl);
    }
  }
};
