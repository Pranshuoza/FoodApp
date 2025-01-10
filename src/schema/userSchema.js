const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      minlength: [3, "First Name must be 3 characters long"],
      lowercase: true,
      trim: true, // extra spaces will be automatically removed
      maxlength: [20, "Max Length less than 20"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],  // Corrected the message here
      minlength: [3, "Last Name must be 3 characters long"],  // Corrected field name
      lowercase: true,
      trim: true, // extra spaces will be automatically removed
      maxlength: [20, "Max Length less than 20"],
    },
    mobileNumber: {
      type: String,
      trim: true,
      unique: [true, "It should be unique"],
      maxlength: [10],
      required: [true, "Mobile Number is needed"],  // Improved message
    },
    email: {
      type: String,
      trim: true,
      unique: [true, "It should be unique"],
      required: [true, "Email is needed"],  // Improved message
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be 6 characters long"],
    },
    role: {
      type: String,  // Corrected typo 'tyoe' to 'type'
      default: "USER",  // Changed to single value instead of an array
      enum: ["USER", "ADMIN"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  // You can modify your user before it is saved
  const hashPassword = await bcrypt.hash(this.password, 10);
  this.password = hashPassword;
});

const User = mongoose.model("User", userSchema); // Collection

module.exports = User;
