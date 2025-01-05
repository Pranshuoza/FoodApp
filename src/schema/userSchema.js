const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      minlength: [3, "First Name must be 3 character long"],
      lowercase: true,
      trim: true, //extra spaces will be automatically removed
      maxlength: [20, "Max Length less than 20"],
    },
    lastName: {
      type: String,
      required: [true, "First Name is required"],
      minlength: [3, "First Name must be 3 character long"],
      lowercase: true,
      trim: true, //extra spaces will be automatically removed
      maxlength: [20, "Max Length less than 20"],
    },
    mobileNumber: {
      type: String,
      trim: true,
      unique: [true, "It should be unique"],
      maxlength: [10],
      required: [true, "Its needed"],
    },
    email: {
      type: String,
      trim: true,
      unique: [true, "It should be unique"],
      required: [true, "Its needed"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Must be 6 character long"],
    },
    role: {
      tyoe: String,
      default: ["USER"],
      enum: ["USER", "ADMIN"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  //you can modify your user before it is saved
  const hashPassword = await bcrypt.hash(this.password, 10);
  this.password = hashPassword;
});

const User = mongoose.model("User", userSchema); //collection

module.exports = User;
