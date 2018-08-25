const mongoose = require('mongoose');
const uuid = require('uuid/v4');
require('mongoose-uuid2')(mongoose);

const { UUID } = mongoose.Types;

const { Schema } = mongoose;
const ListSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    products: {
      type: [{ type: UUID, ref: 'Product' }],
      default: [],
    },
    userId: {
      type: UUID,
      ref: 'User',
      required: true,
    },
    _id: {
      type: UUID,
      default: uuid,
    },
  },
  { timestamps: true, id: false },
);

ListSchema.set('toObject', { getters: true });
ListSchema.set('toJSON', { getters: true });

// Compile model from schema
const List = mongoose.model('List', ListSchema);

module.exports = List;
