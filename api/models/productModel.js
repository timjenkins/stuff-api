const mongoose = require('mongoose');
const uuid = require('uuid/v4');
require('mongoose-uuid2')(mongoose);

const { UUID } = mongoose.Types;

const { Schema } = mongoose;
const ListItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    notes: String,
    price: Number,
    currency: String,
    userId: {
      type: UUID,
      required: true,
    },
    listId: {
      type: UUID,
      required: true,
    },
    _id: {
      type: UUID,
      default: uuid,
    },
  },
  { timestamps: true, id: false },
);

ListItemSchema.set('toObject', { getters: true });
ListItemSchema.set('toJSON', { getters: true });

// Compile model from schema
const ListItem = mongoose.model('ListItemSchema', ListItemSchema);

module.exports = ListItem;
