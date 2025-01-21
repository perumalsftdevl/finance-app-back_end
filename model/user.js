const mongoose = require("mongoose");

// Define the User schema
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true, // Name is required
    },
    email: {
      type: String,
      lowercase: true,
      required: false, // Email is required
      unique: true, // Ensure email is unique
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"], // Regex for email validation
    },
    // customer_id: {
    //   type: String,
    // },
    image: {
      type: String,
      default: null,
    },
    phone_number: {
      type: String,
      unique: true, // Ensure phone number is unique
      required: true, // Phone number is required
      match: [/^\d{10}$/, "Phone number must be 10 digits"], // Regex for phone validation
    },
    password: {
      type: String,
      required: true, // Password is required
      minlength: 6, // Minimum length for password
    },
    customer: {
      type: Boolean,
      default: true, // Default to true
    },
    collection_wise: {
      type: Number,
      default: 0, // Default value
    },
    amount: {
      type: Number,
      default: 0, // Default value
    },
    tenure: {
      type: Number,
      default: 0, // Default value
    },
    interest: {
      type: Number,
      default: 0, // Default value
    },
    total_amount: {
      type: Number,
      default: 0, // Default to 0
    },
    status: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId, // Corrected reference to ObjectId
      ref: "User", // Refers to the User model
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Export the User model
module.exports = mongoose.model("User", UserSchema);
