const mongoose = require("mongoose");

// Define the User schema without validation
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
    },
    phone_number: {
      type: String,
    },
    password: {
      type: String,
    },
    customer: {
      type: Boolean,
      default: true, // Default to true
    },
    collection_wise: {
      type: Number,
    },
    amount: {
      type: Number,
    },
    tenure: {
      type: Number,
    },
    interest: {
      type: Number,
    },
    total_amount: {
      type: Number,
      default: 0, // Default to 0
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

// Export the User model
module.exports = mongoose.model("User", UserSchema);
