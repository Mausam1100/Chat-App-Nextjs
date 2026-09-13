import { io } from "socket.io-client";

export const socket = io('https://api-chat-app-eky0.onrender.com', {
    autoConnect: false
})

// export const socket = io('http://localhost:4000', {
//     autoConnect: false
// })