const mongoose = require("mongoose");
const { Schema } = mongoose;

const cardSchema = newSchema({
  title: String,
  type: String, 
  imageLink: String,
  notes: String,
  listId: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  }
});

mongoose.model('Card', cardSchema);