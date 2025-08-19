import { io } from "socket.io-client";

const socket = io("https://myfit.my", {
  transports: ["websocket"],
  withCredentials: true,
  autoConnect: false, // 자동 연결 비활성화
});

socket.on("connect", () => {
  console.log("✅ socket 연결 성공:", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("❌ socket 연결 실패:", err.message);
});

export default socket;
