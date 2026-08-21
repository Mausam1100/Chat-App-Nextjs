import { createServer } from "http";
import app from "./app.js";
import 'dotenv/config';
import { Server } from "socket.io";
const PORT = process.env.PORT || 4001;
const server = createServer(app);
export const io = new Server(server);
server.listen(PORT, () => {
    console.log(`Server is running at PORT: ${PORT}`);
});
//# sourceMappingURL=server.js.map