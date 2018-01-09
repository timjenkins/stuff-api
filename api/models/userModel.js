const mongoose = require('mongoose');
const sanitizerPlugin = require('mongoose-sanitizer');


const { Schema } = mongoose;
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
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
