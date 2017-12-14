const mongoose = require('mongoose');

const { Schema } = mongoose;
const LinkSchema = new Schema({
  url: String,
  name: String,
  date: Date,
  details: {
    price: Number,
  },
});

// Compile model from schema
const Link = mongoose.model('Link', LinkSchema);

module.exports = Link;
