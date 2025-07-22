import { ChatBoxStatus } from "./ChatBoxStatus";

export type MessageType = "message" | "coffeechat";

export interface Message {
  id: number;
  text: string;
  sender: "me" | "you";
  type: MessageType;
  status?: ChatBoxStatus;
}
