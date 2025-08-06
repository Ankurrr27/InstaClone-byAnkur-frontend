// src/socket/socket.js
import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (userId) => {
  socket = io("https://instaclone-byankur-backend.onrender.com", {
    query: { userId : userId._id },
    withCredentials: true,
   
    transports:["websocket"]
  });

  socket.on("connect", () => console.log(" Socket connected:", socket.id));
  socket.on("connect_error", (err) =>
    console.error(" Socket connection error:", err.message)
  );

  return socket;
};

export const getSocket = () => socket;
