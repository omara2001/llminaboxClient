import { ChatData } from "@/assistant/context";
import { request } from "@/assistant/utils/request";

export async function getOnlineStatus(
  chatData: ChatData,
  dispatch: (action: { type: string; payload: boolean }) => void
): Promise<void> {
  const clientOnline = navigator.onLine;
  let apiOnline = false;

  const response = await request<string>({
    url: chatData.config.apiHost + "/api/v1/ping"
  }).catch((err) => {
    throw new Error(err);
  });

  if (response.includes("pong")) apiOnline = true;
  dispatch({
    type: "SET_ONLINE_STATUS",
    payload: clientOnline && apiOnline
  });
}
