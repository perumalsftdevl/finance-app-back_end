const express = require("express");
const user = require("../model/user");

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
    const body = req.body;
    const Add_user = new user(body);
    Add_user.save();

    if (Add_user) {
      return res
        .status(200)
        .json({ msg: "User Added SuccessFully", status: true });
    }
  } catch (error) {
    return res.status(500).json({ msg: error?.message, status: true });
  }
});

module.exports = router;
