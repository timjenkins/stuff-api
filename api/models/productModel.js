const mongoose = require('mongoose');
const uuid = require('uuid/v4');
require('mongoose-uuid2')(mongoose);

const { UUID } = mongoose.Types;

const { Schema } = mongoose;
const ProductSchema = new Schema(
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
      ref: 'User',
      required: true,
    },
    listId: {
      type: UUID,
      ref: 'List',
      required: true,
    },
    _id: {
      type: UUID,
      default: uuid,
    },
  },
  { timestamps: true, id: false },
);

ProductSchema.set('toObject', { getters: true });
ProductSchema.set('toJSON', { getters: true });

// Compile model from schema
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
