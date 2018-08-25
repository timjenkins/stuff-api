const mongoose = require('mongoose');
const uuid = require('uuid/v4');
const uniqueValidator = require('mongoose-unique-validator');

require('mongoose-uuid2')(mongoose);

const { UUID } = mongoose.SchemaTypes;

const { Schema } = mongoose;
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    lists: [{ type: UUID }],
    _id: {
      type: UUID,
      default: uuid,
    },
  },
  { timestamps: true, id: false },
);
UserSchema.set('toObject', { getters: true });
UserSchema.set('toJSON', { getters: true });

UserSchema.plugin(uniqueValidator);

// Compile model from schema
const User = mongoose.model('User', UserSchema);

module.exports = User;
