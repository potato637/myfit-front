import { io } from "socket.io-client";

const socket = io("wss://3.36.59.150:3000", {
  transports: ["websocket"],
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("✅ socket 연결 성공:", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("❌ socket 연결 실패:", err.message);
});

export default socket;
