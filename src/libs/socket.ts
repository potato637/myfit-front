import { io } from "socket.io-client";

const socket = io("http://3.36.59.150:3000", {
  transports: ["websocket"],
  withCredentials: true,
});

export default socket;
