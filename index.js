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
    origin: "http://localhost:4200", // Your Angular app's URL
    credentials: true, // Allow credentials (cookies)
  })
);
app.use(express.json());

app.use("/user", userController);
app.use("/auth", authController);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("server is running");
});
