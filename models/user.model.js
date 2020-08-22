const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  googleId: String,
  facebookId: String,
});

const User = mongoose.model("users", userSchema);

module.exports = User;
