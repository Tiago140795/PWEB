const express = require('express');
const bodyParser = require('body-parser'); // Import body-parser for parsing JSON


var userController = require('../src/user/userController'); // Imports 
var menuController = require('../src/menu/menuController'); 
var tableController = require('../src/table/tableController');
var orderController = require('../src/order/orderController');

const router = express.Router();

router.route('/user/login').post(userController.loginUserControllerFn);
router.route('/user/create').post(userController.createUserControllerFn);
router.route('/user/delete').post(userController.deleteUserControllerFn);

//router.route('/user/waiter').get(userController.getUserName)
//router.route('/menu/order').post(menuController.orderMenuControllerFn);

//Tables
router.route('/waiter/tables/create').post(tableController.createTableFn);
router.post('/waiter/tables', bodyParser.json(), tableController.createTableFn);
router.get('/waiter/tables', tableController.getAllTables);
router.put('/waiter/tables/reserved/:tableNumber', tableController.changeTableReservationStatus);
router.delete('/waiter/tables/delete/:parsedTableNumber', tableController.deleteTableByTableNumber);
      
//Menu
router.route('/waiter/menu/food').post(menuController.saveDishesMenuController);
router.route('/waiter/menu/drink').post(menuController.saveDrinksMenuController);

router.get('/waiter/menu/food/:foodName', menuController.getThisFoodMenuController);

//Orders
router.route('/waiter/order').post(orderController.createOrderController);
router.route('/waiter/order').get(orderController.getAllOrders);
router.route('/waiter/order/finished').get(orderController.getFinishedOrders);
//Waiter
router.route('/waiter/order/dish').get(orderController.getFinishedDishOrders);
router.route('/waiter/order/drink').get(orderController.getFinishedDrinkOrders);

//Cook
router.get('/cook/order', orderController.getNewOrdersCook);
router.get('/cook/order/:orderId', orderController.getOrderById);
router.put('/cook/order/dish/preparation/:orderId', orderController.setDishInPrep);
router.put('/order/dish/complete/:orderId', orderController.setDishComplete);

//Bartender
router.get('/bar/order', orderController.getNewOrdersBar);
router.get('/bar/order/:orderId', orderController.getOrderById);
router.put('/bar/order/drink/preparation/:orderId', orderController.setDrinkInPrep);
router.put('/order/drink/complete/:orderId', orderController.setDrinkComplete);

//Bills
router.route('/waiter/order/table/:tableNumber').get(orderController.getOrderDetailsByTableNumber);

//Cashier
router.route('/cashier/order/delete/:orderId').delete(orderController.deleteOrderById);

module.exports = router;