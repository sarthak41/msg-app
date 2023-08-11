const express = require('express');
const cors = require("cors");
const http = require("http");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const port = process.env.PORT || 5000;

const connectDB = require("./config/connect");
connectDB();

require("./config/passport");

const server = http.createServer(app);
const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log("Connected");
})

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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});