const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = newSchema({
  username: String,
  password: String
});

mongoose.model('User', userSchema);