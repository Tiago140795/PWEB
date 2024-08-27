const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: {
    type: Number,
    required: true
},  
  tableNumber: {
    type: String,

},
  waiterName: {
    type: String,
    default: 'Ana'
},
  dishes: [{
    name: String,
    price: Number,
    quantity: Number,
    available: Boolean,
  }],
  drinks: [{
    name: String,
    price: Number,
    quantity: Number,
    available: Boolean,
  }]
  ,
  dishInPrep: {
    type: Boolean,
    default: false,
},
  drinkInPrep: {
    type: Boolean,
    default: false,
},
  dishComplete: {
    type: Boolean,
    default: false,
},
  drinkComplete: {
    type: Boolean,
    default: false,
},prepTime: {
    type: Number,
    default: 10
  }

}, { collection: 'orders' });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
