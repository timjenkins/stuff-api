const mongoose = require('mongoose');
const validators = require('mongoose-validators');
const sanitizerPlugin = require('mongoose-sanitizer');


const { Schema } = mongoose;
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    // validate: validators.isAlphaNumeric(),
  },
  firstName: {
    type: String,
    required: true,
    validate: validators.isAlpha(),
  },
  lastName: {
    type: String,
    required: true,
    validate: validators.isAlpha(),
  },
  email: {
    type: String,
    required: true,
    validate: validators.isEmail(),
  },
  dateCreated: {
    type: Date,
    required: true,
    validate: validators.isDate(),
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.plugin(sanitizerPlugin);

// Compile model from schema
const User = mongoose.model('User', UserSchema);

module.exports = User;
