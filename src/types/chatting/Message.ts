import { ChatBoxStatus } from "./ChatBoxStatus";

export interface Message {
  chatting_room_id: number;
  message_id: number;
  sender_id: number;
  receiver_id: number;
  message: string;
  type: "TEXT" | "COFFEECHAT" | "SYSTEM";
  created_at: string;
  status?: ChatBoxStatus;
}
