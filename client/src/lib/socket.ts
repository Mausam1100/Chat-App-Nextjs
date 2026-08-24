import { io } from "socket.io-client";

export const socket = io('https://api-chat-app-eky0.onrender.com', {
    autoConnect: false
})