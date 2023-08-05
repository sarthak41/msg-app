const express = require('express');
const app = express();
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
// parse application/json
app.use(express.json())

const port = process.env.PORT || 5000;

const connectDB = require("./config/connect");
connectDB();

require("./config/passport");

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});