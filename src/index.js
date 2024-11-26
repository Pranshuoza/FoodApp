const express = require("express");
const bodyParser = require("body-parser");

const ServerConfig = require("./config/serverConfig");
const connectDB = require("./config/dbConfig");
const userRouter = require("./routes/userRouter");
const cartRouter = require("./routes/cartRouter");
const authRouter = require("./routes/authRoute");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

//routing middleware
//if your req route starts with /users then handle it with userRouter
app.use("/users", userRouter); //connects router to the server
app.use("/carts", cartRouter);
app.use("/auth", authRouter);

app.post("/ping", (req, res) => {
  console.log(req.body);
  return res.json({ message: "pong" });
});

app.listen(ServerConfig.PORT, async () => {
  await connectDB();
  console.log(`Server started at PORT ${ServerConfig.PORT}`);
});
