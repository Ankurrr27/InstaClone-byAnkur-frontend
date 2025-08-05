// src/socket/socket.js
import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (userId) => {
  socket = io("https://instaclone-byankur-backend.onrender.com/", {
    query: { userId },

    withCredentials: true,
      reconnectionAttempts: 5, // 🔁 Only try 5 times
  reconnectionDelay: 1000, // 🕒 Wait 1s between tries
  });

  socket.on("connect", () => console.log("🟢 Socket connected:", socket.id));
  socket.on("connect_error", (err) => console.error("❌ Socket connection error:", err.message));

  return socket;
};

export const getSocket = () => socket;
