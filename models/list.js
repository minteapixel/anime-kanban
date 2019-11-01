const mongoose = require("mongoose");
const { Schema } = mongoose;
const cardSchema = require('./card');

const listSchema = newSchema({
  type: String,
  cards: [cardSchema]
});

mongoose.model('List', listSchema);