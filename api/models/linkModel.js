const mongoose = require('mongoose');
const sanitizerPlugin = require('mongoose-sanitizer');

const { Schema } = mongoose;
const LinkSchema = new Schema({
  url: {
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

// Sanitise Before Saving
LinkSchema.plugin(sanitizerPlugin);

// Compile model from schema
const Link = mongoose.model('Link', LinkSchema);

module.exports = Link;
