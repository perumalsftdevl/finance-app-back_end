const express = require("express");
const dotenv = require("dotenv");
const userController = require("./router/user");
const authController = require("./router/Auth.route");
const connectDB = require("./dbconnection/dbconfig");
const cors = require("cors");
dotenv.config();
const app = express();
connectDB();
app.use(express.json());
app.use(
  cors({
    origin: true, // Dynamically allows the origin of the request
    credentials: true, // Allow credentials (e.g., cookies or tokens)
  })
);
app.use(express.json());

app.use("/user", userController);
app.use("/auth", authController);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("server is running");
});

app.get("/", (req, res) => {
  return res.send({ msg: "Api Calling" });
});
