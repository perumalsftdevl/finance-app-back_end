const express = require("express");
const dotenv = require("dotenv");
const userController = require("./router/user");
const connectDB = require("./dbconnection/dbconfig");
const cors = require("cors");
dotenv.config();
const app = express();
connectDB();
app.use(express.json());
app.use(cors("*"));

app.use("/user", userController);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("server is running");
});
