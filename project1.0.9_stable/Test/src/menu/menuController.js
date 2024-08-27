var menuService = require('./menuService');

async function saveDishesMenuController(req, res){
  try {
    console.log(JSON.stringify(req.body)+',req.body -> menuController');
    const orderData = req.body; // Assuming the request contains selectedFoodItems and tableNumber
    //console.log(JSON.stringify(orderData)+',orderData -> menuController');
    // Call the service to handle ordering the food
    const status = await menuService.saveDishesMenuService(orderData);

    if (status) {
      res.status(201).json({ status: true, message: 'Food order placed successfully' });
    } else {
      res.status(500).json({ status: false, message: 'Error placing food order' });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: 'An error occurred while placing the food order.' });
  }
};

async function saveDrinksMenuController(req, res){
  try {
    console.log(JSON.stringify(req.body)+',req.body -> menuController');
    const orderData = req.body; // Assuming the request contains selectedFoodItems and tableNumber
    //console.log(JSON.stringify(orderData)+',orderData -> menuController');
    // Call the service to handle ordering the food
    const status = await menuService.saveDrinksMenuService(orderData);

    if (status) {
      res.status(201).json({ status: true, message: 'Drink order placed successfully' });
    } else {
      res.status(500).json({ status: false, message: 'Error placing drink order' });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: 'An error occurred while placing the drink order.' });
  }
};

async function getThisFoodMenuController(req, res){
  const foodName = req.params.foodName;
  console.log(JSON.stringify(req.params)+',req -> getThisFoodMenuController');
  try {
    const status = await menuService.searchfoodNameMenuService(foodName);

    if (status) {
      res.status(201).json(status);
    } else {
      res.status(500).json({ status: false, message: 'Error finding food name.' });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: 'An error occurred while looking for the food name.' });
  }
};

module.exports = {
  saveDishesMenuController, saveDrinksMenuController, getThisFoodMenuController
};