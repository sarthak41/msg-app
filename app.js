const express = require('express');
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const server = http.createServer(app);

const port = process.env.PORT || 5000;

const connectDB = require("./config/connect");
connectDB();

require("./config/passport");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const chatRouter = require("./routes/chat");
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/chat", chatRouter);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://admin.socket.io"],
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("join-chat", (room) => {
    socket.join(room);
    console.log(`User joined chat ${room}`);
  });

  socket.on("new-message", (message) => {
    console.log("Sending message...");
    socket.to(message.chat).emit("receive-message", message);
  });

  socket.on("edit-message", (message) => {
    socket.to(message.chat).emit("receive-edited-message", message);
  })

  socket.on("typing", (username, chatId) => {
    socket.to(chatId).emit("is-typing", username, chatId);
  })

  socket.on("stop-typing", (username, chatId) => {
    socket.to(chatId).emit("isnt-typing", username, chatId);
  })
});

instrument(io, {
  auth: false,
  mode: "development",
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


