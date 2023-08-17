const express = require("express");
const cors = require("cors");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const server = http.createServer(app);

const port = process.env.PORT || 5000;

const connectDB = require("./config/connect");
connectDB();

require("./config/passport");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const chatRouter = require("./routes/chat");
app.use("/api", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/chat", chatRouter);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/client/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
  );
}

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://admin.socket.io"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("join-chat", (room) => {
    socket.join(room);
  });

  socket.on("new-message", (message) => {
    socket.to(message.chat).emit("receive-message", message);
  });

  socket.on("edit-message", (message) => {
    socket.to(message.chat).emit("receive-edited-message", message);
  });

  socket.on("typing", (username, chatId) => {
    socket.to(chatId).emit("is-typing", username, chatId);
  });

  socket.on("stop-typing", (username, chatId) => {
    socket.to(chatId).emit("isnt-typing", username, chatId);
  });
});

instrument(io, {
  auth: false,
  mode: "development",
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
