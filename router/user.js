const express = require("express");
const user = require("../model/user");
const bcryptjs = require("bcryptjs");
const verifyToken = require("../utils/verifyToken");
const verifyUserToken = require("../utils/verifyUser");
const router = express.Router();

router.get("/get_user", verifyToken, verifyUserToken, async (req, res) => {
  try {
    const login_user = req.user.id;

    const search_params = req.query["search_params"] || "";

    // const page = 1; // Default page
    // const limit = 10; // Default items per page
    const query = { createdBy: login_user };

    if (search_params) {
      query.$or = [
        { name: { $regex: search_params, $options: "i" } },
        { email: { $regex: search_params, $options: "i" } }, // Add more fields if needed
        { phone: { $regex: search_params, $options: "i" } },
      ];
    }

    const data = await user.find(query).sort({ createdAt: -1 }); // Example: Sort by creation date descending
    // .skip((page - 1) * limit)
    // .limit(limit);

    return res
      .status(200)
      .json({ status: true, msg: "Data fetched successfully", data });
  } catch (error) {
    // Handle errors
    console.error("Error fetching user data:", error);
    return ress.status(500).json({
      msg: "Internal Server Error",
      error: error?.message,
      status: false,
    });
  }
});

router.post("/add_user", verifyToken, verifyUserToken, async (req, res) => {
  try {
    delete req.body["_id"];
    const { password, ...rest } = req.body;
    const login_user = req.user.id; // The ID of the logged-in user (assumed to be set in the middleware)

    // Generate customer_id: count the documents and increment it
    // const sequenceValue = await user
    //   .find({ createdBy: login_user }); // Get the count of users
    // const customer_id = String(sequenceValue + 1).padStart(5, "0"); // Increment and pad the value

    // Hash the password
    // const hashPassword = bcryptjs.hashSync(password, 10);

    // Create a new user instance
    const Add_user = new user({
      ...rest,
      password: password,
      createdBy: login_user,
      // customer_type:
      //   login_user === "67702fca825591c7596fa8e5" ? "User" : "Customer",
      // customer_id:
      //   login_user === "67702fca825591c7596fa8e5"
      //     ? "User" + customer_id
      //     : "Cust" + customer_id,
    });

    // Save the user
    await Add_user.save();

    return res
      .status(200)
      .json({ message: "User Added Successfully", status: true });
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error
      const keyName = Object.keys(error.keyValue)[0]; // Get the dynamic key name (e.g., "phone number")

      // Handle the error dynamically based on the key name
      return res.status(200).json({
        message: `${keyName} already exists.`,
        error: true,
      });
    }

    // Generic error handling
    return res.status(500).json({
      message: error?.message,
      status: false,
    });
  }
});

router.get("/get_userById", verifyToken, verifyUserToken, async (req, res) => {
  try {
    const User_id = req.query["user_id"];

    const UserObj = await user.findById({ _id: User_id }); // Assuming 'user' is a Mongoose model

    if (!UserObj) {
      return res.status(200).json({
        status: false,
        message: "User Not Found",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Data fetched successfully",
      data: UserObj,
    });
  } catch (error) {
    return res.status(500).json({
      message: error?.message || "Something went wrong",
      status: false,
    });
  }
});

router.put("/update_user", verifyToken, verifyUserToken, async (req, res) => {
  try {
    const User_id = req.body["_id"];
    const user_Object = req.body;

    const UserObj = await user.updateOne(
      { _id: User_id },
      { $set: user_Object },
      { upsert: true }
    );

    if (!UserObj) {
      return res.status(200).json({
        status: false,
        message: "User Not Found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Data Updated successfully",
    });
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error
      const keyName = Object.keys(error.keyValue)[0]; // Get the dynamic key name (e.g., "phone number")

      // Handle the error dynamically based on the key name
      return res.status(200).json({
        message: `${keyName} already exists.`,
        error: true,
      });
    }

    return res.status(500).json({
      message: error?.message || "Something went wrong",
      status: false,
    });
  }
});

router.delete(
  "/delete_user",
  verifyToken,
  verifyUserToken,
  async (req, res) => {
    try {
      const User_id = req.query["user_id"];
      const UserObj = await user.findOneAndDelete({ _id: User_id });
      if (!UserObj) {
        return res.status(404).json({
          status: false,
          message: "User Not Found",
        });
      }
      return res.status(200).json({
        status: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message || "An unexpected error occurred",
      });
    }
  }
);

router.get(
  "/get_users_byToken",
  verifyToken,
  verifyUserToken,
  async (req, res) => {
    try {
      const login_user = req.user.id; // The ID of the logged-in user (assumed to be set in the middleware)

      const UserObj = await user.findById({ _id: login_user }); // Assuming 'user' is a Mongoose model

      if (!UserObj) {
        return res.status(200).json({
          status: false,
          message: "User Not Found",
        });
      }
      return res.status(200).json({
        status: true,
        message: "Data fetched successfully",
        data: UserObj,
      });
    } catch (error) {
      return res.status(500).json({
        message: error?.message || "Something went wrong",
        status: false,
      });
    }
  }
);

module.exports = router;
