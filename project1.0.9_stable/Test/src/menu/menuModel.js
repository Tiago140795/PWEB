const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema(
    {
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 5
    },
    quantity: {
        type: Number,
        default: 1
    },
    available: {
        type: Boolean,
        default: true
    },
    prepTime:{
        type: Number,
        default: 5
    }
    },
  { collection: 'menu' }
);

// Define your predefined dishes here
const predefinedDishes = [
    { name: 'beefFillet', price: 20, quantity: 1, available: true ,prepTime: 10},
    { name: 'mushRisotto', price: 12, quantity: 1, available: true ,prepTime: 10},
    { name: 'grilledSalmon', price: 18, quantity: 1, available: true ,prepTime: 10},
    { name: 'lasagna', price: 13, quantity: 1, available: true ,prepTime: 10},
    { name: 'chickenMarsala', price: 15, quantity: 1 , available: true ,prepTime: 10},
    { name: 'eggTart', price: 2, quantity: 1 , available: true ,prepTime: 1},
    { name: 'penne', price: 10, quantity: 1 , available: true ,prepTime: 5},
    { name: 'cremeBrulee', price: 5, quantity: 1 , available: true ,prepTime: 5},
    { name: 'tiramisu', price: 5, quantity: 1 , available: true ,prepTime: 5},
    { name: 'fruitSalad', price: 4, quantity: 1 , available: true ,prepTime: 5},
    { name: 'water', price: 2, quantity: 1, available: true ,prepTime: 1},
    { name: 'coke', price: 2, quantity: 1, available: true ,prepTime: 1},
    { name: 'iceTea',price: 2, quantity: 1, available: true ,prepTime: 1},
    { name: 'orangeJuice', price: 3, quantity: 1, available: true ,prepTime: 2},
    { name: 'whiteWine', price: 4, quantity: 1, available: true ,prepTime: 2},
    { name: 'redWine', price: 4, quantity: 1, available: true ,prepTime: 2},
    { name: 'aperol', price: 4, quantity: 1, available: true ,prepTime: 2},
    { name: 'coffee', price: 1, quantity: 1, available: true ,prepTime: 2},
  ];
/*
const menuSchema = new mongoose.Schema({
    dishes: [dishSchema]
});
*/

const Menu = mongoose.model('Menu', menuSchema);

// Export the predefined dishes and the Menu model
module.exports = { Menu, predefinedDishes };
