const mongoose = require('mongoose');

const { Schema } = mongoose;
const LinkSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  title: String,
  dateCreated: {
    type: Date,
    required: true,
  },
  details: {
    price: {
      type: Number,
    },
  },
});

// Compile model from schema
const Link = mongoose.model('Link', LinkSchema);

module.exports = Link;
