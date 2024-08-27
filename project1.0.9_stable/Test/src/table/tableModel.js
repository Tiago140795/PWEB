const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema(
  {
    tableNumber: {
      type: Number,
      required: true
    },
    capacity: {
      type: Number,
      required: true
    },
    isReserved: {
      type: Boolean,
      default: false
    }
  },
  { collection: 'tables' }
);

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;
