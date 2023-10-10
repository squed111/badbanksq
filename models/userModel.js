const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "User Name required"],
  },
  email: {
    type: String,
    required: [true, "Email required"],
    unique: true,
  },
   
  password: {
    type: String,
    required: [true, "Password required"],
  },
  balance: {
    type: Number,
  }
  },
);

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("User", userSchema);