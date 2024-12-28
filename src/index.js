const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const ServerConfig = require("./config/serverConfig");
const connectDB = require("./config/dbConfig");
const userRouter = require("./routes/userRouter");
const cartRouter = require("./routes/cartRouter");
const authRouter = require("./routes/authRoute");
const { isLoggedIn } = require("./validation/authValidator");
const uploader = require("./middleware/multerMiddleware");
const cloudinary = require("./config/cloudinaryConfig");
const fs = require("fs/promises");
const productRouter = require("./routes/productRoute");

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

//routing middleware
//if your req route starts with /users then handle it with userRouter
app.use("/users", userRouter); //connects router to the server
app.use("/carts", cartRouter);
app.use("/auth", authRouter);
app.use("/products", productRouter);

app.post("/ping", isLoggedIn, (req, res) => {
  console.log(req.body);
  return res.json({ message: "pong" });
});

app.post("/photo", uploader.single("incoming file"), async (req, res) => {
  console.log(req.file);
  const result = await cloudinary.uploader.upload(req.file.path);
  console.log("result from cloudinary", result);
  await fs.unlink(req.file.path);
  return res.json({ message:'ok' });
});

app.listen(ServerConfig.PORT, async () => {
  await connectDB();
  console.log(`Server started at PORT ${ServerConfig.PORT}`);
});
