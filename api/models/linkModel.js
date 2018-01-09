const mongoose = require('mongoose');
const validators = require('mongoose-validators');
const sanitizerPlugin = require('mongoose-sanitizer');

const { Schema } = mongoose;
const LinkSchema = new Schema({
  url: {
    type: String,
    required: true,
    validate: validators.isURL(),
  },
  name: String,
  dateCreated: {
    type: Date,
    required: true,
    validate: validators.isDate(),
  },
  details: {
    price: {
      type: Number,
      // validate: validators.isCurrency({ allow_negatives: false }),
    },
  },
});

// Sanitise Before Saving
LinkSchema.plugin(sanitizerPlugin);

// Compile model from schema
const Link = mongoose.model('Link', LinkSchema);

module.exports = Link;
