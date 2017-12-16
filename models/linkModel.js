const mongoose = require('mongoose');
require('mongoose-type-url');

const { Schema } = mongoose;
const LinkSchema = new Schema({
  url: {
    type: mongoose.SchemaTypes.Url,
    required: true,
  },
  name: String,
  dateCreated: {
    type: Date,
    required: true,
  },
  details: {
    price: Number,
  },
});

// Compile model from schema
const Link = mongoose.model('Link', LinkSchema);

module.exports = Link;
