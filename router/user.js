const express = require("express");
const user = require("../model/user");
const bcryptjs = require("bcryptjs");
const router = express.Router();

router.get("/get-user", async (req, res) => {
  try {
    // Fetch all user data
    const data = await user.find({}); // Assuming 'user' is a Mongoose model

    // Respond with fetched data
    return res
      .status(200)
      .json({ status: true, msg: "Data fetched successfully", data });
  } catch (error) {
    // Handle errors
    console.error("Error fetching user data:", error);
    return ress.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
      status: false,
    });
  }
});

router.post("/add-user", async (req, res) => {
  try {
    const { password, ...rest } = req.body;

    // Hash the password
    const hashPassword = bcryptjs.hashSync(password, 10);

    // Create a new user instance
    const Add_user = new user({ ...rest, password: hashPassword });

    // Save the user and catch any errors
    await Add_user.save();

    return res
      .status(200)
      .json({ message: "User Added Successfully", status: true });
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error
      return res.status(200).json({
        message: "Duplicate phone number, user already exists.",
        false: true,
      });
    }

    // Generic error handling
    return res
      .status(500)
      .json({ msg: error?.message || "Something went wrong", status: false });
  }
});

module.exports = router;
